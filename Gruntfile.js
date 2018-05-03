module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-pug-usemin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: [
                            "Android 2.3",
                            "Android >= 4",
                            "Chrome >= 20",
                            "Firefox >= 24",
                            "Explorer >= 8",
                            "iOS >= 6",
                            "Opera >= 12",
                            "Safari >= 6"
                        ]
                    })
                ]
            },
            dist: {
                src: 'public/stylesheets/*.css'
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            target: {
              files: [{
                expand: true,
                cwd: 'public/stylesheets',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css',
                ext: '.min.css'
              }]
            }
        },
        pugUsemin: {
            scripts: {
                options: {
                    tasks: {
                        css: ['concat']
                    },
                    prefix: 'public'
                },
                files: [{
                    src:'./views/pages/index.pug',
                    dest:'./views/pages/index.pug',
                }]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'public/images' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        }
    });
    grunt.registerTask('img', ['imagemin']);
    grunt.registerTask('default', ['postcss:dist', 'cssmin', 'pugUsemin']);
};