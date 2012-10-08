/**
* 
* JS concatenator.
* 
* Usage:
* 
* var cjs = require('./concat-js');
* cjs.process(['C:/work/js/1.js', 'C:/work/js/2.js'], 'C:/work/js/output.js');
* cjs.processFolder('C:/work/js/', 'C:/work/js/output.js');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs');

    /**
    * Concatenates all the files specified into a single file.
    * @param {Array} inputFiles Array of file paths to concatenate.
    * @param {String} outputFilePath Path to save a result.
    */
    exports.process = function(inputFiles, outputFilePath) {

        if (!inputFiles || !Array.isArray(inputFiles)) {
            throw new Error('Input files not specified.');
        }

        if (!outputFilePath || typeof outputFilePath !== 'string') {
            throw new Error('Output file not specified.');
        }

        var outputFileContents = '';

        for (var i = 0, l = inputFiles.length; i < l; i++) {
            var fileContents = fs.readFileSync(inputFiles[i], 'utf8').toString();
            outputFileContents += fileContents;
        }

        fs.writeFileSync(outputFilePath, outputFileContents, 'utf8');

    };

    /**
    * Concatenates all the files in the folder specified and inner folders into a single file.
    * @param {String} inputPath Folder to look files at.
    * @param {String} outputFilePath Path to save a result.
    */
    exports.processFolder = function(inputPath, outputFilePath) {
        
        if (!inputPath || typeof inputPath !== 'string') {
            throw new Error('Input path not specified');
        }
        
        if (!outputFilePath || typeof outputFilePath !== 'string') {
            throw new Error('Output file not specified.');
        }
        
        var outputFileContents = '';

        var processFolder = function(path) {
            var files = fs.readdirSync(path);
            for (var i = 0, l = files.length; i < l; i++) {
                var filePath = path + files[i],
                    fileInfo = fs.statSync(filePath);

                if (fileInfo.isFile() && filePath.indexOf('.js') > -1) {
                    var fileContents = fs.readFileSync(filePath, 'utf8').toString();
                    outputFileContents += fileContents;
                } else if (fileInfo.isDirectory()) {
                    processFolder(filePath + '/');
                }
            }
        };

        processFolder(inputPath);

        fs.writeFileSync(outputFilePath, outputFileContents, 'utf8');

    };
    
}());