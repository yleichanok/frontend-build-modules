/**
* 
* CSS minificator.
* 
* Usage:
* 
* var mcss = require('./minify-css');
* mcss.minify('C:/work/css/1.css');
* mcss.minify(['C:/work/css/1.css', 'C:/work/css/2.css']);
* mcss.minifyFolder('C:/work/css/');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var r = require('../lib/r'),

        minify = function(filePath) {
            var settings = {
                cssIn: filePath,
                out: filePath,
                optimizeCss: 'standard'
            };
            
            r.optimize(settings);
        };
    
    /**
    * Minifies the files specified.
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
    * Minifies CSS files in the folder specified.
    * @param {String} path Source folder.
    */
    exports.minifyFolder = function(path) {

        if (!path || typeof path !== 'string') {
            throw new Error('Input path not specified');
        }

        var processFolder = function(path) {
            var files = fs.readdirSync(path);
            for (var i = 0, l = files.length; i < l; i++) {
                var filePath = path + files[i],
                    fileInfo = fs.statSync(filePath);

                if (fileInfo.isFile() && filePath.indexOf('.css') > -1) {
                    minify(filePath);
                } else if (fileInfo.isDirectory()) {
                    processFolder(filePath + '/');
                }
            }
        };

        processFolder(path);

    };
    
}());