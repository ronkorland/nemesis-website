module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		copy : {
			build : {
				files : [ {
					expand : true,
					src : [ 'lib/**' ],
					dest : 'build/'
				}, {
					expand : true,
					src : [ 'img/**' ],
					dest : 'build/'
				}, {
					expand : true,
					src : [ 'fonts/**' ],
					dest : 'build/'
				} ]
			}
		},
		compress : {
			build : {
				options : {
					archive : 'build/nemesis-<%= pkg.version %>.zip'
				},
				files : [ {
					expand : true,
					cwd : 'build/',
					src : [ '**' ],
					dest : 'nemesis/'
				} ]
			}
		},
		clean : {
			all : {
				src : [ 'build/', 'report/' ]
			},
			build : {
				src : [ 'build/' ]
			},
			report : {
				src : [ 'report/' ]
			}
		},
		uglify : {
			options : {
				mangle : false
			},
			build : {
				files : [ {
					expand : true,
					cwd : 'js/',
					src : [ '*.js', '**/*.js', '!*-dev.js' ],
					dest : 'build/js/',
					ext : '.js',
					flatten : false,
					extDot : 'last'
				}, ],
			}
		},
		cssmin : {
			build : {
				files : [ {
					expand : true,
					cwd : 'css/',
					src : [ '*.css' ],
					dest : 'build/css/',
					ext : '.css',
					extDot : 'last'
				} ]
			}
		},
		htmlmin : {
			build : {
				options : {
					removeComments : true,
					collapseWhitespace : true
				},
				files : [ {
					expand : true,
					cwd : 'template/',
					src : [ '*.html', '**/*.html' ],
					dest : 'build/template/',
					ext : '.html',
					flatten : false,
					extDot : 'last'
				}, {
					expand : true,
					cwd : '',
					src : [ 'index.html' ],
					dest : 'build/',
					ext : '.html',
					flatten : false,
					extDot : 'last'
				} ]
			}
		},
		jshint : {
			build : [ 'Gruntfile.js', 'js/*.js' ],
			options : {
				reporter : require('jshint-junit-reporter'),
				reporterOutput : "report/jshint-junit-output.xml"
			}
		},
		csslint : {
			options : {
				formatters : [ {
					id : 'junit-xml',
					dest : 'report/csslint-junit-output.xml'
				} ]
			},
			build : {
				options : {
					import : 2
				},
				src : [ 'css/*.css' ]
			}
		}
	});

	// Load plugins task.
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Task(s).
	grunt.registerTask('validate', [ 'clean:report', 'jshint', 'csslint' ]);
	grunt.registerTask('default', [ 'clean:build', 'copy', 'cssmin', 'uglify',
			'htmlmin', 'compress' ]);

};