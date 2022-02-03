// 对于axios进行二次封装
import axios from 'axios'
// 引入nprogress进度条插件
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 创建实例
const instance = axios.create({
    // 配置对象
    // 基础路径，发请求的时候路径当中会出现api
    baseURL:"/mock",
    // 请求超时时间
    timeout:5000,
});

// 请求拦截器，在发请求之前请求拦截器可以监测到，可以在请求发出去之前做一些事情
instance.interceptors.request.use((config)=>{
    // 进度条开始
    nprogress.start();
    // config:配置对象，对象里有个很重要的属性，headers请求头
    return config;
},(error)=>{
    return Promise.reject(error)
})

// 响应拦截器，服务器响应数据回来之后响应拦截器可以监测到，可以做一些事情
instance.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(error)
})


// 对外暴露
export default instance;

