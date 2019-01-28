

const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");


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




function watchFiles() {
  gulp.watch("app/scss/**/*.scss", css);
  
  gulp.watch('app/*.html', browserSyncReload);
  gulp.watch('app/js/**/*.js', browserSyncReload);
}

gulp.task("css", css);


// build
gulp.task(
  "default",
  gulp.series(clean, gulp.parallel(css, watchFiles, browserSync))
);

