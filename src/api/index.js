var Fly = require("flyio/dist/npm/wx")
var qs = require('qs');           // 针对java后台进行序列化
var fly = new Fly(); 
import config from '../config'
// import {msg} from '../utils'
fly.config.baseURL=config.host
fly.interceptors.request.use((request)=>{
    //给所有请求添加自定义header
      //打印出请求体
    //   console.log(request)
      let t = wx.getStorageSync('_token');
      if(t){request.body =request.body ? request.body+"&_token="+t :"_token="+t};
      //终止请求    
      //var err=new Error("xxx")
      //err.request=request
      //return Promise.reject(new Error(""))
    return request;
})