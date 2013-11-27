/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Build system.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

var deepClone = require('clone');
var fs = require('fs');
var appConfig = require('./app/config/appconfig');

/**
 * Production flag.
 * If it's true, it means that app is built for external world - sources,
 * source maps, source maps links won't be present in compiled code.
 * If it's false, app includes it all and could be tested on server in close
 * to production form.
 */
var PRODUCTION = false;
/**
 * This flag specifies that minimal number of compile targets will be
 * produced.
 */
var FAST_DEBUG = true;

// These are compilation target axises. So, total number of compilation
// targets is product of array lengths.
var LOCALES = PRODUCTION ? appConfig.LOCALES : ['en'];
var DEBUG = PRODUCTION ? [true, false] : [true];
var UI_TYPE = ['', 'MOBILE'];
// Empty string means that user agent is not specified.
var USER_AGENT = (PRODUCTION || !FAST_DEBUG) ?
    ['', 'IE', 'GECKO', 'WEBKIT', 'OPERA'] : [''];

// Inputs for less compiler. These are for further gss minification.
var lessFileNames = [
  'less/combined.less'
];

function makeListOfCompileTargets() {
  var targets = [];

  LOCALES.forEach(function(locale) {
    DEBUG.forEach(function(debug) {
      UI_TYPE.forEach(function(uiType) {
        USER_AGENT.forEach(function(userAgent) {
          targets.push({
            locale: locale,
            debug: debug,
            uiType: uiType,
            userAgent: userAgent
          });
        });
      });
    });
  });

  return targets;
}

function fillCompileTargetsWithDefines(aTargets) {
  var targets = [];

  aTargets.forEach(function(target) {
    target.jsCompDefines = [];
    target.lessDefines = [];

    // Locale.
    target.jsCompDefines.push("goog.LOCALE='" + target.locale + "'");
    // DEBUG.
    target.jsCompDefines.push("'goog.DEBUG=" + target.debug + "'");
    // UI type.
    target.jsCompDefines.push("rflect.UI_TYPE='" + target.uiType + "'");
    target.lessDefines.push("UI_TYPE='" + target.uiType + "'");
    // Assumptions on user agent.
    if (target.userAgent)
      target.jsCompDefines.push("'goog.userAgent.ASSUME_" + target.userAgent +
          "=true'");

  });

  return aTargets;
}

/**
 * @typedef {{locale:String, debug:boolean, uiType:string, userAgent:string,
 *    jsCompDefines:Array.<string>, lessDefines:Array.<string>,
 *    jsFilename:string, cssFilename:string}}
 */
var Target;

/**
 * @type {Array.<Target>}
 */
var TARGETS = fillCompileTargetsWithDefines(makeListOfCompileTargets());

/**
 * Map of css compilation key to array of associated target indexes.
 * @type {Object.<string,number>}
 */
var cssKeysToTargetIndexes = {};

// Closure builder task without targets.
var closureBuilderTask = {
  options: {
    // [REQUIRED] To find the builder executable we need either the path to
    //    closure library or directly the filepath to the builder:
    closureLibraryPath: 'src/closure-library', // path to closure library
    // [OPTIONAL] You can define an alternative path of the builder.
    //    If set it trumps 'closureLibraryPath' which will not be required.
    //builder: 'path/to/closurebuilder.py',

    // [REQUIRED] One of the two following options is required:
    //inputs: ['src/closure-library', 'src/rflect'], // input files (can just be the entry point)
    namespaces: ['rflect.cal.Loader'], // namespaces

    // [OPTIONAL] The location of the compiler.jar
    // This is required if you set the option "compile" to true.
    compilerFile: 'bin/compiler.jar',

    // [OPTIONAL] output_mode can be 'list', 'script' or 'compiled'.
    //    If compile is set to true, 'compiled' mode is enforced.
    //    Default is 'script'.
    //output_mode: '',

    // [OPTIONAL] if we want builder to perform compile
    compile: true, // boolean

    compilerOpts: {
      /**
       * Go wild here...
       * any key will be used as an option for the compiler
       * value can be a string or an array
       * If no value is required use null
       */


      /**
       * Keys will be used as directives for the compiler
       * values can be strings or arrays.
       * If no value is required use null
       *
       * The directive 'externs' is treated as a special case
       * allowing a grunt file syntax (<config:...>, *)
       *
       * Following are some directive samples...
       */
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
      summary_detail_level: 3,
      warning_level: 'VERBOSE',
      js: ['src/deps.js', 'src/closure-library/closure/goog/deps.js'],
      define: ["'goog.DEBUG=false'"],
      debug: false,
      source_map_format: 'V3',
      create_source_map: 'build/outputcompiled.js.map',
      formatting: ['PRETTY_PRINT', 'PRINT_INPUT_DELIMITER'],
      closure_entry_point: 'rflect.cal.Loader',

      externs: ['src/externs.js'],
    },
    // [OPTIONAL] Set exec method options
    execOpts: {
      /**
       * Set maxBuffer if you got message "Error: maxBuffer exceeded."
       * Node default: 200*1024
       * maxBuffer: 999999 * 1024
       */
      maxBuffer: 200 * 1024
    }

  }

}

// Any closureBuilder task target must inherit this template.
var compilationTargetTemplate = {
  options: {
    compilerOpts: {
      charset: 'utf-8',
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
      summary_detail_level: 3,
      warning_level: 'VERBOSE',
      js: ['src/deps.js', 'src/closure-library/closure/goog/deps.js'],
      define: [],
      debug: false,
      source_map_format: 'V3',
      closure_entry_point: 'rflect.cal.Loader',

      externs: ['src/externs.js']
    }
  },

  // [REQUIRED] paths to be traversed to build the dependencies
  src: ['src/closure-library', 'src/rflect'],

  // [OPTIONAL] if not set, will output to stdout
  dest: 'build/outputcompiled.js'
};


function targetToJsFileMapper(aTarget, aIndex){
  var targetOptions = deepClone(compilationTargetTemplate);

  if (!PRODUCTION) {
    var sourceMapName = 'build/outputcompiled-' + aTarget.locale + '.js.' +
        aIndex + '.map'
    targetOptions.options.compilerOpts.create_source_map =
        sourceMapName;
  }

  targetOptions.options.compilerOpts.define = aTarget.jsCompDefines;

  targetOptions.dest = 'build/' + '_temp' + aIndex + '.outputcompiled-' +
      aTarget.locale +
      (aTarget.userAgent ? '-' + aTarget.userAgent : '')  +
      (aTarget.uiType ? '-' + aTarget.uiType : '')  +
      (aTarget.debug ? '-debug' : '')  +
      '.js';

  closureBuilderTask['compileForTarget-' + aIndex] = targetOptions;

}

var lessTask = {};

var lessTargetTemplate = {
  command: ''
}

function makeLessCompCommand(aKey, aTarget) {
  var outputFileName = 'build/' + '_temp.' + aKey + '.outputcompiled' +
      (aTarget.uiType ? '-' + aTarget.uiType : '')  +
      '.css'

  return ['lessc', '--verbose']
      .concat(lessFileNames).concat(['>', outputFileName])
      .concat(aTarget.lessDefines.map(function(aDefine){
    return '--modify-var=' + aDefine;
  })).join(' ');
}

function targetToCssFileMapper(aTarget, aIndex){
  var targetOptions = deepClone(lessTargetTemplate);

  //TODO(alexk): for now, css are only defined by ui type.
  var key = aTarget.uiType;

  if (!cssKeysToTargetIndexes[key]) {
    cssKeysToTargetIndexes[key] = [];

    if (!PRODUCTION) {
      /*var sourceMapName = 'build/outputcompiled-' + aTarget.locale + '.js.' +
          aIndex + '.map'
      targetOptions.options.compilerOpts.create_source_map =
          sourceMapName;*/
    }

    targetOptions.command = makeLessCompCommand(key, aTarget);
    lessTask['lessForTarget-' + key] = targetOptions;
  }

  cssKeysToTargetIndexes[key].push(aIndex);
}

TARGETS.forEach(targetToJsFileMapper);

TARGETS.forEach(targetToCssFileMapper);

module.exports = function(grunt) {
  // Measure build time.
  require('time-grunt')(grunt);

  function jsFileToTargetMapper(dest, src){
    var fileName = src.substring(src.indexOf('/'));
    var fileNameParts = fileName.split('.');
    var fileIndexStr = fileNameParts.splice(0, 1)[0];
    var fileIndex = /\d+/.exec(fileIndexStr);
    var newFileName = fileNameParts.join('.');

    if (!TARGETS[fileIndex].jsFileNames)
      TARGETS[fileIndex].jsFileNames = [];
    TARGETS[fileIndex].jsFileNames.push(newFileName);

    grunt.log.writeln('\nFile ', src, ' was renamed to ', dest +
        newFileName, '.');

    return dest + newFileName;
  }

  function cssFileToTargetMapper(dest, src) {
    var fileName = src.substring(src.indexOf('/'));
    var fileNameParts = fileName.split('.');
    var fileKey = fileNameParts.splice(0, 2)[1];
    var newFileName = fileNameParts.join('.');

    grunt.log.writeln('fileKey ', fileKey);
    grunt.log.writeln('cssKeysToTargetIndexes ', cssKeysToTargetIndexes);

    TARGETS.forEach(function(aTarget, aIndex){
      if (!aTarget.cssFileNames)
        aTarget.cssFileNames = [];
      if (cssKeysToTargetIndexes[fileKey] &&
          cssKeysToTargetIndexes[fileKey].indexOf(aIndex) > -1)
        aTarget.cssFileNames.push(newFileName);
    });

    grunt.log.writeln('\nFile ', src, ' was renamed to ', dest +
        newFileName, '.');

    return dest + newFileName;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: ['build/*'],
      temp: ['build/_temp*', 'build/*.map']
    },
    closureBuilder: closureBuilderTask,
    exec: lessTask,
    copy: {
      app: {
        expand: true,
        flatten: false,
        src: ['app/**', 'app.js', 'package.json'],
        dest: 'build/'
      },
      sourceMaps: {
        expand: true,
        flatten: true,
        src: 'build/*.map',
        dest: 'build/static/js/'
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 32
      },
      statics: {
        src: 'build/**/*.{css,js,woff}'
      }
    },
    wrap: {
      renameCss: {
        src: ['build/*outputcompiled*.css'],
        dest: 'build/static/css/',
        options: {
          separator: '',
          rename: cssFileToTargetMapper
        }
      },
      renameJs: {
        src: ['build/*outputcompiled*.js'],
        dest: 'build/static/js/',
        options: {
          separator: '',
          rename: jsFileToTargetMapper,
          wrapper: function(src, options) {
            var fileName = src.substring(src.indexOf('/'));

            if (!PRODUCTION) {
              var fileNameParts = fileName.split('.');
              var fileIndex = /\d+/.exec(fileNameParts[0]);

              var sourceMapName = 'outputcompiled-' +
                  TARGETS[fileIndex].locale + '.js.' + fileIndex + '.map';

              return ['', '//@ sourceMappingURL=' + sourceMapName];
            }

            return ['', ''];
          }
        }
      }

    }

  });

  grunt.registerTask('exportTargets', function() {
    var targetsTemplateFileName = 'app/config/targets.js';
    var targetsFileName = 'build/app/config/targets.js';

    TARGETS.forEach(function(aTarget){
      // We do not need jsCompDefines and lessDefines for export.
      delete aTarget.jsCompDefines;
      delete aTarget.lessDefines;
    });

    grunt.log.writeln('TARGETS that will be written: ', TARGETS);

    var templateContents = fs.readFileSync(targetsTemplateFileName, {
      encoding: 'utf-8'
    });

    var contents = templateContents.replace('/*{TARGETS_JSON}*/[]',
        JSON.stringify(TARGETS, null, '  '));

    fs.writeFileSync(targetsFileName, contents);

  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-renaming-wrap');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', [
    'clean:all',
    //less
    'exec',
    'closureBuilder',
    'filerev',
    'wrap:renameCss',
    'wrap:renameJs',
    'copy:sourceMaps',
    'copy:app',
    'exportTargets',
    'clean:temp'
  ]);

};
