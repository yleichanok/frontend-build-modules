/**
* 
* LESS compilator.
* 
* Usage:
* 
* var cless = require('./compile-less');
* cless.compile('C:/work/css/1.less');
* cless.compile(['C:/work/css/1.less', 'C:/work/css/2.less']);
* cless.compileFolder('C:/work/css/');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs'),
        less = require('../lib/less'),

        compile = function(filePath) {
            var fileContents = fs.readFileSync(filePath, 'utf8'),
                parser = new(less.less.Parser)(),
                cssFilePath = filePath.replace('.less', '.css');
        
            parser.parse(fileContents, function(error, tree) {
                if (error) {
                    console.warn(error);
                    throw new Error('Compilation failed.');
                } else {
                    fs.writeFileSync(cssFilePath, tree.toCSS(), 'utf8');
                }
            });
        };
    
    /**
    * Compiles LESS files to CSS.
    * @param {String|Array} files File path or an array of file paths.
    */
    exports.compile = function(files) {

        if (!files || (typeof files !== 'string' && !Array.isArray(files))) {
            throw new Error('Input files not specified.');
        }

        if (typeof files === 'string') {
            files = [files];
        }

        for (var i = 0, l = files.length; i < l; i++) {
            compile(files[i]);
        }

    };

    /**
    * Compiles LESS files in the folder and inner folders to CSS.
    * @param {String} path Folder path.
    */
    exports.compileFolder = function(path) {

        if (!path || typeof path !== 'string') {
            throw new Error('Input path not specified');
        }

        var processFolder = function(path) {
            var files = fs.readdirSync(path);
            for (var i = 0, l = files.length; i < l; i++) {
                var filePath = path + files[i],
                    fileInfo = fs.statSync(filePath);

                if (fileInfo.isFile() && filePath.indexOf('.less') > -1) {
                    compile(filePath);
                } else if (fileInfo.isDirectory()) {
                    processFolder(filePath + '/');
                }
            }
        };

        processFolder(path);
    };
    
}());