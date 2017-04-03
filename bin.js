#!/usr/bin/env node

'use strict';

const program = require('commander')
const chalk     = require('chalk')
const fs        = require('fs')
const path      = require('path')

var projectName;

program
  .arguments('<package-name>')
  .usage(chalk.green('<package-name>') + ' [options]')
  .action((name) => {
    projectName = name
  })
  .parse(process.argv)

  if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log('  ' + chalk.cyan(program.name()) + chalk.green('<project-directory>'));
    console.log();
    console.log('Or Run ' + chalk.cyan(program.name() + ' --help') + ' to see all options.');
    process.exit(1);
  }

createTemplatePackage(projectName)

function createTemplatePackage(name) {
  var root = path.resolve(name);
  var appName = path.basename(root);

  makeDirectory(appName)
}

function makeDirectory(appName) {
  if (!fs.existsSync(appName)){
    fs.mkdirSync(appName);
    makeFile(appName)
    console.log("success make file .travis.yml and index.js !")
  } else {
    console.log("Directory already exist");
  }
}

function makeFile(appName) {
  const fileName = appName+'/.travis.yml'
  const language = 'language: node_js'
  const newLine = '\r\n'
  const nodejs = 'node_js:'

  const travisContent = language + newLine + nodejs + newLine + "  - '6'" + newLine + "  - '4'"

  var createStream = fs.createWriteStream(fileName) // create .travis.yml

  fs.writeFile(fileName, travisContent)

  createStream.end()

  fs.writeFile(appName+'/index.js', "'use strict'") // create index.js
}
