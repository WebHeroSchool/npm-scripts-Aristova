const env = require('gulp-env');
const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
        src: {
                styles: 'src/styles/*.css',
                scripts: 'src/build/*.js'
        },
        new: {
                styles: 'new',
                scripts: 'new'
        },
        buildNames: {
                styles: 'mainstyles.min.css',
                scripts: 'index.min.js'
        }
};

env({
        file: '.env',
        type: 'ini',
});

gulp.task('build', () => {
        return gulp.src('new/hello.js')
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(gulp.dest('build'))
}); ``

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
        return gulp.src([paths.src.scripts])
                .pipe(sourcemaps.init())
                .pipe(concat(paths.buildNames.scripts))
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(paths.new.scripts))

});

gulp.task('new-css', () => {
        const pliguns = []
        return gulp.src([paths.src.styles])
                .pipe(sourcemaps.init())
                .pipe(postcss())
                .pipe(concat(paths.buildNames.styles))
                .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(paths.new.styles))

});
gulp.task('clean', function () {
        return gulp.src('new', { read: false })
                .pipe(clean());
});
gulp.task('new', ['new-css', 'new-js']);

gulp.task('watch', () => {
        gulp.watch(paths.src.scripts['new-js']);
        gulp.watch(paths.src.styles['new-css']);
});

gulp.task('browser-sync', () => {
        browserSync.init({
                server: {
                        baseDir: "./new"
                }
        });
        gulp.watch(paths.src.scripts, ['new-js-watch']);
        gulp.watch(paths.src.styles, ['new-css-watch']);
});


gulp.task('new-js-watch', ['new-js'], () => browserSync.reload());
gulp.task('new-css-watch', ['new-css'], () => browserSync.reload());

gulp.task('default', ['new']);
gulp.task('prod', ['new']);
gulp.task('dev', ['new', 'browser-sync']);

