const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const path ={
        src:{
                styles:'src/styles',
                scripts:'src/build'
        },
        new:{
                styles:'new-css',
                scripts:'new-js'
        },
        buildNames:{
                styles:'mainstyles.min.css',
                scripts:'index.min.js'
        }
};


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
        return gulp.src([path.src.scripts])
                .pipe(sourcemaps.init())
                .pipe(concat(path.buildNames.scripts))
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(uglify())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(path.new.scripts))
});

gulp.task('new-css', () => {
        return gulp.src([path.src.styles])
                .pipe(sourcemaps.init())
                .pipe(concat(path.buildNames.styles))
                .pipe(cssnano())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(path.new.styles))

});

gulp.task('default', ['new-js', 'new-css']);

gulp.task('watch',()=>{
        gulp.watch(path.src.scripts,['new-js']);
        gulp.watch(path.src.styles,['new-css']);
});