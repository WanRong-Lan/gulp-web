const gulp = require('gulp')
const {DEV_PATH,DIST_Path,middlewares} = require('./.config')
const connect = require('gulp-connect') // 开发阶段，因为的前后端分离的项目，所以需要一个web服务器, gulp-connect是一个带有livereload的web服务器 
const changed = require('gulp-changed') // 可以过滤那些改动过的文件
const sass = require('gulp-sass')
const plumber = require('gulp-plumber') // 处理pipe破裂导致的错误
const clean = require('gulp-clean') // 移除文件和文件夹
const htmlmin = require('gulp-htmlmin') // 压缩html
const server = require('./dev.server')
let devServer = null
// 创建一个服务
gulp.task('connect',function(cd){
    
    connect.server({
        root: `${DEV_PATH}`,
        host:'0.0.0.0',
        port: 8080,
        livereload: true,
        middleware: function(connect, opt) { //设置代理
            return middlewares
        }
    });

    devServer = server.devServer()
    cd()
})

// 创建监听文件
gulp.task('watch',function(cd){
    gulp.watch(`${DEV_PATH}/**/*.html`,gulp.series('html')) // 监听开发目录下.html文件，存在修改执行html任务
    gulp.watch(`${DEV_PATH}/**/*.{css,scss}`,gulp.series('css')) // 监听CSS、scss
    gulp.watch(`${DEV_PATH}/**/*.js`,gulp.series('js')) // 监听js
})

// html 任务：专门处理.html文件的
gulp.task('html',function(cd){
    console.log(gulp.dest('dev'))
    return gulp.src(`${DEV_PATH}/**/*.html`)
        .pipe(changed('dev', { 
            hasChanged: changed.compareLastModifiedTime ////比较修改时间
        }))
        .pipe(plumber())
        .pipe(connect.reload());
})

// CSS 
gulp.task('css',function(cd){
    console.log(`${DEV_PATH}/**/*.{css}`)
    return gulp.src(`${DEV_PATH}/**/*.{css}`)
        .pipe(changed('dev/', {
            hasChanged: changed.compareLastModifiedTime, //比较修改时间
            extension: '.css' //因为是.scss与.css 比较，所以要设置文件后缀
        }))
        .pipe(plumber())
        .pipe(connect.reload())
})

// JS 
gulp.task('js',function(cd){
    return gulp.src(`${DEV_PATH}/**/*.js`)
        .pipe(connect.reload())
})

gulp.task('dev',gulp.series(gulp.parallel('connect','watch')))


//------------------ build --------------------
// 删除已经打包的文件
gulp.task('clean-build',function(cd){
    return gulp.src([DIST_Path],{ read: false }) 
        .pipe(clean())
})

// JS bulid
gulp.task('js-build',function(cd ){
    return gulp.src(`${DEV_PATH}/**/*.js`)
        .pipe(gulp.dest(DIST_Path))
})

// CSS bulid
gulp.task('css-bulid',function(cd){
    return gulp.src(`${DEV_PATH}/**/*.{css}`)
        .pipe(gulp.dest(DIST_Path))
})

// file bulid，其他文件的build
gulp.task('file-bulid',function(cd){
    return gulp.src(['src/**/*.!(html|htm|js|css|scss)'])
        .pipe(gulp.dest(DIST_Path))
})

// HTML build
gulp.task('html-build',function(cd ){
    return gulp.src(`${DEV_PATH}/**/*.html`)
        // .pipe(htmlmin({
        //     removeComments: true, //清除HTML注释
        //     collapseWhitespace: true, //压缩HTML
        //     minifyJS: true, //压缩页面JS
        //     minifyCSS: true //压缩页面CSS
        // }))
        .pipe(gulp.dest(DIST_Path))
})

// bulid 任务
gulp.task('build',gulp.series('clean-build','html-build','css-bulid','js-build','file-bulid'))


function defaultTask(cb) {
    console.log('default');
    
    // place code for your default task here
    cb();
  }
  exports.default = defaultTask