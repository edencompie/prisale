module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			options: {
				sourcemap: 'none'
			},
			app: {
				files: {
					'www/css/app.css': 'www/scss/app.scss'
				}
			},
		},
		cssmin: {
			app: {
				files: [{
					src: [
						'www/css/ionic.app.min.css',
						'www/css/app.css',
					],
					dest: 'www/css/app.min.css'
				}]
			}
		},
		ngtemplates:  {
			app: {
				src: 'www/views/**/*.html',
				dest: 'www/views/views.js',
				htmlmin: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true
				},
				options: {
					module: 'jobhop.views',
				}
			}
		},
		uglify: {
			extensions: {
				files: {
					'www/js/extensions.min.js': [
						'www/lib/lodash/lodash.min.js',
						'www/lib/ionic/js/ionic.bundle.js',
						'www/lib/ngCordova/dist/ng-cordova.min.js',
						'www/lib/ngstorage/ngStorage.min.js',
					]
				}
			},
			app: {
				files: {
					'www/js/app.min.js': [
						'www/js/app.js',
						'www/js/controllers/Controller.js',
                        'www/js/controllers/MainController.js',
                        'www/js/controllers/ChartsController.js',
                        'www/js/controllers/ProductsController.js',
                        'www/js/services/Service.js',
                        'www/js/filters/Filter.js',
                        'www/views/View.js',
                        'www/views/views.js',
					]
				}
			}
		},
        watch: {
			'app-sass': {
				files: 'www/scss/*.scss',
				tasks: ['sass:app', 'cssmin:app']
			},
			'app-css': {
				files: 'www/css/app.css',
				tasks: ['cssmin:app']
			},
			'app-js': {
				files: ['www/js/**/*.js', '!www/js/app.min.js', '!www/js/extensions.min.js'],
				tasks: ['uglify:app']
			},
			'ngtemplates': {
				files: ['www/views/**/*.html'],
				tasks: ['ngtemplates:app', 'uglify:app']
			},
            'gruntfile': {
                files: ['Gruntfile.js'],
                tasks: ['cssmin', 'uglify', 'ngtemplates', 'watch']
            }
		}
        /*,
		inline_angular_templates: {
			views: {
				options: {
					selector: '#views'
				},
				files: {
					'index.html': [
						'views/**\/*.html'
					]
				}
			}
		}*/
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-angular-templates');
    /*
	grunt.loadNpmTasks('grunt-inline-angular-templates');
    */

	grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'ngtemplates', 'watch']);
};
