#!/usr/bin/env node
/* eslint-disable no-undef */

const childProcess = require('child_process');
const { promises: fs } = require('fs');
const path = require('path');
const yargs = require('yargs');
const jscodeshiftPackage = require('jscodeshift/package.json');

const jscodeshiftDirectory = path.dirname(require.resolve('jscodeshift'));
const jscodeshiftExecutable = path.join(jscodeshiftDirectory, jscodeshiftPackage.bin.jscodeshift);

async function runJscodeshiftTransform(transform, files, flags, codemodFlags) {
  const transformPath = transformPath.resolve(__dirname, '..', './transforms', `${transform}.js`);

  let transformerPath;
  let error;
  try {
    await fs.stat(item);
    error = undefined;
    transformerPath = item;
  } catch (srcPathError) {
    error = srcPathError;
  }

  if (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(
        `Transform '${transform}' not found. Check out ${transformPath.resolve(
          __dirname,
          './README.md for a list of available codemods.'
        )}`
      );
    }
    throw error;
  }

  const args = [
    // can't directly spawn `jscodeshiftExecutable` due to https://github.com/facebook/jscodeshift/issues/424
    jscodeshiftExecutable,
    '--transform',
    transformerPath,
    ...codemodFlags,
    '--extensions',
    'js,ts,jsx,tsx,json',
    '--parser',
    'tsx',
    '--ignore-pattern',
    '**/node_modules/**',
  ];

  if (flags.dry) {
    args.push('--dry');
  }
  if (flags.print) {
    args.push('--print');
  }
  if (flags.jscodeshift) {
    args.push(flags.jscodeshift);
  }

  args.push(...files);

  console.log(`Executing command: jscodeshift ${args.join(' ')}`);
  const jscodeshiftProcess = childProcess.spawnSync('node', args, { stdio: 'inherit' });

  if (jscodeshiftProcess.error) {
    throw jscodeshiftProcess.error;
  }
}

function run(argv) {
  const { codemod, paths, ...flags } = argv;
  const files = paths.map(filePath => path.resolve(filePath));

  runJscodeshiftTransform(codemod, files, flags, argv._);
}

yargs
  .command({
    command: '$0 <codemod> <paths...>',
    describe: 'Applies a `@utilitywarehouse/ds-codemod` to the specified paths',
    builder: command => {
      return command
        .positional('codemod', {
          description: 'The name of the codemod',
          type: 'string',
        })
        .positional('paths', {
          array: true,
          description: 'Paths forwarded to `jscodeshift`',
          type: 'string',
        })
        .option('dry', {
          description: 'dry run (no changes are made to files)',
          default: false,
          type: 'boolean',
        })
        .option('print', {
          description: 'print transformed files to stdout, useful for development',
          default: false,
          type: 'boolean',
        });
    },
    handler: run,
  })
  .scriptName('npx @utilitywarehouse/ds-codemod')
  .example('$0 web-ui/v0/import-paths src')
  .help()
  .parse();