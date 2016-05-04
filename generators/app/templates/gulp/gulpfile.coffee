fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
browserSync = require('browser-sync')
requireDir = require('require-dir')
gulp = require('gulp')
changed = require('gulp-changed')
watch = require('gulp-watch')

requireDir './gulp-tasks'



gulp.task 'default', ['build', 'browser-sync'], ->

  # watch for css changes
  gulp.watch cfg.styles.watch, ['styles']

  # watch for image changes
  gulp.watch cfg.img.src, ['images']

  # watch for html changes
  gulp.watch(cfg.html.watch, ['html']).on 'change', browserSync.reload
  return
