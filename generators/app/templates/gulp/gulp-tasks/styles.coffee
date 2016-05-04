fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')<% if(preproOption === 'scss'){ %>
sassGlob = require('gulp-sass-glob')
sass = require('gulp-sass')<% } if(preproOption === 'stylus'){ %>
stylus = require('gulp-stylus')<% } if(preproOption === 'less'){ %>
less = require('gulp-less')
lessGlob = require('less-plugin-glob')<% } %>
cssbeautify = require('gulp-cssbeautify')



gulp.task 'styles', ->
  gulp.src(cfg.styles.src)<% if(preproOption === 'scss'){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))<% if(preproOption === 'scss'){ %>
    .pipe(sass())<% } if(preproOption === 'stylus'){ %>
    .pipe(stylus())<% } if(preproOption === 'less'){ %>
    .pipe(less({ plugins: [lessGlob] }))<% } %>
    .pipe(cssbeautify())
    .pipe(gulp.dest(cfg.styles.build))
