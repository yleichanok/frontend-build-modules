/**
* 
* JS validator.
* 
* Usage:
* 
* var vjs = require('./validate-js');
* vjs.validate('C:/work/js/1.js');
* vjs.validate(['C:/work/js/1.js', 'C:/work/js/2.js']);
* vjs.validateFolder('C:/work/js/');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs'),
        jshint = require('../lib/jshint'),

        validate = function(filePath) {
            var result = jshint.JSHINT(fs.readFileSync(filePath, 'utf8'));
            if (result === true) {
                console.log(filePath + ': passed');
            } else {
                console.warn(filePath + ': failed');
                console.log(jshint.JSHINT.errors);
            }
        };
    
    /**
    * Validates files specified in the array.
    * @param {String|Array} files File path or an array of file paths.
    */
    exports.validate = function(files) {

        if (!files || (typeof files !== 'string' && !Array.isArray(files))) {
            throw new Error('Input files not specified.');
        }

        if (typeof files === 'string') {
            files = [files];
        }

        for (var i = 0, l = files.length; i < l; i++) {
            validate(files[i]);
        }

    };

    /**
    * Validates all javascript files in the folder specified and inner folders.
    * @param {String} path Folder to look at.
    */
    exports.validateFolder = function(path) {

        if (!path || typeof path !== 'string') {
            throw new Error('Input path not specified');
        }

        var processFolder = function(path) {
            var files = fs.readdirSync(path);
            for (var i = 0, l = files.length; i < l; i++) {
                var filePath = path + files[i],
                    fileInfo = fs.statSync(filePath);

                if (fileInfo.isFile() && filePath.indexOf('.js') > -1) {
                    validate(filePath);
                } else if (fileInfo.isDirectory()) {
                    processFolder(filePath + '/');
                }
            }
        };

        processFolder(path);

    };

}());