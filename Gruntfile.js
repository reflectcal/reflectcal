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

module.exports = function(grunt) {
  // Measure build time.
  require('time-grunt')(grunt);

  /**
   * Development build flag.
   * If it's false, it means that app is built for external world - sources,
   * source maps, source maps links won't be present in compiled code.
   * If it's true, app includes it all and could be tested on server in close
   * to production form.
   */
  global.DEV_BUILD = !!grunt.option('dev');

  /**
   * Whether to pack this build.
   */
  global.PACK_BUILD = !!grunt.option('zip');

  /**
   * Development compile flag. Instead of building app, we can only recompile
   * code, in that case this flag is true.
   */
  global.DEV_COMPILATION = false;

  /**
   * Less task names, like lessForTarget-* .
   */
  global.lessTaskNames = [];

  /**
   * Map of css compilation key to array of associated target indexes.
   * @type {Object.<string,number>}
   */
  global.cssKeysToTargetIndexes = {};

  // Inputs for less compiler.
  var LESS_FILE_NAMES = [
    'less/combined.less'
  ];

  /**
   * @typedef {{locale:String, debug:boolean, uiType:string, userAgent:string,
   *    jsCompDefines:Array.<string>, lessDefines:Array.<string>,
   *    jsFilename:string, cssFilename:string}}
   */
  var Target;

  /**
   * Prepares globals before compilation.
   * @param {boolean=} opt_compilationOnly Whether prepare globals only for
   * compilation, this means shorter list of goals.
   */
  function setGlobals(opt_compilationOnly) {
    global.DEV_COMPILATION = !!opt_compilationOnly;

    // These are compilation target axises. So, total number of compilation
    // targets is product of array lengths.
    var LOCALES = !global.DEV_COMPILATION ? appConfig.LOCALES : ['en'];
    var DEBUG = !global.DEV_COMPILATION ? [true, false] : [true];
    var UI_TYPE = !global.DEV_COMPILATION ? ['', 'MOBILE'] : [''];
    // Empty string means that user agent is not specified.
    var USER_AGENT = !global.DEV_COMPILATION ?
        ['', 'IE', 'GECKO', 'WEBKIT', 'OPERA'] : [''];


    /**
     * @type {Array.<Target>}
     */
    global.TARGETS = fillCompileTargetsWithDefines(makeListOfCompileTargets(
        LOCALES, DEBUG, UI_TYPE, USER_AGENT));

    global.TARGETS.forEach(targetToJsFileMapper);

    global.TARGETS.forEach(targetToCssFileMapper);
  }

  function buildTask() {
    setGlobals();

    var task = [
      'clean:build'
    ].concat(getCompileLessTask()).concat(getCompileJsTask()).concat([
      'mkdir:js',
      'mkdir:css',
      'copy:jsToBuild',
      'copy:cssToBuild',
      'clean:js',
      'clean:css',
      'filerev',
      'wrap:renameCss',
      'wrap:renameJs',
      'copy:externalJsToStatic',
      'copy:sourceMaps'
    ]).concat(global.DEV_BUILD ? [
      'copy:sources'
    ] : []).concat([
      'copy:app',
      'copy:fonts',
      'mkdir:logs',
      'overrideConfigDirectives',
      'exportTargets',
      'clean:temp'
    ]).concat(global.PACK_BUILD ? [
      'compress:tarFile',
      'compress:tarGzip',
      'filerev:build',
      'clean:allExceptPack'
    ] : []);

    grunt.task.run(task);
  }

  function compileTask() {
    setGlobals(true);

    var task = getCompileLessTask().concat(getCompileJsTask());

    grunt.task.run(task);
  }

  function compileJsTask() {
    setGlobals(true);

    var task = getCompileJsTask();

    grunt.task.run(task);
  }

  function compileLessTask() {
    setGlobals(true);

    var task = getCompileLessTask();

    grunt.task.run(task);
  }

  function getCompileJsTask() {
    return [
      'clean:js'
    ].concat([
      'closureBuilder'
    ]);
  }

  function getCompileLessTask() {
    return [
      'clean:css'
    ].concat(
      //Less tasks will be inserted here, since they share common exec task, we
      // must place them all explicitly by name, to not interfere with other exec
      // tasks.
      /*exec:lessForTarget-1*/
      global.lessTaskNames);
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

  function makeListOfCompileTargets(aLocales, aDebug, aUiType, aUserAgent) {
    var targets = [];

    aLocales.forEach(function(locale) {
      aDebug.forEach(function(debug) {
        aUiType.forEach(function(uiType) {
          aUserAgent.forEach(function(userAgent) {
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
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',

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
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT5',

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

    if (global.DEV_BUILD || global.DEV_COMPILATION) {
      var sourceMapName = 'js/outputcompiled-' + aTarget.locale + '.js.' +
          aIndex + '.map';
      targetOptions.options.compilerOpts.create_source_map =
          sourceMapName;
    }

    targetOptions.options.compilerOpts.define = aTarget.jsCompDefines;

    if (global.DEV_COMPILATION) {
      targetOptions.options.compilerOpts.define.push("'goog.DEBUG=true'");
      targetOptions.options.compilerOpts.formatting = ['PRETTY_PRINT',
          'PRINT_INPUT_DELIMITER'];
      targetOptions.options.compilerOpts.debug = true;
    }

    targetOptions.dest = 'js/' + '_temp' + aIndex + '.outputcompiled-' +
        aTarget.locale +
        (aTarget.userAgent ? '-' + aTarget.userAgent : '')  +
        (aTarget.uiType ? '-' + aTarget.uiType : '')  +
        (aTarget.debug ? '-debug' : '')  +
        '.js';

    closureBuilderTask['compileForTarget-' + aIndex] = targetOptions;

  }

  /**
   * Common exec task.
   */
  var execTask = {};

  var execTaskTemplate = {
    command: ''
  }

  var gJsLintTaskName = 'gjslinter';
  var fixJsStyleTaskName = 'fixjsstyle';

  //Creating linter tasks;
  (function(){
    var targetOptions = deepClone(execTaskTemplate);

    targetOptions.command = ['python', 'bin/gjslint.py',
        '--strict', '-r', 'src/rflect'].join(' ');
    execTask[gJsLintTaskName] = targetOptions;
  })();

  (function(){
    var targetOptions = deepClone(execTaskTemplate);

    targetOptions.command = ['python', 'bin/fixjsstyle.py',
        '--strict', '-r', 'src/rflect'].join(' ');
    execTask[fixJsStyleTaskName] = targetOptions;
  })();


  function makeLessCompCommand(aKey, aTarget, aSourceMapName) {
    var outputFileName = 'css/' + '_temp.' + aKey + '.outputcompiled' +
        (aTarget.uiType ? '-' + aTarget.uiType : '')  +
        '.css'

    var command = ['lessc', '--verbose']
        /*.concat(global.DEV_BUILD || global.DEV_COMPILATION ?
        ['--source-map=' + aSourceMapName] : [])*/
        .concat(global.DEV_COMPILATION ? [] : ['--compress'])
        .concat(LESS_FILE_NAMES).concat(['>', outputFileName])
        .concat(aTarget.lessDefines.map(function(aDefine){
      return '--modify-var="' + aDefine + '"';
    })).join(' ')
    return command;
  }

  function targetToCssFileMapper(aTarget, aIndex){
    var targetOptions = deepClone(execTaskTemplate);
    var sourceMapName;

    //TODO(alexk): for now, css are only defined by ui type.
    var key = aTarget.uiType;

    if (!global.cssKeysToTargetIndexes[key]) {
      global.cssKeysToTargetIndexes[key] = [];

      if (global.DEV_BUILD || global.DEV_COMPILATION) {
        sourceMapName = 'css/outputcompiled-' + aTarget.locale + '.css.' +
            aIndex + '.map'
      }

      targetOptions.command = makeLessCompCommand(key, aTarget, sourceMapName);
      var lessTaskName = 'lessForTarget-' + key;
      execTask[lessTaskName] = targetOptions;
      global.lessTaskNames.push('exec:' + lessTaskName);
    }

    global.cssKeysToTargetIndexes[key].push(aIndex);
  }


  function jsFileToTargetMapper(dest, src){
    var fileName = src.substring(src.indexOf('/'));
    var fileNameParts = fileName.split('.');
    var fileIndexStr = fileNameParts.splice(0, 1)[0];
    var fileIndex = /\d+/.exec(fileIndexStr);
    var newFileName = fileNameParts.join('.');

    if (!global.TARGETS[fileIndex].jsFileNames)
      global.TARGETS[fileIndex].jsFileNames = [];
    global.TARGETS[fileIndex].jsFileNames.push(newFileName);

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
    grunt.log.writeln('global.cssKeysToTargetIndexes ', global.cssKeysToTargetIndexes);

    global.TARGETS.forEach(function(aTarget, aIndex){
      if (!aTarget.cssFileNames)
        aTarget.cssFileNames = [];
      if (global.cssKeysToTargetIndexes[fileKey] &&
          global.cssKeysToTargetIndexes[fileKey].indexOf(aIndex) > -1)
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
      build: ['build/*'],
      temp: ['build/**/_temp*', 'js/**/*compiled*', 'css/**/*compiled*'],
      allExceptPack: ['build/*', '!build/*.tgz'],
      allExceptCompiled: ['build/*', '!build/js', '!build/css', '!build/font'],
      css: ['css/*compiled*'],
      js: ['js/*compiled*'],
      static: ['static/*']
    },
    closureBuilder: closureBuilderTask,
    closureDepsWriter: {
      options: {
        // [REQUIRED] To find the depswriter executable we need either the path
        // to closure library or the depswriter executable full path:
        closureLibraryPath: 'src/closure-library',

        // [OPTIONAL] Define the full path to the executable directly.
        // If set it trumps 'closureLibraryPath' which will not be required.
        // filepath to depswriter
        depswriter: 'src/closure-library/closure/bin/build/depswriter.py',

        // [OPTIONAL] Root directory to scan. Can be string or array
        //root: [],

        // [OPTIONAL] Root with prefix takes a pair of strings separated with a
        // space, so proper way to use it is to surround with quotes.
        // can be a string or array
        root_with_prefix: [
          '"src/rflect ../../../rflect"',
          '"src/third-party ../../../third-party"'
        ]

        // [OPTIONAL] string or array
        //path_with_depspath: ''


      },
       // any name that describes your operation
      sourceDependencies: {

        // [OPTIONAL] Set file targets. Can be a string, array or
        //    grunt file syntax (<config:...> or *)
        src: 'src/**.js',

        // [OPTIONAL] If not set, will output to stdout
        dest: 'src/deps.js'

      }
    },
    exec: execTask,
    copy: {
      app: {
        expand: true,
        flatten: false,
        src: ['app/**', 'app.js', 'package.json', 'client_secret_*json'],
        dest: 'build/'
      },
      fonts: {
        expand: true,
        flatten: false,
        src: ['fonts/**'],
        dest: 'build/static'
      },
      sourceMaps: {
        expand: true,
        flatten: true,
        src: 'js/*.map',
        dest: 'build/static/js/'
      },
      sources: {
        expand: true,
        flatten: false,
        src: 'src/**',
        dest: 'build/'
      },
      jsToBuild: {
        expand: true,
        flatten: true,
        src: ['js/*'],
        dest: 'build/static/js/'
      },
      cssToBuild: {
        expand: true,
        flatten: true,
        src: ['css/*'],
        dest: 'build/static/css/'
      },
      externalJsToBuild: {
        expand: true,
        flatten: true,
        src: 'src/d3/d3.min.js',
        dest: 'build/js/'
      },
      externalJsToStatic: {
        expand: true,
        flatten: true,
        src: 'src/d3/d3.min.js',
        dest: 'build/static/js/'
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 16
      },
      statics: {
        src: 'build/**/*.{css,js,woff}'
      },
      build: {
        src: 'build/*.tgz'
      }
    },
    wrap: {
      renameCss: {
        src: ['build/static/css/_temp*.css'],
        dest: 'build/static/css/',
        options: {
          separator: '',
          rename: cssFileToTargetMapper
        }
      },
      renameJs: {
        src: ['build/static/js/_temp*.js'],
        dest: 'build/static/js/',
        options: {
          separator: '',
          rename: jsFileToTargetMapper,
          wrapper: function(src, options) {
            var fileName = src.substring(src.indexOf('/'));

            if (global.DEV_BUILD || global.DEV_COMPILATION) {
              var fileNameParts = fileName.split('.');
              var fileIndex = /\d+/.exec(fileNameParts[0]);

              var sourceMapName = 'outputcompiled-' +
                  global.TARGETS[fileIndex].locale + '.js.' + fileIndex + '.map';

              return ['', '//@ sourceMappingURL=' + sourceMapName];
            }

            return ['', ''];
          }
        }
      }

    },
    less: {
      development: {
        options: {
          paths: ['less'],
          compress: false
        },
        files: {
          'static/css/compiled.css': 'less/combined.less'
        }
      },
      prod: {
        options: {
          paths: ['less'],
          compress: true
        },
        files: {
          'build/css/compiled.css': 'less/combined.less'
        }
      }
    },
    concat: {
      jsDev: {
        src: ['src/d3/d3.min.js', 'build/main.js'],
        dest: 'js/compiled.js'
      },
      css: {
        src: ['css/pure-release-0.5.0/pure-min.css', 'build/css/compiled.css'],
        dest: 'build/css/compiled.css'
      },
      js: {
        src: ['js/d3/d3.min.js', 'js/main.js'],
        dest: 'build/js/compiled.js'
      }
    },
    // Make a tarfile.
    compress: {
      tarFile: {
        options: {
          archive: 'build/build.tar',
          mode: 'tar'
        },
        files: [
          {expand: true, cwd: 'build/', src: ['**'], dest: ''}, // includes files in path and its subdirs
        ]
      },
      tarGzip: {
        options: {
          mode: 'gzip',
          level: 9
        },
        files: [
          {expand: true, src: ['build/build.tar'], dest: '', ext: '.tgz'}, // includes files in path and its subdirs
        ]
      }
    },
    mkdir: {
      logs: {
        options: {
          create: ['build/logs']
        }
      },
      js: {
        options: {
          create: ['build/static/js']
        }
      },
      css: {
        options: {
          create: ['build/static/css']
        }
      },
    }
  });

  grunt.registerTask('exportTargets', function() {
    var targetsTemplateFileName = 'app/config/targets.js';
    var targetsFileName = 'build/app/config/targets.js';

    global.TARGETS.forEach(function(aTarget){
      // We do not need jsCompDefines and lessDefines for export.
      delete aTarget.jsCompDefines;
      delete aTarget.lessDefines;
    });

    grunt.log.writeln('global.TARGETS that will be written: ', global.TARGETS);

    var templateContents = fs.readFileSync(targetsTemplateFileName, {
      encoding: 'utf-8'
    });

    var contents = templateContents.replace('/*{TARGETS_JSON}*/[]',
        JSON.stringify(global.TARGETS, null, '  ').replace(/\"/g,"'"));

    fs.writeFileSync(targetsFileName, contents);

  });

  grunt.registerTask('concatExternalJs', function() {
    var externalFiles = [
      'src/d3/d3.min.js'
    ];
    var buildDir = 'build';
    var closureCompiledFiles = fs.readdirSync(buildDir)
        .filter(function(aName){return /\.js$/.test(aName)})
        .map(function(aName){return (buildDir + '/' + aName)});
    grunt.log.writeln('Following files will be prepended with externals: ' +
        closureCompiledFiles + '.');

    externalFiles.reverse();

    closureCompiledFiles.forEach(function(aClosureName){
      var accumulatedContent = fs.readFileSync(aClosureName,
          {encoding: 'utf-8'});
      externalFiles.forEach(function(aExtName){
        var contents = fs.readFileSync(aExtName, {encoding: 'utf-8'});
        accumulatedContent = contents + ';\n' + accumulatedContent;
        grunt.log.writeln('Adding file ' + aExtName + ' to file ' +
            aClosureName + '.');
      });

      grunt.log.writeln('Writing file ' + aClosureName +
          ' with dependencies added.');
      fs.writeFileSync(aClosureName, accumulatedContent);
    });

  });

  grunt.registerTask('overrideConfigDirectives', function() {
    var configFile = 'build/app/config/appconfig.js';
    var contents = fs.readFileSync(configFile, {encoding: 'utf-8'});
    contents = contents.
        replace(/exports\.COMPILED\s+\=\s+\w+\;/,
        'exports.COMPILED = true;').
        replace(/exports\.BUILT\s+\=\s+\w+\;/,
        'exports.BUILT = true;');
    fs.writeFileSync(configFile, contents);
  });

  grunt.registerTask('moveJsAfterCompile', function() {
    var files = fs.readdirSync('/build');
    files.forEach(function(aFileName){
      if (/.js$/.exec(aFileName) || /.js$/.exec(aFileName)) {

      }
    });
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
  grunt.loadNpmTasks('grunt-closure-linter');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-mkdir');

  // Default task(s).
  grunt.registerTask('default', buildTask);

  grunt.registerTask('build', buildTask);

  grunt.registerTask('deps', [
    'closureDepsWriter'
  ]);

  grunt.registerTask('erase', [
    'clean:build',
    'clean:temp'
  ]);

  grunt.registerTask('compile', compileTask);

  grunt.registerTask('compile-all', compileTask);

  grunt.registerTask('compile-js', compileJsTask);

  grunt.registerTask('compile-less', compileLessTask);

  grunt.registerTask('gjslinter', [
    'exec:' + gJsLintTaskName
  ]);

  grunt.registerTask('fixjstyle', [
    'exec:' + fixJsStyleTaskName
  ]);
};
