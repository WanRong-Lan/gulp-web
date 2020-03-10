const path = require('path')
const DEV_PATH = path.resolve(__dirname, './src')// 开发目录
const DIST_Path = path.resolve(__dirname, './dist') // 打包目录

const middlewares = [
  // proxy('/index', {
  //     target: 'http://youwebsite.com',
  //     changeOrigin: true
  // })
]
module.exports={
  DEV_PATH,DIST_Path,middlewares
}