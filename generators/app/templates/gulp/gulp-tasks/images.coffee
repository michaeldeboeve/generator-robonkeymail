fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
changed = require('gulp-changed')
imagemin = require('gulp-imagemin')
unusedImages = require('gulp-imagemin')



gulp.task 'images', ->
  gulp.src(cfg.img.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(changed(cfg.img.build))
    .pipe(imagemin())
    .pipe gulp.dest(cfg.img.build)



gulp.task 'build', ['html'], ->
  gulp.src([
    cfg.img.build + '/**/*'
    cfg.html.build + '/**/*.html'
  ])
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(unusedImages())
    .pipe plumber.stop()
