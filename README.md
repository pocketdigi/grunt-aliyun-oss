# grunt-aliyun-oss

> aliyun oss plugin for grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-aliyun-oss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-aliyun-oss');
```

## The "aliyun_oss" task

### Overview
In your project's Gruntfile, add a section named `aliyun_oss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  aliyun_oss: {
    options: {
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey',
      endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
      bucketName:'bucket'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

[AliYun OSS Api doc](http://doc.oss.aliyuncs.com/)
### Options

#### options.accessKeyId
Type: `String`

AliYun OSS accessKeyId 

#### options.secretAccessKey
Type: `String`

AliYun OSS secretAccessKey  

#### options.endpoint
Type: `String`

AliYun OSS endpoint  

#### options.bucketName
Type: `String`

AliYun OSS bucketName  

### Usage Examples

#### Default Options
In this example, the default options are used to upload all file expect html file in dist directory to oss 'bucket1' bucket,and the oss root path is 'static/'

```js
grunt.initConfig({
   aliyun_oss: {
              default_options: {
                  options: {
                      accessKeyId: 'xxxx',
                      secretAccessKey: 'xxxx',
                      endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
                      bucketName:'bucket1'
                  },
                  files: [
                      {
                          expand: true,
                          cwd: 'dist',
                          src: ['**/*','!**/*.html'],
                          dest:'static/'
                      }
                  ]
              }
          }
});
```



## Release History
v0.1.0 first version
