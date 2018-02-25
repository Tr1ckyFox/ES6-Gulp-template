//Include required modules
var gulp = require("gulp"),
    babelify = require('babelify'),
    browserify = require("browserify"),
    connect = require("gulp-connect"),
    source = require("vinyl-source-stream"),
    babel = require('gulp-babel');

//Default task. This will be run when no task is passed in arguments to gulp
gulp.task("default",["es6", "startServer"],function(){
    gulp.watch(['src/**/*.js'],['es6']);
});

gulp.task('es6', function(){
    return browserify({
        entries: ["./src/app.js"]
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./build"));
});


//Start a test server with doc root at build folder and 
//listening to 9001 port. Home page = http://localhost:9001
gulp.task("startServer", function(){
    connect.server({
        root : "./build",
        livereload : true,
        port : 9001
    });
});