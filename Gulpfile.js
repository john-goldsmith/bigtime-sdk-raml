const gulp = require('gulp'),
      $ = require('gulp-load-plugins')({
        pattern: '*'
      }),
      config = {
        paths: {
          src: './src',
          tmp: './.tmp',
          dist: './dist',
          docs: [
            './.tmp/INSTALL.md',
            './.tmp/README.md'
          ],
          raml: [
            './src/**/*.raml'
          ],
          schema: [
            './src/schema/**/*.json'
          ]
        }
      };

gulp.task('default', () => $.runSequence('clean:all', 'raml:verify', 'schema:lint', 'raml:compile', 'build', 'copy:docs'));

/**
 * Start a local server serving files from .tmp/ and src/
 */
gulp.task('serve', () => {
  $.browserSync.init({
    server: {
      baseDir: [
        '.'
      ]
    },
    open: false,
    notify: false
  });
});

gulp.task('clean:tmp', () => $.del(config.paths.tmp));

gulp.task('clean:dist', () => $.del(config.paths.dist));

gulp.task('clean:docs', () => $.del('./*.md'));

gulp.task('clean:all', () => $.runSequence('clean:tmp', 'clean:dist', 'clean:docs'));

gulp.task('raml:verify', () => {
  return gulp.src(config.paths.raml)
    .pipe($.raml())
    .pipe($.raml.reporter('default'));
});

gulp.task('schema:lint', function() {
  return gulp.src(config.paths.schema)
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('raml:compile', () => {
  return gulp.src(config.paths.raml)
    .pipe($.exec('$(npm bin)/raml-to-client <%= file.path %> -o ' + config.paths.tmp + ' -l javascript'));
});

gulp.task('build', () => {
  return gulp.src('./.tmp/index.js')
    .pipe($.uglify())
    .pipe($.rename('sdk.min.js'))
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('copy:docs', () => {
  return gulp.src(config.paths.docs)
    .pipe(gulp.dest('.'));
});