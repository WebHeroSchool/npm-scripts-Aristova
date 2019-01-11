const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('date', () => console.log(new Date));

gulp.task('new', () => {
        return gulp.src('build/js/hello.js')
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(gulp.dest('new'));
});