/**
* 
* LESS compilator.
* 
* Usage:
* 
* var cless = require('./compile-less');
* cless.compile('C:/work/css/input.less', 'C:/work/css/output.css');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs'),
        less = require('../lib/less');
    
    /**
    * Compiles LESS file into CSS.
    * @param {String} inputFilePath LESS file (source).
    * @param {String} outputFilePath CSS file (result).
    */
    exports.compile = function(inputFilePath, outputFilePath) {
        
        if (!inputFilePath || typeof inputFilePath !== 'string') {
            throw new Error('Input file not specified');
        }
        
        if (!outputFilePath || typeof outputFilePath !== 'string') {
            outputFilePath = inputFilePath.replace('.less', '.css');
        }
        
        var fileContents = fs.readFileSync(inputFilePath, 'utf8'),
            parser = new(less.less.Parser)();
        
        parser.parse(fileContents, function(error, tree) {
            if (error) {
                console.log(error);
                throw new Error('Compilation failed.');
            } else {
                fs.writeFileSync(outputFilePath, tree.toCSS(), 'utf8');
            }
        });
        
    };
    
}());