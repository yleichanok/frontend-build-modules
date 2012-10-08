/**
* 
* CSS minificator.
* 
* Usage:
* 
* var mcss = require('./minify-css');
* mcss.minify('C:/work/css/input.css', 'C:/work/css/output.css');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var r = require('../lib/r');
    
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
        
        var minifyConfig = {
            cssIn: inputFilePath,
            out: outputFilePath,
            optimizeCss: 'standard'
        };
        
        r.optimize(minifyConfig);
        
    };
    
}());