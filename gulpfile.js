"use strict";

const { task, src, dest, series, watch } = require("gulp"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  image = require("gulp-image"),
  del = require("del"),
  connect = require("gulp-connect"),
  pump = require('pump');
/*  
  run gulp scripts to concat and minify js

  concatenate all of the project's js files into js/global.js, 

  minify/uglify js/global.js then copy global.js to the dist/scripts folder and rename as all.min.js
*/
var scripts = (done) => {
  pump(
    src("js/circle/*.js", { sourcemaps: true }),
    concat("all.min.js"),
    uglify(),
    dest("dist/scripts/", { sourcemaps: true }),
    (err) => { 
      if (err) console.log('scripts err: ', err);
      done();
    }
  );
};

var styles = (done) => {
  pump(
    src("sass/global.scss", { sourcemaps: true }),
    sass(),
    cleanCSS(),
    concat("all.min.css"),
    dest("dist/styles/", { sourcemaps: true }),
    connect.reload(),
    (err) => { 
      if (err) console.log('styles err: ', err);
      done();
    }
  ); 
};

var images = (done) => {
  pump(
    src("images/*.{jpg,png}"),
    image(),
    dest("dist/images/"),
    (err) => { 
      if (err) console.log('images err: ', err);
      done();
    }
  )
};

var icons = (done) => {
  pump(
    src("icons/**/*"),
    image(),
    dest("dist/icons/"),
    (err) => { 
      if (err) console.log('icons err: ', err);
      done();
    }
  )
};

var html = (done) => {
  pump(
    src("index.html"),
    dest("dist/"),
    (err) => { 
      if (err) console.log('html err: ', err);
      done();
    }
  )
};

var clean = (done) => {
  try {
    del("dist/")
    done();
  } catch(err){
    console.log('clean err: ', err);
  }
};

var connector = (done) => {
  try {
    connect.server({
      root: "dist",
      port: 3000,
      livereload: true
    });
    done();
  } catch(err){
    console.log('connector err: ', err);
  }
};

var watcher = (done) => {
  try {
    watch(["sass/**/*.scss"], series(styles));
  } catch(err){
    console.log('watcher err: ', err);
  }
} 

var serve = series(connector, watcher);
var build = series(clean, scripts, styles, images, html);

// user can run gulp scripts
exports.scripts = scripts;

exports.default = series(build, serve);