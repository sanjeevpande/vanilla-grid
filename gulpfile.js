var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');

//js paths
var jsFiles = 'src/js/**/*.js',
    jsDest = 'dist/js';

gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

//css paths
var cssFiles = 'src/css/**/*.css',
    cssDest = 'dist/css';
gulp.task('css', function() {
    return gulp.src(cssFiles)
        .pipe(concat('main.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest(cssDest));
});

gulp.task('default', ['js', 'css']);