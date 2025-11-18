#!/usr/bin/env node

/*
 * Copyright (c) 2025. Alexey Komov
 */

/**
 * @fileoverview Plain Node.js build script (no Grunt dependency)
 * @author alexeykcontact@gmail.com (Alex K.)
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const os = require('os');
const chalk = require('chalk');
const crypto = require('crypto');
const zlib = require('zlib');
const { promisify } = require('util');

const brotliCompress = promisify(zlib.brotliCompress);

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
  console.log(`Batches will run sequentially: 0-${cpuCount-1}, then ${cpuCount}-${cpuCount*2-1}, etc.\n`);

  // Split targets into batches of cpuCount size
  // Each batch runs in parallel, batches run sequentially
  const batchSize = cpuCount;
  const batches = [];

  for (let i = 0; i < TARGETS.length; i += batchSize) {
    batches.push(TARGETS.slice(i, Math.min(i + batchSize, TARGETS.length)));
  }

  // Run batches sequentially
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    const batchStartIndex = batchIndex * batchSize;

    console.log(chalk.bold.cyan(`\n--- Starting batch ${batchIndex + 1}/${batches.length} (targets ${batchStartIndex + 1}-${batchStartIndex + batch.length}) ---\n`));

    // Run all targets in this batch in parallel
    const promises = batch.map((target, i) => {
      const targetIndex = batchStartIndex + i;
      return compileTarget(target, targetIndex);
    });

    try {
      await Promise.all(promises);
      console.log(chalk.bold.cyan(`\n--- Batch ${batchIndex + 1}/${batches.length} complete ---`));
    } catch (e) {
      throw e;
    }
  }

  console.log('\nJavaScript compilation complete');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function compileTarget(target, index) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const targetName = `${target.locale}${target.uiType ? '-' + target.uiType : ''}${target.userAgent ? '-' + target.userAgent : ''}${target.debug ? '-debug' : ''}`;

    const outputFile = `js/_temp${index}.outputcompiled-${target.locale}` +
      `${target.userAgent ? '-' + target.userAgent : ''}` +
      `${target.uiType ? '-' + target.uiType : ''}` +
      `${target.debug ? '-debug' : ''}.js`;

    // Generate source maps for: dev builds, compile-only mode, OR debug targets
    const sourceMapFile = (DEV_BUILD || DEV_COMPILATION || target.debug)
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

    console.log(`[${index + 1}/${TARGETS.length}] Started compilation ${targetName}...`);

    // First get list of files from closurebuilder
    let fileList;
    try {
      fileList = execSync(`python ${builderArgs.join(' ')}`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    } catch (e) {
      reject(new Error(`Failed to run closurebuilder: ${e.message}`));
      return;
    }

    const jsFiles = fileList.trim().split('\n').filter(f => f);

    // Calculate input size
    let inputSize = 0;
    jsFiles.forEach(file => {
      try {
        const stat = fs.statSync(file);
        inputSize += stat.size;
      } catch (e) {
        // Ignore files that don't exist
      }
    });

    // Add all JS files to compiler args
    const fullArgs = [
      ...args.slice(0, 2), // -jar compiler.jar
      ...jsFiles.map(f => ['--js', f]).flat(),
      ...args.slice(2)
    ];

    // Show the exact command being run (omitting --js file arguments for brevity)
    const jsFileCount = jsFiles.length;
    const argsWithoutJsFiles = [
      ...args.slice(0, 2), // -jar compiler.jar
      `[... ${jsFileCount} --js file arguments omitted ...]`,
      ...args.slice(2)
    ];
    const commandLine = `java ${argsWithoutJsFiles.map(arg => arg.includes(' ') ? `"${arg}"` : arg).join(' ')}`;
    console.log(chalk.dim(`    Command: ${commandLine}`));

    const child = spawn('java', fullArgs, {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let stderr = '';

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);

      if (code !== 0) {
        console.error(chalk.red(`[${index + 1}/${TARGETS.length}] ✗ ${targetName} - FAILED after ${duration}s`));
        console.error(stderr);
        reject(new Error(`Compilation failed with code ${code}`));
      } else {
        // Get output file size
        let outputSize = 0;
        try {
          const stat = fs.statSync(outputFile);
          outputSize = stat.size;
        } catch (e) {
          // File might not exist
        }

        const compressionRatio = inputSize > 0 ? ((1 - outputSize / inputSize) * 100).toFixed(1) : 0;

        console.log(
          chalk.green(`[${index + 1}/${TARGETS.length}] ✓ ${targetName}`) +
          ` - ${chalk.yellow(formatBytes(inputSize))} → ${chalk.cyan(formatBytes(outputSize))} ` +
          chalk.magenta(`(${compressionRatio}% reduction)`) +
          ` in ${chalk.gray(duration + 's')}`
        );

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
 * Rename JS files and add source map references
 */
function renameJsFiles(cssKeysToTargetIndexes) {
  console.log('\n=== Renaming JS files ===');

  const jsDir = 'build/static/js';
  const files = fs.readdirSync(jsDir).filter(f => f.startsWith('_temp') && f.endsWith('.js'));

  files.forEach(file => {
    const filePath = path.join(jsDir, file);

    // Extract index from filename: _temp0.outputcompiled-en-debug.js -> 0
    const fileIndexMatch = /^_temp(\d+)\./.exec(file);
    if (!fileIndexMatch) {
      console.warn(`Could not extract index from ${file}`);
      return;
    }

    const fileIndex = parseInt(fileIndexMatch[1]);

    // Remove _temp{index}. prefix
    const newFileName = file.replace(/^_temp\d+\./, '');
    const newFilePath = path.join(jsDir, newFileName);

    // Add to target's jsFileNames
    if (!TARGETS[fileIndex].jsFileNames) {
      TARGETS[fileIndex].jsFileNames = [];
    }
    TARGETS[fileIndex].jsFileNames.push(newFileName);

    // Read file content
    let content = fs.readFileSync(filePath, 'utf-8');

    // Add source map reference if dev build or debug target
    if (DEV_BUILD || DEV_COMPILATION || TARGETS[fileIndex].debug) {
      const sourceMapName = `outputcompiled-${TARGETS[fileIndex].locale}.js.${fileIndex}.map`;
      content += `\n//# sourceMappingURL=${sourceMapName}`;
    }

    // Write with new name
    fs.writeFileSync(newFilePath, content);

    // Delete old file
    fs.unlinkSync(filePath);

    console.log(chalk.gray(`  Renamed: ${file} -> ${newFileName}`));

    // Update corresponding source map file if it exists
    if (DEV_BUILD || DEV_COMPILATION || TARGETS[fileIndex].debug) {
      const sourceMapPath = path.join(jsDir, `outputcompiled-${TARGETS[fileIndex].locale}.js.${fileIndex}.map`);
      if (fs.existsSync(sourceMapPath)) {
        try {
          const sourceMap = JSON.parse(fs.readFileSync(sourceMapPath, 'utf-8'));
          // Update the "file" field to reference the new filename
          sourceMap.file = `js/${newFileName}`;
          fs.writeFileSync(sourceMapPath, JSON.stringify(sourceMap));
          console.log(chalk.gray(`  Updated source map: ${path.basename(sourceMapPath)}`));
        } catch (error) {
          console.error(chalk.red(`  Failed to update source map: ${error.message}`));
        }
      }
    }
  });
}

/**
 * Rename CSS files
 */
function renameCssFiles(cssKeysToTargetIndexes) {
  console.log('\n=== Renaming CSS files ===');

  const cssDir = 'build/static/css';
  const files = fs.readdirSync(cssDir).filter(f => f.startsWith('_temp') && f.endsWith('.css'));

  files.forEach(file => {
    const filePath = path.join(cssDir, file);

    // Extract key from filename: _temp.MOBILE.outputcompiled-MOBILE.css -> "MOBILE"
    // or _temp..outputcompiled.css -> ""
    const fileNameParts = file.split('.');
    const fileKey = fileNameParts[1]; // _temp, {key}, outputcompiled...

    // Remove _temp.{key}. prefix
    const newFileName = fileNameParts.slice(2).join('.');
    const newFilePath = path.join(cssDir, newFileName);

    // Add to all targets that have this key
    TARGETS.forEach((target, targetIndex) => {
      if (!target.cssFileNames) {
        target.cssFileNames = [];
      }
      if (!target.loginCssFileNames) {
        target.loginCssFileNames = [];
      }

      if (cssKeysToTargetIndexes[fileKey] &&
          cssKeysToTargetIndexes[fileKey].indexOf(targetIndex) > -1) {
        if (/login/.test(file)) {
          target.loginCssFileNames.push(newFileName);
        } else {
          target.cssFileNames.push(newFileName);
        }
      }
    });

    // Rename file
    fs.renameSync(filePath, newFilePath);

    console.log(chalk.gray(`  Renamed: ${file} -> ${newFileName}`));
  });
}

/**
 * Calculate MD5 hash of file contents
 */
function calculateFileHash(filePath, length = 16) {
  const content = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(content).digest('hex');
  return hash.substring(0, length);
}

/**
 * File revisioning - add MD5 hashes to filenames for cache busting
 */
function revisionFiles() {
  console.log('\n=== File Revisioning (Cache Busting) ===');

  const staticDir = 'build/static';
  const patterns = ['**/*.css', '**/*.js', '**/*.woff'];
  const filesToRevision = [];

  // Find all files matching patterns
  patterns.forEach(pattern => {
    const ext = pattern.replace('**/*.', '');
    const dirs = ext === 'woff' ? ['build/static/font'] :
                 ext === 'css' ? ['build/static/css'] :
                 ['build/static/js'];

    dirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => f.endsWith(`.${ext}`));
        files.forEach(file => {
          filesToRevision.push(path.join(dir, file));
        });
      }
    });
  });

  const revisionMap = {}; // old filename -> new filename

  // Calculate hashes and rename files
  filesToRevision.forEach(filePath => {
    const hash = calculateFileHash(filePath);
    const dir = path.dirname(filePath);
    const filename = path.basename(filePath);
    const ext = path.extname(filename);
    const nameWithoutExt = filename.replace(ext, '');

    // New filename with hash before extension
    const newFilename = `${nameWithoutExt}.${hash}${ext}`;
    const newFilePath = path.join(dir, newFilename);

    // Rename the file
    fs.renameSync(filePath, newFilePath);

    // Store mapping
    const relativeOld = path.relative('build/static', filePath);
    const relativeNew = path.relative('build/static', newFilePath);
    revisionMap[relativeOld] = relativeNew;

    console.log(chalk.gray(`  Hashed: ${relativeOld} -> ${relativeNew}`));

    // Update corresponding source map for JS files
    if (ext === '.js') {
      // Find the source map file - it should be in the same directory
      // Format: outputcompiled-{locale}.js.{index}.map
      const mapFiles = fs.readdirSync(dir).filter(f =>
        f.endsWith('.map') && f.startsWith('outputcompiled-')
      );

      // Try to find which source map corresponds to this file
      // We need to check each map file to see if its "file" field matches
      mapFiles.forEach(mapFile => {
        const mapPath = path.join(dir, mapFile);
        try {
          const sourceMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
          // Check if this source map references our old filename
          if (sourceMap.file === `js/${filename}`) {
            // Update to reference the new hashed filename
            sourceMap.file = `js/${newFilename}`;
            fs.writeFileSync(mapPath, JSON.stringify(sourceMap));
            console.log(chalk.gray(`    Updated source map: ${mapFile}`));
          }
        } catch (error) {
          // Ignore errors reading/parsing source maps
        }
      });
    }
  });

  // Update target references to use hashed filenames
  TARGETS.forEach(target => {
    if (target.jsFileNames) {
      target.jsFileNames = target.jsFileNames.map(filename => {
        const key = `js/${filename}`;
        return revisionMap[key] ? path.basename(revisionMap[key]) : filename;
      });
    }
    if (target.cssFileNames) {
      target.cssFileNames = target.cssFileNames.map(filename => {
        const key = `css/${filename}`;
        return revisionMap[key] ? path.basename(revisionMap[key]) : filename;
      });
    }
    if (target.loginCssFileNames) {
      target.loginCssFileNames = target.loginCssFileNames.map(filename => {
        const key = `css/${filename}`;
        return revisionMap[key] ? path.basename(revisionMap[key]) : filename;
      });
    }
  });

  console.log(`Revisioned ${filesToRevision.length} files`);
  return revisionMap;
}

/**
 * Try to load optional npm package
 */
function tryRequire(moduleName) {
  try {
    return require(moduleName);
  } catch (e) {
    return null;
  }
}

/**
 * Create compressed archives (Zopfli + Brotli) for individual JS/CSS files for web server
 */
async function createArchives() {
  console.log('\n=== Creating Compressed Archives ===');

  // Try to load Zopfli npm package
  const zopfli = tryRequire('@gfx/zopfli');

  if (!zopfli) {
    console.log(chalk.yellow('Warning: @gfx/zopfli not found. Install with: npm install @gfx/zopfli'));
    console.log(chalk.gray('Falling back to Node.js built-in gzip compression.'));
  }

  const filesToCompress = [];
  const dirs = ['build/static/js', 'build/static/css'];

  // Find all JS and CSS files
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (file.endsWith('.js') || file.endsWith('.css')) {
          filesToCompress.push(path.join(dir, file));
        }
      });
    }
  });

  let zopfliCount = 0;
  let brotliCount = 0;
  let gzipCount = 0;

  // Compress each file with available tools
  for (const filePath of filesToCompress) {
    const originalContent = fs.readFileSync(filePath);
    const originalSize = originalContent.length;
    const fileName = path.basename(filePath);

    console.log(chalk.bold(`\n  ${fileName}`) + chalk.gray(` (${formatBytes(originalSize)})`));

    // Zopfli compression (creates .gz files with better compression than gzip)
    if (zopfli) {
      try {
        const gzipPath = `${filePath}.gz`;

        // Zopfli with numiterations=15 (good balance of speed/compression)
        const compressed = await new Promise((resolve, reject) => {
          zopfli.gzip(originalContent, { numiterations: 15 }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });

        fs.writeFileSync(gzipPath, compressed);
        const compressedSize = compressed.length;
        const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);

        console.log(
          chalk.gray('    Zopfli (.gz): ') +
          chalk.cyan(`${formatBytes(compressedSize)}`) +
          chalk.magenta(` (${ratio}% reduction)`)
        );
        zopfliCount++;
      } catch (error) {
        console.error(chalk.red(`    Zopfli failed: ${error.message}`));
      }
    } else {
      // Fallback to Node.js built-in gzip
      try {
        const gzipPath = `${filePath}.gz`;

        // Use maximum compression level (9)
        const compressed = await new Promise((resolve, reject) => {
          zlib.gzip(originalContent, { level: 9 }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });

        fs.writeFileSync(gzipPath, compressed);
        const compressedSize = compressed.length;
        const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);

        console.log(
          chalk.gray('    Gzip (.gz): ') +
          chalk.cyan(`${formatBytes(compressedSize)}`) +
          chalk.magenta(` (${ratio}% reduction)`)
        );
        gzipCount++;
      } catch (error) {
        console.error(chalk.red(`    Gzip failed: ${error.message}`));
      }
    }

    // Brotli compression (creates .br files, better compression than gzip)
    // Built into Node.js since v11.7.0
    try {
      const brotliPath = `${filePath}.br`;

      // Brotli quality 11 = maximum compression
      const compressed = await brotliCompress(originalContent, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: originalSize
        }
      });

      fs.writeFileSync(brotliPath, compressed);
      const compressedSize = compressed.length;
      const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);

      console.log(
        chalk.gray('    Brotli (.br): ') +
        chalk.cyan(`${formatBytes(compressedSize)}`) +
        chalk.magenta(` (${ratio}% reduction)`)
      );
      brotliCount++;
    } catch (error) {
      console.error(chalk.red(`    Brotli failed: ${error.message}`));
    }
  }

  console.log(chalk.green('\n✓ Compression complete:'));
  if (zopfliCount > 0) console.log(chalk.green(`  - ${zopfliCount} Zopfli (.gz) files`));
  if (gzipCount > 0) console.log(chalk.green(`  - ${gzipCount} Gzip (.gz) files`));
  if (brotliCount > 0) console.log(chalk.green(`  - ${brotliCount} Brotli (.br) files`));
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

    // Copy source maps (for dev builds, compile-only, or any debug targets)
    const hasDebugTargets = TARGETS.some(t => t.debug);
    if (DEV_BUILD || DEV_COMPILATION || hasDebugTargets) {
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

    // Rename files and update targets
    renameJsFiles(cssKeysToTargetIndexes);
    renameCssFiles(cssKeysToTargetIndexes);

    // File revisioning (cache busting) - only for production builds
    if (!DEV_BUILD && !DEV_COMPILATION) {
      revisionFiles();
    }

    // Export targets (must happen after file revisioning to include hashed names)
    exportTargets();

    // Override config directives
    overrideConfigDirectives();

    // Clean temp files
    console.log('\n=== Cleaning temp files ===');
    cleanDirectory('js/*compiled*');
    cleanDirectory('css/*compiled*');
    cleanDirectory('css/login.css');

    // Create gzipped versions of files if requested
    if (PACK_BUILD) {
      createArchives();
    }

    console.log('\n=== Build Complete! ===');
    if (PACK_BUILD) {
      console.log('Output directory: build/ (with .gz and .br compressed versions)');
    } else {
      console.log('Output directory: build/');
    }

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
