const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('date', () => console.log(new Date));

gulp.task('build', () => {
        return gulp.src('new/hello.js')
                .pipe(babel({
                presets: ['@babel/env']
        }))
                .pipe(gulp.dest('build'));
});
gulp.task('build', () => {
        return gulp.src('new/file.css')
               .pipe(gulp.dest('build'));
});