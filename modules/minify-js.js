/**
* 
* JS minificator.
* 
* Usage:
* 
* var mjs = require('./minify-js');
* mjs.minify('C:/work/js/1.js');
* mjs.minify('C:/work/js/input.js', 'C:/work/js/output.js');
* mjs.minifyFolder('C:/work/js/');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs'),
        r = require('../lib/r'),
        uglify = require('../lib/uglify-js'),

        minify = function(filePath) {
            var fileContents = fs.readFileSync(inputFilePath, 'utf8').toString(),
                parsedContents = uglify.parser.parse(fileContents);

            parsedContents = uglify.uglify.ast_mangle(parsedContents);
            parsedContents = uglify.uglify.ast_squeeze(parsedContents);

            fs.writeFileSync(filePath, uglify.uglify.gen_code(parsedContents), 'utf8');
        };
    
    /**
    * Minifies files specified.
    * @param {String|Array} files Source files.
    */
    exports.minify = function(files) {

        if (!files || (typeof files !== 'string' && !Array.isArray(files))) {
            throw new Error('Input files not specified.');
        }

        if (typeof files === 'string') {
            files = [files];
        }

        for (var i = 0, l = files.length; i < l; i++) {
            minify(files[i]);
        }

    };

    /**
    * Minifies javascript files in the folder specified.
    * @param {String} path Source folder.
    */
    exports.minifyFolder = function(path, outputFilePath) {
        
        if (!path || typeof path !== 'string') {
            throw new Error('Input path not specified');
        }

        var processFolder = function(path) {
            var files = fs.readdirSync(path);
            for (var i = 0, l = files.length; i < l; i++) {
                var filePath = path + files[i],
                    fileInfo = fs.statSync(filePath);

                if (fileInfo.isFile() && filePath.indexOf('.js') > -1) {
                    minify(filePath);
                } else if (fileInfo.isDirectory()) {
                    processFolder(filePath + '/');
                }
            }
        };

        processFolder(path);

    };
    
}());