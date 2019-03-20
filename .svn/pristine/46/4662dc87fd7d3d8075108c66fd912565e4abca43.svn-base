// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: { 
    env: require('./dev.env'),
    port: 8081,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
         '/vasms-web/': {
            /*****测试环境******/
            target:'http://222.212.141.40:9104',
            /*****正式环境******/
            // target:'https://www.wwvas.com:9101',//正式
            // target:'http://222.212.141.40:9102',//正式
            // target:'http://192.168.50.56:10020',//廖
            secure: false
        },
        '/oauth/': {
            target:'http://openapi.qzone.qq.com/',
            secure: false
        },
        '/image/': {
            target:'http://101.207.125.98:9104',
            secure: false
        },
        '/img/': {
            target:'http://101.207.125.98:9104',
            secure: false
        },
        '/api/': {
            target:'http://182.150.22.191:9203',
            secure: false
        },
        '/cgi-bin/': {
            target:'https://qyapi.weixin.qq.com',
            secure: false
        },
        '/auth/': {
            target:'http://demo.gobelieve.io',
            secure: false
        },
        '/ueditor/':{
            target:'http://192.168.0.213:8080/vasms-web/',
            secure: false
        },
        '/iData/': {
            target:'http://test.wwvas.com',
            secure: false
        },
         '/gisapiservice/':{
             target:'http://139.219.109.157:9204/' ,
             secure: false            
         },
    },
    cssSourceMap: false
  }
}
