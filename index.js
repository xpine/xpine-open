#!/usr/bin/env node
var argv = require('yargs').argv;
var path = require('path');
var fs = require('fs');
var shell = require("shelljs");
var fileName = argv._[0];
let config = require('./config');
var local = process.cwd();
var filePath = local;
if (fileName) { 
    filePath = local + '/' + fileName;
}
const use = argv.use || config.use;
const app = config.app;
const appPath = argv.app || app[use];
const cmd = `open -a ${appPath} ${filePath}`;
shell.exec(cmd);
if (use !== config.use) { 
    config.use = use;
    config.app[use] = appPath;
    fs.writeFile(__dirname+'/config.json',JSON.stringify(config,null,4));
}