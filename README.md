
# gulp web

## 文件目录说明

```
|-- gulp-web
    |-- .DS_Store
    |-- .config.js // 关于gulpfile 的配置文件
    |-- .gitignore
    |-- README.md 
    |-- gulpfile.js // gulp执行的任务代码
    |-- package-lock.json
    |-- package.json
    |-- src // 开发根目录，子目录没有规范要求
        |-- index.html
        |-- css
        |   |-- index.css
        |-- imag
        |-- js
            |-- index.js
```


## 开发帮助命令
1. 安装全局gulp

```shell
npm install -g gulp
```

2. 安装脚手架包

```shell
npm install
```

3. 进入开发模式

```shell
gulp dev
```
```
输出：
Wanrong:gulp-web lwr$ gulp dev
[11:05:57] Using gulpfile ~/work/WWZL/gulp-web/gulpfile.js
[11:05:57] Starting 'dev'...
[11:05:57] Starting 'connect'...
[11:05:57] Starting 'watch'...
[11:05:57] Starting server...
代码包地址： http://192.168.4.150:8060/output.zip // 输出的是APP联调下载前端代码包地址
[11:05:57] Finished 'connect' after 7.21 ms
[11:05:57] Server started http://0.0.0.0:8080
[11:05:57] LiveReload started on port 35729
[11:05:57] Running server
```

4. 代码打包

```shell
gulp build
```

## config配置说明
```javascript
const path = require('path')
const DEV_PATH = path.resolve(__dirname, './src')// 开发目录
const DIST_Path = path.resolve(__dirname, './dist') // 打包目录，可以配置成app的目录

// 代理配置，详细说明可以查看gulp-connect帮助文档
const middlewares = [
  // proxy('/index', {
  //     target: 'http://youwebsite.com',
  //     changeOrigin: true
  // })
]
module.exports={
  DEV_PATH,DIST_Path,middlewares
}
```
