var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var defaults = {
    templatesHbr: 'templates-hbr',
    templatesJs: 'templates-js',
    filePattern: '/**/[^_]*.hbs',
    preCompiledTemplatesFile: 'pre-compiled-templates.js'
}


gulp.task('watch', function () {
    console.log("watch");
    gulp.watch(defaults.templatesHbr + defaults.filePattern, ['templates'])
});

gulp.task('templates', function () {
    gulp.src(defaults.templatesHbr + defaults.filePattern)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'SortHandlebars.templates',
            noRedeclare: true
        }))
        .pipe(concat(defaults.preCompiledTemplatesFile))
        .pipe(uglify())
        .pipe(gulp.dest(defaults.templatesJs));
});

gulp.task('default', function () {
    gulp.run('templates');

    gulp.watch(defaults.templatesHbr + defaults.filePattern, function () {
        gulp.run('templates');
    });
});