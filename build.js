#!/usr/bin/env node

/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Plain Node.js build script (no Grunt dependency)
 * @author alexeykofficial@gmail.com (Alex K.)
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');

// Parse command line arguments
const args = process.argv.slice(2);
const DEV_BUILD = args.includes('--dev');
const PACK_BUILD = args.includes('--zip');
const DEV_COMPILATION = args.includes('--compile-only');

console.log('Build configuration:', { DEV_BUILD, PACK_BUILD, DEV_COMPILATION });

// Import app config
let appConfig;
try {
  appConfig = require('./app/config/appconfig');
} catch (e) {
  console.warn('Warning: Could not load appconfig, using defaults');
  appConfig = { LOCALES: ['en', 'ru'] };
}

/**
 * Utility functions
 */

function cleanDirectory(pattern) {
  console.log(`Cleaning: ${pattern}`);
  try {
    execSync(`rm -rf ${pattern}`, { stdio: 'inherit' });
  } catch (e) {
    // Ignore errors if files don't exist
  }
}

function mkdirp(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  console.log(`Copying ${src} to ${dest}`);
  mkdirp(path.dirname(dest));
  try {
    execSync(`cp -r ${src} ${dest}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Error copying ${src}:`, e.message);
  }
}

/**
 * Generate compilation targets
 */
function makeListOfCompileTargets() {
  const LOCALES = !DEV_COMPILATION ? appConfig.LOCALES : ['ru'];
  const DEBUG = !DEV_COMPILATION ? [true, false] : [true];
  const UI_TYPE = !DEV_COMPILATION ? ['', 'MOBILE'] : [''];
  const USER_AGENT = !DEV_COMPILATION ? ['', 'IE', 'GECKO', 'WEBKIT', 'OPERA'] : [''];

  const targets = [];

  LOCALES.forEach(locale => {
    DEBUG.forEach(debug => {
      UI_TYPE.forEach(uiType => {
        USER_AGENT.forEach(userAgent => {
          targets.push({
            locale,
            debug,
            uiType,
            userAgent,
            jsCompDefines: [],
            lessDefines: [],
            jsFileNames: [],
            cssFileNames: [],
            loginCssFileNames: []
          });
        });
      });
    });
  });

  return targets;
}

function fillCompileTargetsWithDefines(targets) {
  targets.forEach(target => {
    target.jsCompDefines = [
      `goog.LOCALE='${target.locale}'`,
      `goog.DEBUG=${target.debug}`,
      `rflect.UI_TYPE='${target.uiType}'`
    ];

    target.lessDefines = [
      `UI_TYPE='${target.uiType}'`
    ];

    if (target.userAgent) {
      target.jsCompDefines.push(`goog.userAgent.ASSUME_${target.userAgent}=true`);
    }

    if (DEV_COMPILATION) {
      target.jsCompDefines.push(`goog.DEBUG=true`);
    }
  });

  return targets;
}

const TARGETS = fillCompileTargetsWithDefines(makeListOfCompileTargets());

console.log(`Generated ${TARGETS.length} compilation targets`);

/**
 * Compile Soy templates
 */
function compileSoy() {
  console.log('\n=== Compiling Soy templates ===');
  cleanDirectory('src/rflect/cal/ui/soy/*.soy.js');

  const soyDir = 'soy';
  const soyFiles = fs.readdirSync(soyDir)
    .filter(f => /\.soy$/.test(f))
    .map(f => path.join(soyDir, f))
    .join(',');

  const cmd = [
    'java',
    '-jar',
    'bin/SoyToJsSrcCompiler.jar',
    '--shouldProvideRequireSoyNamespaces',
    '--shouldGenerateJsdoc',
    '--codeStyle',
    'concat',
    '--outputPathFormat',
    'src/rflect/cal/ui/soy/{INPUT_FILE_NAME_NO_EXT}.soy.js',
    '--srcs',
    soyFiles
  ].join(' ');

  console.log('Running:', cmd);
  execSync(cmd, { stdio: 'inherit' });

  // Delete soy requires
  deleteSoyRequires();
}

function deleteSoyRequires() {
  const soyDir = 'src/rflect/cal/ui/soy';
  const files = fs.readdirSync(soyDir);

  files.forEach(fileName => {
    const fullPath = path.join(soyDir, fileName);
    if (fs.statSync(fullPath).isFile()) {
      let contents = fs.readFileSync(fullPath, 'utf-8');
      contents = contents
        .replace(/goog\.require\('soy'\);\s/g, '')
        .replace(/goog\.require\('soydata'\);\s\s/g, '')
        .replace(/goog\.require\('soydata'\);/g, '');
      fs.writeFileSync(fullPath, contents);
    }
  });
}

/**
 * Compile LESS files
 */
function compileLess() {
  console.log('\n=== Compiling LESS files ===');
  cleanDirectory('css/*compiled*');
  cleanDirectory('css/login.css');

  const cssKeysToTargetIndexes = {};

  TARGETS.forEach((target, index) => {
    const key = target.uiType;

    if (!cssKeysToTargetIndexes[key]) {
      cssKeysToTargetIndexes[key] = [];

      // Compile main CSS
      const mainCssFile = `css/_temp.${key}.outputcompiled${target.uiType ? '-' + target.uiType : ''}.css`;
      const lessCmd = [
        'lessc',
        '--verbose',
        ...(DEV_COMPILATION ? [] : ['--compress']),
        'less/combined.less',
        mainCssFile,
        ...target.lessDefines.map(d => `--modify-var="${d}"`)
      ].join(' ');

      console.log(`Compiling LESS for ${key || 'default'}:`, lessCmd);
      execSync(lessCmd, { stdio: 'inherit' });

      // Compile login CSS
      const loginCssFile = `css/_temp.${key}.outputcompiled${target.uiType ? '-' + target.uiType : ''}-login.css`;
      const loginLessCmd = [
        'lessc',
        '--verbose',
        ...(DEV_COMPILATION ? [] : ['--compress']),
        'less/login.less',
        loginCssFile,
        ...target.lessDefines.map(d => `--modify-var="${d}"`)
      ].join(' ');

      console.log(`Compiling login LESS for ${key || 'default'}:`, loginLessCmd);
      execSync(loginLessCmd, { stdio: 'inherit' });
    }

    cssKeysToTargetIndexes[key].push(index);
  });

  return cssKeysToTargetIndexes;
}

/**
 * Compile JavaScript with Closure Compiler (concurrent)
 */
async function compileJs() {
  console.log('\n=== Compiling JavaScript ===');
  cleanDirectory('js/*compiled*');

  const cpuCount = os.cpus().length;
  console.log(`Running ${TARGETS.length} compilation tasks on ${cpuCount} CPU cores`);

  // Split targets into batches
  const batchSize = Math.ceil(TARGETS.length / cpuCount);
  const batches = [];

  for (let i = 0; i < TARGETS.length; i += batchSize) {
    batches.push(TARGETS.slice(i, i + batchSize));
  }

  // Run batches in parallel
  const promises = batches.map((batch, batchIndex) => {
    return new Promise((resolve, reject) => {
      // Process this batch sequentially
      const compileBatch = async () => {
        for (let i = 0; i < batch.length; i++) {
          const target = batch[i];
          const targetIndex = batches.slice(0, batchIndex).reduce((sum, b) => sum + b.length, 0) + i;

          try {
            await compileTarget(target, targetIndex);
          } catch (e) {
            reject(e);
            return;
          }
        }
        resolve();
      };

      compileBatch();
    });
  });

  await Promise.all(promises);
  console.log('JavaScript compilation complete');
}

function compileTarget(target, index) {
  return new Promise((resolve, reject) => {
    const outputFile = `js/_temp${index}.outputcompiled-${target.locale}` +
      `${target.userAgent ? '-' + target.userAgent : ''}` +
      `${target.uiType ? '-' + target.uiType : ''}` +
      `${target.debug ? '-debug' : ''}.js`;

    const sourceMapFile = DEV_BUILD || DEV_COMPILATION
      ? `js/outputcompiled-${target.locale}.js.${index}.map`
      : null;

    const defines = [...target.jsCompDefines];
    if (DEV_COMPILATION) {
      defines.push('goog.DEBUG=true');
    }

    const args = [
      '-jar', 'bin/compiler.jar',
      '--js', 'src/deps.js',
      '--js', 'src/closure-library/closure/goog/deps.js',
      '--compilation_level', 'ADVANCED_OPTIMIZATIONS',
      '--summary_detail_level', '3',
      '--warning_level', 'VERBOSE',
      ...defines.map(d => ['--define', d]).flat(),
      '--js_output_file', outputFile,
      '--closure_entry_point', 'rflect.cal.Loader',
      '--language_in', 'ECMASCRIPT6',
      '--language_out', 'ECMASCRIPT5',
      '--output_wrapper', ';(function(){%output%})();',
      '--externs', 'src/externs.js',
      '--charset', 'utf-8'
    ];

    if (sourceMapFile) {
      args.push('--create_source_map', sourceMapFile);
      args.push('--source_map_format', 'V3');
    }

    if (DEV_COMPILATION) {
      args.push('--formatting', 'PRETTY_PRINT');
      args.push('--formatting', 'PRINT_INPUT_DELIMITER');
      args.push('--debug');
    }

    // Build dependency tree using closurebuilder
    const builderArgs = [
      'src/closure-library/closure/bin/build/closurebuilder.py',
      '--root=src/closure-library',
      '--root=src/rflect',
      '--namespace=rflect.cal.Loader',
      '--output_mode=list'
    ];

    console.log(`[${index + 1}/${TARGETS.length}] Compiling ${target.locale}${target.uiType ? '-' + target.uiType : ''}${target.userAgent ? '-' + target.userAgent : ''}${target.debug ? '-debug' : ''}...`);

    // First get list of files from closurebuilder
    let fileList;
    try {
      fileList = execSync(`python ${builderArgs.join(' ')}`, { encoding: 'utf-8' });
    } catch (e) {
      reject(new Error(`Failed to run closurebuilder: ${e.message}`));
      return;
    }

    const jsFiles = fileList.trim().split('\n').filter(f => f);

    // Add all JS files to compiler args
    const fullArgs = [
      ...args.slice(0, 2), // -jar compiler.jar
      ...jsFiles.map(f => ['--js', f]).flat(),
      ...args.slice(2)
    ];

    const child = spawn('java', fullArgs, {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stderr = '';

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`Compilation failed for target ${index}:`);
        console.error(stderr);
        reject(new Error(`Compilation failed with code ${code}`));
      } else {
        if (stderr && DEV_COMPILATION) {
          console.log(stderr);
        }
        resolve();
      }
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Build function
 */
async function build() {
  console.log('\n=== Starting Build ===\n');

  try {
    // Clean
    console.log('\n=== Cleaning ===');
    cleanDirectory('build/*');

    // Compile LESS
    const cssKeysToTargetIndexes = compileLess();

    // Compile Soy
    compileSoy();

    // Compile JS
    await compileJs();

    // Create directories
    console.log('\n=== Creating directories ===');
    mkdirp('build/static/js');
    mkdirp('build/static/css');
    mkdirp('build/logs');

    // Copy files
    console.log('\n=== Copying files ===');

    // Copy JS files
    const jsFiles = fs.readdirSync('js').filter(f => f.startsWith('_temp') && f.endsWith('.js'));
    jsFiles.forEach(file => {
      fs.copyFileSync(path.join('js', file), path.join('build/static/js', file));
    });

    // Copy CSS files
    const cssFiles = fs.readdirSync('css').filter(f => f.startsWith('_temp') && f.endsWith('.css'));
    cssFiles.forEach(file => {
      fs.copyFileSync(path.join('css', file), path.join('build/static/css', file));
    });

    // Copy source maps
    if (DEV_BUILD || DEV_COMPILATION) {
      const mapFiles = fs.readdirSync('js').filter(f => f.endsWith('.map'));
      mapFiles.forEach(file => {
        fs.copyFileSync(path.join('js', file), path.join('build/static/js', file));
      });
    }

    // Copy external JS
    if (fs.existsSync('src/d3/d3.min.js')) {
      fs.copyFileSync('src/d3/d3.min.js', 'build/static/js/d3.min.js');
    }

    // Copy app files
    copyRecursive('app', 'build/app');
    if (fs.existsSync('app.js')) {
      fs.copyFileSync('app.js', 'build/app.js');
    }
    if (fs.existsSync('package.json')) {
      fs.copyFileSync('package.json', 'build/package.json');
    }

    // Copy fonts
    if (fs.existsSync('font')) {
      copyRecursive('font', 'build/static/font');
    }

    // Copy sources if dev build
    if (DEV_BUILD) {
      console.log('Copying sources for dev build...');
      copyRecursive('src', 'build/src');
    }

    // Export targets
    exportTargets();

    // Override config directives
    overrideConfigDirectives();

    // Clean temp files
    console.log('\n=== Cleaning temp files ===');
    cleanDirectory('js/*compiled*');
    cleanDirectory('css/*compiled*');
    cleanDirectory('css/login.css');

    console.log('\n=== Build Complete! ===');
    console.log('Output directory: build/');

  } catch (error) {
    console.error('\n=== Build Failed ===');
    console.error(error);
    process.exit(1);
  }
}

function exportTargets() {
  console.log('\n=== Exporting targets ===');

  const targetsTemplateFileName = 'app/config/targets.js';
  const targetsFileName = 'build/app/config/targets.js';

  // Clean up targets for export
  const exportTargets = TARGETS.map(t => ({
    locale: t.locale,
    debug: t.debug,
    uiType: t.uiType,
    userAgent: t.userAgent,
    jsFileNames: t.jsFileNames,
    cssFileNames: t.cssFileNames,
    loginCssFileNames: t.loginCssFileNames
  }));

  const templateContents = fs.readFileSync(targetsTemplateFileName, 'utf-8');
  const contents = templateContents.replace(
    '/*{TARGETS_JSON}*/[]',
    JSON.stringify(exportTargets, null, 2).replace(/"/g, "'")
  );

  fs.writeFileSync(targetsFileName, contents);
  console.log('Targets exported to', targetsFileName);
}

function overrideConfigDirectives() {
  console.log('\n=== Overriding config directives ===');

  const configFile = 'build/app/config/appconfig.js';
  if (fs.existsSync(configFile)) {
    let contents = fs.readFileSync(configFile, 'utf-8');
    contents = contents
      .replace(/exports\.COMPILED\s+=\s+\w+;/, 'exports.COMPILED = true;')
      .replace(/exports\.BUILT\s+=\s+\w+;/, 'exports.BUILT = true;');
    fs.writeFileSync(configFile, contents);
  }
}

/**
 * Main entry point
 */
if (require.main === module) {
  build().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { build };
