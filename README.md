
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
