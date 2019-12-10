// Build static assets
// Author: Stefano Simoncelli

'use strict';

var gulp = require('gulp'),
    del = require('del'),
    process = require('child_process'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

const destination = 'ppnw-website', // Git submodule
      source = 'src',
      assets = source + '/assets';

// Build pages
// https://jekyllrb.com/docs/installation/macos/
// gem install bundler jekyll
gulp.task('pages', function() {
    return process.exec('jekyll build -s ' + source + ' -d ' + destination, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

// CSS
gulp.task('sass', function() {
    return gulp.src([assets + '/css/app.scss'])
        .pipe(
            sass({
                outputStyle: 'compressed',
                includePaths: 'node_modules/bootstrap-sass/assets/stylesheets'
            })
        )
        .pipe(gulp.dest(destination));
});
gulp.task('sass').description = "Compile CSS file";

// // Javascript
gulp.task('uglify', function () {
    // Data leaks
    return gulp.src([
        // 'node_modules/respond/dest/respond.min.js',
        'node_modules/html5shiv/dist/html5shiv.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
        assets + '/js/app.js'
    ])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest(destination + '/js'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destination + '/js'));
});
gulp.task('uglify').description = "Concatenate and uglify JS files";

// Copy and minimise images
gulp.task('images', function () {
    return gulp.src(assets + '/img/*.{png,jpg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest(destination + '/img'));
});
gulp.task('images').description = "Copy and minimise images";

// Copy static files
gulp.task('copy', function () {
    return gulp.src(source + '/attachments/*')
        .pipe(gulp.dest(destination + '/files'));
});
gulp.task('copy').description = "Copy static files";

// Watch task
gulp.task('watch', function() {
    watch([source + '/_layout/*.html', source + '/_includes/*.html', source + '/*.html'], ['build']);
    watch([assets + '/css/*.scss'], ['sass']);
    watch([source + '/attachments/*'], ['copy']);
    watch([assets + '/img/*'], ['images']);
    watch([assets + '/js/*'], ['uglify']);
});

// Clean up destination folder
gulp.task('clean', function () {
    return del(destination);
});

// Build
gulp.task('default', gulp.series('pages', 'sass', 'uglify', 'images', 'copy'));
gulp.task('default').description = "Build the asset";

// Dev
gulp.task('dev', gulp.series('clean', 'default', 'watch'));
gulp.task('dev').description = "Build the assets and watch for file changes";