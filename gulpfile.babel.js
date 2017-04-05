import gulp from 'gulp'
import eslint from 'gulp-eslint'
import sass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import {create as bsCreate} from 'browser-sync'
const browserSync = bsCreate()

const path = {
  src: {
    'css' : 'src/css/**/*',
    'js'  : 'src/js/**/*' 
  },
  dest: {
    'css' : 'build/css',
    'js'  : 'build/js'
  }
}

gulp.task('js', () =>
    gulp.src(path.src.js)
        .pipe( babel({ presets: ['es2015'] }) )
        .pipe( uglify() )
        .pipe( gulp.dest(path.dest.js) )
        .pipe( browserSync.stream() )
)

gulp.task('css', () => 
    gulp.src(path.src.css)
        .pipe( sass().on('error', sass.logError) )
        .pipe( cleanCSS() )
        .pipe( gulp.dest(path.dest.css) )
        .pipe( browserSync.stream() )
)

gulp.task('lint', () =>
    gulp.src([path.src.js])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
)

gulp.task('start', ['build'], () => {
    browserSync.init({
        server: "./"
    })
    gulp.watch( path.src.css, ['css'] )
    gulp.watch( path.src.js, ['lint', 'js'] )
    gulp.watch( '**/*.html').on('change', browserSync.reload )
})

gulp.task('build', ['css', 'js'])
gulp.task('default', ['build'])

