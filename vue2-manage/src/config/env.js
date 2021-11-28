/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 后端 url 地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://localhost:8080';
    baseImgPath = '';
}else{
	baseUrl = 'http://localhost:8080'
    baseImgPath = '';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}