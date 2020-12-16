const {src, dest, series, parallel} = require('gulp');
const ghpages = require('gh-pages');

function htmlTask(){
  return src('src/*html')
  .pipe(dest('dist'))
}

function scriptsTask(){
  return src('src/js/*.js')
  .pipe(dest('dist/js'))
}

function stylesTask(){
  return src(['src/css/*'])
  .pipe(dest('dist/css'))
}

function deployTask(){
  return ghpages.publish('dist', function(err) {});
}

exports.html = htmlTask;
exports.scripts = scriptsTask;
exports.styles = stylesTask;
exports.default = series(htmlTask, scriptsTask, stylesTask);
exports.deploy = series(htmlTask, scriptsTask, stylesTask, deployTask);