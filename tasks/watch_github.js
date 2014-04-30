/*
 * grunt-watch-github
 * https://github.com/fantasywind/TestProj
 *
 * Copyright (c) 2014 Chia Yu Pai
 * Licensed under the MIT license.
 */

'use strict';

var http = require('http');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('watch_github', 'Watch github push hooker', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      bind_address: '127.0.0.1',
      bind_port: 9090
    });

    var bind_address = options.bind_address;
    var bind_port = options.bind_port;

    if (bind_address === '127.0.0.1') {
      throw new Error('Invalid server ip');
    }

    var done = this.async();

    grunt.config.set('rebuild', false);

    var server = http.createServer(function (req, res) {
      // check format
      if (req.headers['content-type'] !== 'application/json') {
        throw new Error('Invalid hook data passed');
      }

      var body = ''
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        var info = JSON.parse(body);

        // chaek repository
        if (info.ref !== 'refs/heads/master') {
          grunt.log.warn('pushed un-master commit.');
        } else {
          grunt.log.ok('github fetch new update, rebuild now...');
          grunt.config.set('rebuild', true);
          server.close();
          done();
        }
      });

      // send ok
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify({
        status: true
      }));
    });
    server.listen(bind_port);
    grunt.log.ok('Hook listener on port', bind_port);
    server.on('close', function (){
      grunt.log.ok('GitHub watch server down.');
    });
  });

};
