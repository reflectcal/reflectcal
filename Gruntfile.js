module.exports = function(grunt) {

  var deepClone = require('clone');

  var LOCALES = ['en', 'ru', 'by'];

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
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        summary_detail_level: 3,
        warning_level: 'VERBOSE',
        js: ['src/deps.js', 'src/closure-library/closure/goog/deps.js'],
        define: ["'goog.DEBUG=false'"],
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

  LOCALES.forEach(function(aLocaleName){
    var targetForLocale = deepClone(compilationTargetTemplate);

    targetForLocale.options.compilerOpts.create_source_map = 'build/outputcompiled-' + aLocaleName + '.js.map';
    targetForLocale.options.compilerOpts.define.push("goog.LOCALE='" + aLocaleName + "'");

    targetForLocale.dest = 'build/outputcompiled-' + aLocaleName + '.js';

    closureBuilderTask['compileForLocale-' + aLocaleName] = targetForLocale;

  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build/*'],
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
    }
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-filerev');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'closureBuilder', 'filerev']);

};
