var gulp = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var paths = {
    scripts: ['./sw-angular-websocket.coffee']
};

gulp.task('coffee', function() {
    gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(coffee().on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('compress', function() {
    gulp.src('./sw-angular-websocket.js')
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename('sw-angular-websocket.min.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['coffee']);
});

gulp.task('default', ['coffee', 'compress']);


