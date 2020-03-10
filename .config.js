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