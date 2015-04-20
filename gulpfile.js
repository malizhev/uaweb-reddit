/// <vs BeforeBuild='default' />
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    browserify = require('browserify'),
    babelify = require("babelify"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    htmlmin = require('gulp-html-minifier'),
    karma = require('gulp-karma'),
    webserver = require('gulp-webserver'),
    shell = require('gulp-shell');

var paths = {
    sources: "./src/",
    app: "./src/app/",
    dist: "./dist/",
    dist_js: "./dist/js/",
    dist_css: "./dist/css/",
    dist_html: "./dist/templates"
};

gulp.task('build:scss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .on('error', function (err) { console.log(err.message); })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'android'))
        .pipe(gulp.dest(paths.dist_css))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.dist_css));
    
});


gulp.task('build:js', function() {

    return browserify(paths.app + "app.jsx", { debug: true })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(paths.dist_js))
        .pipe(rename("app.min.js"))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(paths.dist_js));

});
gulp.task('watch', function() {
    gulp.watch(paths.sources + "**/*.jsx", ['build:js']);
    gulp.watch(paths.sources + "scss/**/*.scss", ['build:scss']);
});


// Default
gulp.task('default', ['build:js', 'build:scss', 'watch']);