const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function html() {
    return gulp.src('src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            baseDir: 'src/app/components'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream())
}
function scss() {
    return gulp.src('src/app/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream())
}
function js() {
    return gulp.src('src/app/js/**/*.js')
         .pipe(uglify())
         .pipe(gulp.dest('dist/js/'))
         .pipe(browserSync.stream())
}
function images() {
    return gulp.src('src/app/imgs/**/*.*')
         .pipe(imagemin())
         .pipe(gulp.dest('dist/imgs/'))
}
function serve() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
}
function watchFiles() {
    gulp.watch('src/*.html', html)
    gulp.watch('src/app/scss/*.scss', scss)
    gulp.watch('src/app/js/**/*.js', js)
    gulp.watch('src/app/imgs/**/*.*', images)
}
exports.default = gulp.series(html, scss, js, images,
    gulp.parallel(serve, watchFiles))
