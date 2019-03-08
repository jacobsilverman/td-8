"use strict";

/* 
  Techdegree Project 8: Jacob Silverman
  Run with `npm install` and `gulp`
  No need to move the icons folder manually
  Program will move icons as part of gulp build
  See the readme for more details..
*/

const { task, src, dest, series, watch } = require("gulp"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  image = require("gulp-image"),
  del = require("del"),
  connect = require("gulp-connect"),
  pump = require('pump');

// gulp scripts for js files to dist/
var scripts = (done) => {
  pump(
    // source maps are generated with sourcemaps: true
    src("js/circle/*.js", { sourcemaps: true }),
    // concat all js files into one file
    concat("all.min.js"),
    // minify all-to-one js file
    uglify(),
    // copy file to dist/scripts folder
    dest("dist/scripts/", { sourcemaps: true }),
    (err) => { 
      if (err) console.log('scripts err: ', err);
      done();
    }
  );
};

// gulp styles for moving css files to dist/
var styles = (done) => {
  pump(
    src("sass/global.scss", { sourcemaps: true }),
    // compile the project’s SCSS files into CSS
    sass(),
    cleanCSS(),
    // concatenate and minify into an all.min.css
    concat("all.min.css"),
    // copy the file to dist/styles
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
    // optimize the size of the project’s JPEG and PNG files
    image(),
    // copy optimized images to the dist/content folder.
    dest("dist/images/"),
    (err) => { 
      if (err) console.log('images err: ', err);
      done();
    }
  )
};

// move icons to dist/
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

// move html file to dist/
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
    // delete all of the files and folders in the dist folder.
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

/* 
  EXTRA CREDIT: continuously watch for changes to any .scss file in my project.
*/

var watcher = (done) => {
  try {
    watch(["sass/**/*.scss"], series(styles));
  } catch(err){
    console.log('watcher err: ', err);
  }
} 

/* 
  should be able to run the gulp build command at the command line 
  series: clean task completes before the other commands
*/

var serve = series(connector, watcher);
var build = series(clean, scripts, styles, images, html, icons);

// should be able to run the following gulp command(s) at the command line
exports.scripts = scripts;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
/* 
  should be able to run the gulp command at the command line 
  to run the build task and serve my project using a local web server.
*/
exports.default = series(build, serve);