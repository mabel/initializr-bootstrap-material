var gulp    = require('gulp');
var jade    = require('gulp-jade');
var stylus  = require('gulp-stylus');
var coffee  = require('gulp-coffee');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var replace = require('gulp-replace');
var gutil   = require('gutil');

gulp.task('jade', function() {
    var cwd = process.cwd()
    var arr = /(.+\/)([a-z\-]+)(\/)([a-z\-]+)$/.exec(cwd)
    var YOUR_LOCALS = {
        sectionId: arr[2],
        template: arr[4]
    }
    gulp.src(['main.jade', 'main.coffee'])
        .pipe(concat('main.tmp', {newLine: ''}))
        .pipe(jade({locals: YOUR_LOCALS}))
        .pipe(gulp.dest('..'))
})

gulp.task('module', function() {
    gulp.src('../../../js/templates/src/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('../../../js/templates'))
})

gulp.task('model', function() {
    gulp.src('model.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('..'))
})

gulp.task('stylus', function() {
    gulp.src('main.styl')
        .pipe(stylus())
        .pipe(gulp.dest('..'))
})

gulp.task('default', ['jade', 'model', 'stylus'])
