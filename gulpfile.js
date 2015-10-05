var gulp = require('gulp');
var plato = require('gulp-plato');

var Server = require('karma').Server;

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('plato', function () {
  return gulp.src(__dirname + '/src/*.js')
    .pipe(plato('reports/plato', {
    .pipe(plato('report', {
        jshint: {
            options: {
                strict: true
            }
        },
        complexity: {
            trycatch: true
        }
    }));
});