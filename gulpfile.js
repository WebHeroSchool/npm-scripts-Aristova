const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
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
        return gulp.src([paths.src.scripts])
                .pipe(sourcemaps.init())
                .pipe(concat(paths.buildNames.scripts))
                .pipe(babel({
                        presets: ['@babel/env']
                }))
                .pipe(uglify())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(paths.new.scripts))
});

gulp.task('new-css', () => {
        return gulp.src([paths.src.styles])
                .pipe(sourcemaps.init())
                .pipe(concat(paths.buildNames.styles))
                .pipe(cssnano())
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(paths.new.styles))

});

gulp.task('default', ['new-js', 'new-css']);

// gulp.task('watch', () => {
//         gulp.watch(paths.src.scripts['new-js']);
//         gulp.watch(paths.src.styles['new-css']);
// });

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