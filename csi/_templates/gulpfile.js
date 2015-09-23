var gulp   = require('gulp');
var jade   = require('gulp-jade');
var stylus = require('gulp-stylus');
var gutil  = require('gutil');
var argv   = require('yargs').argv
var fs     = require('fs')

//
// Usage: gulp create --template=menu --page=test-menu
//

gulp.task('create', function(){
    var template = argv.template
    var page = argv.page
    gulp.src(template + '/**/*').pipe(gulp.dest('../' + page + '/' + template))
    //if(template == 'menu') return
    //var cwd = process.cwd()
    //var projPath = /(^.+[A-Z_]+\/)([^A-Z]+$)/.exec(cwd)[1] + 'public/'
    //fs.mkdirSync(projPath + 'csi/' + page)
    //fs.mkdirSync(projPath + 'csi/' + page + '/' + template)
})

gulp.task('default', ['create'])
