
"use strict";

const browsersync = require("browser-sync").create();
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");


function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "app"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}


// Clean assets
function clean() {
  return del(["app/assets/"]);
}

function css() {
  return gulp
    .src("./app/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./app/css"))
    .pipe(browsersync.stream());

}



// Lint scripts
function scriptsLint() {
  return gulp
    .src(["app/js/**/*.js", "gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}



// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(["app/js/**/*.js"])
      .pipe(plumber())
      .pipe(babel({presets: ["@babel/env"]}))
      .pipe(gulp.dest("app/dist"))
      .pipe(browsersync.stream())
  );
}


function watchFiles() {
  gulp.watch("app/scss/**/*.scss", css);
  gulp.watch("app/dist/**/*.js", gulp.series(scriptsLint, scripts));
  gulp.watch("app/*.html", browserSyncReload);
  gulp.watch("app/js/**/*.js", browserSyncReload);
}

const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(clean, gulp.parallel(css, js));
const watch = gulp.parallel(watchFiles, browserSync);

exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
