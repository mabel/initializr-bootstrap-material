var gulp    = require('gulp');
var jade    = require('gulp-jade');
var gutil   = require('gutil');

gulp.task('jade', function() {
    var YOUR_LOCALS = {}
    gulp.src('main.jade')
        .pipe(jade({locals: YOUR_LOCALS}))
        .pipe(gulp.dest('..'))
})

gulp.task('default', ['jade'])
