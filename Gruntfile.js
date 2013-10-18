module.exports = function(grunt) {

  var deepClone = require('clone');

  // These are compilation target axises. So, total number of compilation
  // targets is product of array lengths.
  var LOCALES = ['en', 'ru', 'by', 'fr'];
  var DEBUG = [true, false];
  var UI_TYPE = ['DESKTOP'];
  // False mean - do not specify user agent.
  var USER_AGENT = [false, 'IE', 'GECKO', 'WEBKIT', 'OPERA'];

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
      target.defines = [];

      // Locale.
      target.defines.push("goog.LOCALE='" + target.locale + "'");
      // DEBUG.
      target.defines.push("'goog.DEBUG=" + target.debug + "'");
      // UI type.
      //target.defines.push("rflect.UI_TYPE='" + target.uiType + "'");
      // Assumptions on user agent.
      if (target.userAgent)
        target.defines.push("'goog.userAgent.ASSUME_" + target.userAgent + "=true'");
    });

    return aTargets;
  }

  var TARGETS = fillCompileTargetsWithDefines(makeListOfCompileTargets());

  grunt.log.writeln(TARGETS);

  // List of filenames so that options set could be mapped to files.
  var resultFileNames = [];

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
        create_source_map: 'build/outputcompiled.js.map',
        closure_entry_point: 'rflect.cal.Loader',

        externs: ['src/externs.js']
      }
    },

    // [REQUIRED] paths to be traversed to build the dependencies
    src: ['src/closure-library', 'src/rflect'],

    // [OPTIONAL] if not set, will output to stdout
    dest: 'build/outputcompiled.js'
  };

  TARGETS.forEach(function(aTarget, aIndex){
    var targetOptions = deepClone(compilationTargetTemplate);

    var sourceMapName = 'build/outputcompiled-' + aTarget.locale + '.js.' +
        aIndex + '.map'
    targetOptions.options.compilerOpts.create_source_map =
        sourceMapName;

    targetOptions.options.compilerOpts.define = aTarget.defines;

    if (aTarget.debug)
      targetOptions.options.compilerOpts.output_wrapper =
          '%output%\n\\\\@ sourceMappingURL=' + sourceMapName;

    targetOptions.dest = 'build/' + '_temp' + aIndex + '.outputcompiled-' +
        aTarget.locale +
        (aTarget.userAgent ? '-' + aTarget.userAgent : '')  +
        (aTarget.debug ? '-debug' : '')  +
        '.js';

    closureBuilderTask['compileForTarget-' + aIndex] = targetOptions;

  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      all: ['build/*'],
      temp: ['build/_temp*']
    },
    closureBuilder: closureBuilderTask,
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
      removeIndexes: {
        src: ['build/*.js'],
        dest: 'build/',
        options: {
          separator: '',
          rename: function(dest, src) {
             var fileName = src.substring(src.indexOf('/'));
             var fileNameParts = fileName.split('.');
             var fileIndexStr = fileNameParts.splice(0, 1)[0];
             var fileIndex = /\d+/.exec(fileIndexStr);
             var newFileName = fileNameParts.join('.');

             resultFileNames[fileIndex] = newFileName;

             grunt.log.writeln('\nFile ', src, ' was renamed to ', dest +
                newFileName, '.');

             return dest + newFileName;
          }
        }
      }
    }

  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-renaming-wrap');

  // Default task(s).
  grunt.registerTask('default', ['clean:all', 'closureBuilder', 'filerev',
      'wrap:removeIndexes', 'clean:temp']);

};
