const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

var watcher


function dev() {
  watcher = gulp.watch(['./app.scss', 'pages/**/*.scss', 'components/**/*.scss'])
  watcher.on('change', function(path) {
    // var index = path.search(/\\\w+\.scss/)
    var index = path.search(/\\\w+-?\w*\.scss/)
    if (index != -1) {
      var dest = path.substr(0, index)
      var torename = path
        .substr(index)
        .split('.')[0]
        .split('\\')[1]
    } else {
      var torename = 'app'
    }
    // console.log(path + ' | ' + dest + ' | ' + torename)
    gulp
      .src(path)
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(
        rename({
          basename: torename,
          extname: '.wxss'
        })
      )
      .pipe(gulp.dest('./'))
      .on('end', function() {
        var end = new Date()
        console.log(
          chalk.white(
            `[${end.getHours()}:${
              end.getMinutes() >= 10 ? end.getMinutes() : '0' + end.getMinutes()
            }:${
              end.getSeconds() >= 10 ? end.getSeconds() : '0' + end.getSeconds()
            }]`
          ) + chalk.cyan(` 编译完成`)
        )
      })
  })
}

exports.dev = dev
