/*
 * grunt-aliyun-oss
 * https://github.com/pocketdigi/grunt-aliyun-oss
 *
 * Copyright (c) 2016 pocketdigi
 * Licensed under the MIT license.
 */

'use strict';

var ALY = require('aliyun-sdk');
var fs = require('fs');
var path = require('path');
var ContentType= require('./content_type');

module.exports = function (grunt) {
    var doneCount=0;
    var fileCount=0;
    var cacheControl;
    var bucketName;
    grunt.registerMultiTask('aliyun_oss', 'aliyun oss plugin for grunt', function () {
        var done = this.async();
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        var accessKeyId = options.accessKeyId;
        var secretAccessKey = options.secretAccessKey;
        var endpoint = options.endpoint;
        bucketName = options.bucketName;
        cacheControl=options.cacheControl;

        if (accessKeyId == null) {
            grunt.log.error('accessKeyId must not be null.');
            return;
        }
        if (secretAccessKey == null) {
            grunt.log.error('secretAccessKey must not be null.');
            return;
        }
        if (endpoint == null) {
            grunt.log.error('endpoint must not be null.');
            return;
        }
        if (bucketName == null) {
            grunt.log.error('bucketName must not be null.');
            return;
        }
        if (cacheControl == null) {
            cacheControl='no-cache';
        }


        var oss = new ALY.OSS({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            endpoint: endpoint,
            apiVersion: '2013-10-15'
        });

        // Iterate over all specified file groups.


        fileCount=this.files.length;
        if(fileCount==0) {
            grunt.log.ok("no file uploaded");
            return;
        }

        this.files.forEach(function (f) {
            // Concat specified files.
            if(f.src.length==1) {
                var filepath=f.src[0];
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                } else {
                    if(grunt.file.isFile(filepath)) {
                        var absolutePath = path.resolve(filepath);
                        uploadFile(absolutePath,f.dest,oss,done);
                    }

                }
            }
        });
    });

    /**
     * 上传文件
     * @param src 本地文件路径
     * @param dst oss文件路径
     * @param oss OSS
     * @param done 异步通知
     */
    var uploadFile=function(src, dst,oss,done) {
        fs.readFile(src, function (err, data) {
            if (err) {
                grunt.log.error('error:', err);
                return;
            }
            var extName=path.extname(src);
            var contentType=ContentType.getType(extName);
            oss.putObject({
                Bucket: bucketName,
                Key: dst,
                Body: data,
                AccessControlAllowOrigin: '',
                ContentType: contentType,
                CacheControl: cacheControl,
                ContentDisposition: '',
                ContentEncoding: 'utf-8',
                ServerSideEncryption: 'AES256',
                Expires: null
            }, function (err, data) {
                if (err) {
                    grunt.log.error(dst,"upload failed",err);
                    done(false);
                    return false;
                }
                grunt.log.ok(src,"uploaded");
                doneCount++;
                if(fileCount==doneCount){
                    done(true);
                    grunt.log.ok(fileCount,"files uploaded.");
                }
                return true;
            });
        })
    }
};
