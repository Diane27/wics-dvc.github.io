var gulp = require('gulp');
var panini = require('panini');

gulp.task('default',
  gulp.series(build, watch));

// Use Panini to convert pages to finished pages.
function build() {
  return gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers',
      data: 'src/data'
    }))
    .pipe(gulp.dest('.'));
}

// Load updated templates to Panini.
function reset(done) {
  panini.refresh();
  done();
}

function watch() {
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(build));
  gulp.watch('src/{layouts,partials,helpers,data}/**/*').on('all', gulp.series(reset, build));
}
