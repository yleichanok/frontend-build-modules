/**
* 
* HTML cleaner.
* 
* Usage:
* 
* var chtml = require('./cleanup-html');
* chtml.cleanup('C:/work/html/1.html');
* chtml.cleanup(['C:/work/html/1.html', 'C:/work/html/2.html']);
* chtml.cleanupFolder('C:/work/html/', '.html');
*
*/
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, node:true, indent:4, maxerr:50, globalstrict:true, white:false */
(function() {
    
    'use strict';
    
    var fs = require('fs'),

        cleanup = function(filePath) {
            var fileContents = fs.readFileSync(filePath, 'utf8');

            // remove tabs
            fileContents = fileContents.replace(/\t/g, '');

            // remove duplicated new lines
            fileContents = fileContents.replace(/\n\n/g, '');

            fs.writeFileSync(filePath, fileContents, 'utf8');
        };
    
    /**
    * Removes unnecessary tabs and new lines from the files specified.
    * @param {String|Array} files File path or an array of file paths.
    */
    exports.cleanup = function(files) {

        if (!files || (typeof files !== 'string' && !Array.isArray(files))) {
            throw new Error('Input files not specified.');
        }

        if (typeof files === 'string') {
            files = [files];
        }

        for (var i = 0, l = files.length; i < l; i++) {
            cleanup(files[i])
        }

    };

    /**
    * Removes unnecessary tabs and new lines from all html files in the folder specified.
    * @param {String} path Folder to look at.
    * @param {String} requiredExtension File extension (optional, .html by default).
    */
    exports.cleanupFolder = function(path, requiredExtension) {

        if (!path || typeof path !== 'string') {
            throw new Error('Input path not specified');
        }

        if (!requiredExtension || typeof requiredExtension !== 'string') {
            requiredExtension = '.html';
        }

        var processFolder = function(path) {
            var files = fs.readdirSync(path);
            for (var i = 0, l = files.length; i < l; i++) {
                var filePath = path + files[i],
                    fileInfo = fs.statSync(filePath);

                if (fileInfo.isFile() && filePath.indexOf(requiredExtension) > -1) {
                    cleanup(filePath);
                } else if (fileInfo.isDirectory()) {
                    processFolder(filePath + '/');
                }
            }
        };

        processFolder(path);

    };

}());