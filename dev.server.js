var http = require('http');
var fs = require('fs');
var url = require('url');
const compressing = require('compressing');
const path = require('path')
const srcPath = path.resolve(__dirname, './src/')// 开发目录
const output = path.resolve(__dirname,'output.zip') // 输出压缩文件目录

// 获取本地IP
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();　
    for (var devName in interfaces) {　　
        var iface = interfaces[devName];　　　　　　
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }　　
    }
}
Date.prototype.format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };

    // 根据y的长度来截取年
    if (/(y+)/.test(fmt)){ 
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
}

function getNewTime(){
    const dateNew = new Date();
    return dateNew.format('hh:mm:ss')
}
exports.devServer=function(){
    // 创建服务器

http.createServer( function (request, response) {  
    // 解析请求，包括文件名
    var pathname = url.parse(request.url).pathname;
    
    // 输出请求的文件名
    console.log("Request for " + pathname + " received.");

    console.log(`[${getNewTime()}]`,'开始打包',output)
    compressing.zip.compressDir(srcPath, output).then(()=>{ // 压缩文件
        console.log(`[${getNewTime()}]`,'文化压缩成功',output)
    // 从文件系统中读取请求的文件内容
    fs.readFile('./output.zip', function (err, data) {
        if (err) {
        console.log(`[${getNewTime()}]`,'请求错误',err);
        // HTTP 状态码: 404 : NOT FOUND
        // Content Type: text/html
        response.writeHead(404, {'Content-Type': 'text/html'});
        }else{      

            var size = fs.statSync(output).size;

            // HTTP 状态码: 200 : OK
            // Content Type: 
            response.writeHead(200, {
                'Content-Type': 'application/x-zip-compressed',
                'Content-Disposition': 'attachment; filename=output.zip',
                'Content-Length': size
            });    
            console.log(`[${getNewTime()}]`,'文件下载');
            // 响应文件内容
            response.write(data);        
        }
        //  发送响应数据
        response.end();
        // console.log(`[${getNewTime()}]`,'文件下载成功');
    });   
    }).catch(()=>{
    response.writeHead(404, {'Content-Type': 'text/html'});
    })
    
}).listen(8060);
// 控制台会输出以下信息
console.log(`代码包地址： http://${getIPAdress()}:8060/output.zip`);
    return http;
}
