const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');

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

gulp.task('build', () => {
        return gulp.src('new/index.js')
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(gulp.dest('build'));
});

gulp.task('new-js', () => {
        return gulp.src(['build/*.js'])
                .pipe(concat('index.js'))
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(uglify())
                .pipe(gulp.dest('new'))
});

gulp.task('new-css', () => {
        return gulp.src(['styles/*.css'])
        .pipe(concat('mainstyles.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('new'))

});

gulp.task('new',['new-js', 'new-css']);