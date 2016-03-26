module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: [
			'dist'
		],

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/*.js'],
				dest: 'dist/jquery.checkall.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/jquery.checkall.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'src/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};