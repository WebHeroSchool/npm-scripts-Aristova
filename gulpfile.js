const env = require('gulp-env');
const glob = require('glob');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
// const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const short = require('postcss-short');
const assets = require('postcss-assets');
const postcssPresetEnv = require('postcss-preset-env');


const templateContext = require('./src/test.json');

const paths = {
        src: {
                dir: 'src',
                styles: 'src/styles/*.css',
                scripts: 'src/build/*.js'
        },
        new: {
                dir: 'new',
                styles: 'new',
                scripts: 'new'
        },
        buildNames: {
                styles: 'mainstyles.min.css',
                scripts: 'index.min.js'
        },
        templates: './src/templates/**/*.hbs'
};

env({
        file: '.env',
        type: 'ini',
});

gulp.task('compile', () => {
        glob(paths.templates, (err, files) => {
                if (!err) {
                        const options = {
                                ignorePartials: true,
                                batch: files.map(item => item.slice(0, item.lastIndexOf('/'))),
                                helpers: {
                                        hyphenate: str => str.split(' ').join('-'),
                                        // соединяет два  слова через дефис
                                        floor: (num) => Math.floor(num)
                                        // возвращает наибольшее целое число, которое меньше или равно данному числу
                                }


                        };
                        return gulp.src(`./src/index.hbs`)
                                .pipe(handlebars(templateContext, options))
                                .pipe(rename('index.html'))
                                .pipe(gulp.dest(paths.new.dir));
                }
        });
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
        const plugins = [
                autoprefixer({
                        browsers: ['last 1 version']
                }),
                nested,
                short,
                assets({
                        loadPaths: ['images/']
                }),
                postcssPresetEnv(/* pluginOptions */)

        ];
        return gulp.src([paths.src.styles])
                .pipe(sourcemaps.init())
                .pipe(postcss(plugins))
                .pipe(concat(paths.buildNames.styles))
                .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(paths.new.styles))

});
// gulp.task('clean', function () {
//         return gulp.src('new', { read: false })
//                 .pipe(clean());
// });
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

