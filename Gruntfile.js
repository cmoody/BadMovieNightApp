module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    connect: {
      options: {
        port: process.env.PORT || 8000,
        hostname: '0.0.0.0',
        base: 'build'
      },
      server: {
        options: {
          keepalive: true
        }
      },
      dev: {
        options: {
          keepalive: false
        }
      }
    },

    less: {
      development: {
        files: {
          "./build/css/app.css": "./src/css/app.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "./build/css/app.css": "./src/css/app.less"
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          almond: true,
          keepBuildDir: true,
          baseUrl: "./src/js",
          include: ['main.js'],
          mainConfigFile: "./src/js/main.js",
          name: "vendor/almond/almond",
          out: "build/js/app.js",
          wrap: true
        }
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: './src',
            src: [
              'assets/**/*',
              'js/**/**/*',
              '!css/**/*'
            ],
            dest: './build'
          }
        ]
      },
      img: {
        files: [
          {
            expand: true,
            cwd: './src',
            src: [
              'assets/**/*',
            ],
            dest: './build'
          }
        ],
      },
      build: {
        files: [
          {
            expand: true,
            cwd: './build',
            src: [
              '**/**/*'
            ],
            dest: './Cordova/www'
          }
        ]
      }
    },

    preprocess : {
      prod : {
        src : 'src/index.html',
        dest : 'build/index.html',
        options: {
          context : {
            PROD: true
          }
        }
      },
      dev : {
        src : 'src/index.html',
        dest : 'build/index.html',
        options: {
          context : {
            DEV: true
          }
        }
      }
    },

    clean: {
      build: ['./build'],
      cordova: ['./Cordova/www']
    },

    watch: {
      scripts: {
        files: ['./src/js/**/*'],
        tasks: ['copy:main'],
        options: {
          livereload: true
        },
      },
      html: {
        files: ['./src/index.html'],
        tasks: ['preprocess:dev'],
        options: {
          livereload: true
        },
      },
      css: {
        files: ['./src/css/**/**/*'],
        tasks: ['less:development'],
        options: {
          livereload: true
        },
      },
      assets: {
        files: ['./src/assets/**/*'],
        tasks: ['copy:img'],
        options: {
          livereload: true
        }
      }
    },

    // Expand to pass in : param
    shell: {
        cordova: {
          command: 'cd Cordova && cordova build ios'
        },
        ipa: {
          command: ''
        }
    }

  });

  // Run Development
  grunt.registerTask('dev', [
    'clean:build',
    'less:development',
    'copy:main',
    'preprocess:dev',
    'connect:dev',
    'watch'
  ]);

  // Run for Production
  grunt.registerTask('prod', [
    'clean',
    'less:production',
    'requirejs',
    'preprocess:prod',
    'copy:img',
    'copy:build'
  ]);

  // Run prod task, build ipa, send to testflight
  grunt.registerTask('distribute', [
    'prod',
    'shell:cordova',
    //'shell:ipa' // Run Xcode build command to generate ipa
    //'testflight'
  ]);

  grunt.registerTask('debug', [
    'clean',
    'less:development',
    'copy:main',
    'preprocess:dev',
    'copy:build',
    'shell:cordova'
  ]);

};
