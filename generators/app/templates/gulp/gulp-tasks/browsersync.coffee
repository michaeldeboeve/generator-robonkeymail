fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
browserSync = require('browser-sync')



gulp.task 'browser-sync', ->
  browserSync server: baseDir: cfg.browsersync.server
  return



gulp.task 'css', ->
  gulp.src(cfg.styles.build + '/**/*.css')
    .pipe browserSync.reload(stream: true)



gulp.task 'bs-reload', ->
  browserSync.reload()
  return
