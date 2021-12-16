require('es6-promise').polyfill();
var gulp = require('gulp');

const babel = require('gulp-babel');

gulp.task('es6toes5', function() {
    return gulp.src(['dakara-client-build/**/*.js','!client-temp/**/lib/*','!client-temp/**/build.js','!client-temp/**/home.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dakara-client-build'))
});

gulp.task('es6toes5-tempclient', function() {
    return gulp.src(['client-temp/**/*.js','!client-temp/**/lib/*','!client-temp/**/build.js','!client-temp/**/home.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('client-temp'))
});

var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
    return gulp.src('dakara-client-build/**/*.js')
       .pipe(uglify({
            compress: {
               pure_funcs: ['console.log', 'log.error', 'log.info','log.network']
           },
            comments : 'license',
            lint: true
        }))
        .pipe(gulp.dest('dakara-client-build'));
});