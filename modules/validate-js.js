/**
* 
* JS validator 0.1.
* 
* Usage:
* 
* var vjs = require('./validate-js');
* vjs.validate(['C:/work/js/1.js', 'C:/work/js/2.js']);
* vjs.validateFolder('C:/work/js/');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs'),
        jshint = require('../lib/jshint');
    
    /**
    * Validates files specified in the array.
    * @param {String} inputFiles Array of file paths.
    */
    exports.validate = function(inputFiles) {

        if (!inputFiles || !Array.isArray(inputFiles)) {
            throw new Error('Input files not specified.');
        }

        for (var i = 0, l = inputFiles.length; i < l; i++) {
            var filePath = inputFiles[i],
                result = jshint.JSHINT(fs.readFileSync(filePath, 'utf8'), {});
            if (result === true) {
                console.log(filePath + ': passed');
            } else {
                console.warn(filePath + ': failed');
                console.log(jshint.JSHINT.errors);
            }
        }

    };

    /**
    * Validates all javascript files in the folder specified and inner folders.
    * @param {String} inputPath Folder to look at.
    */
    exports.validateFolder = function(inputPath) {

        if (!inputPath || typeof inputPath !== 'string') {
            throw new Error('Input path not specified');
        }

        var processFolder = function(path) {
            var files = fs.readdirSync(path);
            for (var i = 0, l = files.length; i < l; i++) {
                var filePath = path + files[i],
                    fileInfo = fs.statSync(filePath);

                if (fileInfo.isFile() && filePath.indexOf('.js') > -1) {
                    var result = jshint.JSHINT(fs.readFileSync(filePath, 'utf8'), {});
                    if (result === true) {
                        console.log(filePath + ': passed');
                    } else {
                        console.warn(filePath + ': failed');
                        console.log(jshint.JSHINT.errors);
                    }
                } else if (fileInfo.isDirectory()) {
                    processFolder(filePath + '/');
                }
            }
        };

        processFolder(inputPath);

    };

}());