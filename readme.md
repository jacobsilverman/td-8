# instructions:

1. run `npm install` in the project directory
2. run `gulp`
3. open your browser to http://localhost:3000/

Individual commands you can run include: 

- `gulp scripts` concatenate, minify, and copy to dist/ as all.min.js
- `gulp styles` compile SCSS files to CSS, concatenate, minify and copy to dist/ as all.min.css.
- `gulp clean` delete all of the files and folders in the dist folder.
- `gulp images` optimize the size of the project’s JPEG and PNG files, and then copy to dist folder.
- `gulp build` run the clean, scripts, styles, images, icons tasks in that order.

However, `gulp` or `gulp default` will automatically run `gulp buld` then `gulp serve` (guaranteed in series).

Please note some changes were required to the original project files and to the project instructions to complete the project.

# index.html
Inside index.html change the following:
```
  <!-- CSS -->
  <link rel="stylesheet" href="css/global.css">
  <!-- JS -->
  <script type="text/javascript" src="js/global.js"></script>
```
TO
```
  <!-- CSS -->
  <link rel="stylesheet" href="styles/all.min.css">

  <!-- JS -->
  <script type="text/javascript" src="scripts/all.min.js"></script>
```

# dist/images folder

The [project instructions](https://teamtreehouse.com/projects/using-gulp-to-build-a-front-end-website) say: 

`As a developer, I should be able to run the gulp images command at the command line to optimize the size of the project’s JPEG and PNG files, and then copy those optimized images to the dist/content folder.`

However, the index.html file looks for the images in `images/` folder so it is my understanding that `dist/images` needs to exist and contain the images, NOT `dist/content` as described in the instructions.