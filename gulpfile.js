"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();

const imagemin = require("gulp-imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const webp = require("gulp-webp");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");

//  CSS
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

//  Минификация JS
gulp.task("js", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = ".min.js";
    }))
    .pipe(sourcemap.write())
    .pipe(gulp.dest("build/js"));
});

//  Сервер
gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/img/**/*.svg", gulp.series("copy", "images", "sprite", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

//  Перезапуск сервера
gulp.task("refresh", function (done) {
  server.reload();
  done();
});

//  Оптимизация изображений
gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo(),
      imageminJpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

//  Создание WebP-изображений
gulp.task("webp", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

//  Сборка SVG-спрайта
gulp.task("sprite", function () {
  return gulp.src("source/img/{icon-*,logo-*,htmlacademy}.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

//  HTML
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

//  Копирование файлов
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**/*.{png,jpg,svg}",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

//  Удаление папки "build"
gulp.task("clean", function () {
  return del("build");
})


gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "js",
  "images",
  "webp",
  "sprite",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
