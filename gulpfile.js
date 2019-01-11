const gulp = require('gulp');

gulp.task('date', () => console.log(new Date));

gulp.task('new',()=> {
return gulp.src('build/hello.js')
        .pipe(gulp.dest('new/js'));
});

gulp.task('new',() => {
    return gulp.src('build/file.css')
            .pipe(gulp.dest('new/css'));

});

gulp.task('build',() =>{
    return gulp.src('new/**/*/')
            .pipe(gulp.dest('build'));
});