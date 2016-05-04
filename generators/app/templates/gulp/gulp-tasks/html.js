var fs              = require('fs'),
    cfg             = JSON.parse(fs.readFileSync('./config.json')),
    gulp            = require('gulp'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber'),<% if(templateOption === 'jade'){ %>
    jade            = require('gulp-jade'),<% } if(templateOption === 'pug'){ %>
    pug             = require('gulp-pug'),<% } if(templateOption === 'nunjucks'){ %>
    nunjucks        = require('gulp-nunjucks-render'),<% } %>
    special         = require('gulp-special-html'),
    prettify        = require('gulp-prettify'),
    inlineCss       = require('gulp-inline-css'),
    embedCss        = require('gulp-inline-source');



gulp.task('html', ['styles', 'images'], function() {
  var embedCssOptions = {
        compress: false,
        pretty: true,
        attribute: 'embed'
      },
      inlineCssOptions = {
        extraCss: '',
        applyStyleTags: false,
        applyLinkTags: true,
        removeStyleTags: false,
        removeLinkTags: true,
        preserveMediaQueries: true,
        applyWidthAttributes: false,
        applyTableAttributes: true
      }
  return gulp.src(cfg.html.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))<% if(templateOption === 'jade'){ %>
    .pipe(jade())<% } if(templateOption === 'pug'){ %>
    .pipe(pug())<% } if(templateOption === 'nunjucks'){ %>
    .pipe(nunjucks({ path: [cfg.html.templates] }))<% } %>
    .pipe(special())
    .pipe(embedCss(embedCssOptions))
    .pipe(inlineCss(inlineCssOptions))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.html.build));
});
