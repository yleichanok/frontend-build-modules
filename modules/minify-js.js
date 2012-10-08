/**
* 
* JS minificator.
* 
* Usage:
* 
* var mjs = require('./minify-js');
* mjs.minify('C:/work/js/input.js', 'C:/work/js/output.js');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs'),
        r = require('../lib/r'),
        uglify = require('../lib/uglify-js');
    
    /**
    * Minifies the file specified.
    * @param {String} inputFilePath Source file.
    * @param {String} outputFilePath Result file. The same as source by default.
    */
    exports.minify = function(inputFilePath, outputFilePath) {
        
        if (!inputFilePath || typeof inputFilePath !== 'string') {
            throw new Error('Input file not specified');
        }
        
        if (!outputFilePath || typeof outputFilePath !== 'string') {
            outputFilePath = inputFilePath;
        }
        
        var fileContents = fs.readFileSync(inputFilePath, 'utf8').toString(),
            parsedContents = uglify.parser.parse(fileContents);

        parsedContents = uglify.uglify.ast_mangle(parsedContents);
        parsedContents = uglify.uglify.ast_squeeze(parsedContents);

        fs.writeFileSync(outputFilePath, uglify.uglify.gen_code(parsedContents), 'utf8');

    };
    
}());