# grunt-watch-github

> Watch github push hooker

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-watch-github --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-watch-github');
```

## The "watch_github" task

### Before use
You should go to GitHub site and set hook service first.
You can find setting on following url:
> http://github.com/{your account}/{your project}/settings/hooks/

Create a new webhook and use json version payload. Remember the url port if your hooker listening port is not on 80.

### Overview
In your project's Gruntfile, add a section named `watch_github` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  watch_github: {
    repository: {
      bind_address: 'your_server_ip',
      bind_port: 'your_server_hooker_listen_port'
    },
  },
});
```

### Options

#### options.bind_address
Type: `String`

A string value that is your server external ip.

#### options.bind_port
Type: `Number`
Default value: `9090`

A number value that is hook server port.

### Example

If use the yeoman generator, you can just work with __build__ task loop like this:

```js
grunt.registerTask('continuousBuild', [
  'build',
  'watch_gitub',
  'continuousBuild'
]);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

v0.1.0 first version for simple hooker.