module.exports = function(grunt) {
	//Configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json') ,
		jshint: {
			options: {
				smarttabs: false,
				curly: true,
				immed: true,
				latedef: true,
				noarg: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: true,
				trailing: true,
				loopfunc: true,
				globals: {
					window: true
				}
			},
			all: ['src/**/*.js']
		},
		qunit: {
			all: ['test/index.html']
		},
		uglify: {
			options: {
				banner: '/*! lazy-fingers <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) | Alexander Prinzhorn - https://github.com/Prinzhorn/lazy-fingers | Free to use under terms of MIT license */\n'
			},

			all: {
				files: {
					'dist/lazy-fingers.min.js': 'src/lazy-fingers.js'
				}
			}
		}
	});

	//Dependencies.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Tasks.
	grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);
	grunt.registerTask('travis', ['jshint', 'qunit']);
};