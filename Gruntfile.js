module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		meta: {
			banner: "/** File generated -- do not modify\n" +
			" *  <%= (pkg.title || pkg.name).toUpperCase() %>\n" +
			" *\n" +
			" *  @version <%= pkg.version %>\n" +
			" *  @website <%= pkg.homepage %>\n" +
			" *  @author <%= pkg.author.name %>\n" +
			" *  @license <%= pkg.license %>\n" +
			" */\n"
		},

		clean: [
			'dist'
		],

		concat: {
			options: {
				separator: ';',
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ['src/*.js'],
				dest: 'dist/jquery.checkall.js'
			}
		},

		uglify: {
			options: {
				banner: "<%= meta.banner %>"
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
		},

		qunit: {
			all: ['tests/qunit.html']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('test', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);

};