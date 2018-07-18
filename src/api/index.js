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
//   普通登录
export function loginByCode(userInfo) {     
  return fly.post('/api/user/getWeChatToken',qs.stringify(userInfo))
}

// 绑定手机   @params  phone , code
export function bindPhone(params) {     
  return fly.post('/api/user/bindPhone',qs.stringify(params))
}
// 获取手机验证码 @params 
///         phone, 
///         type  1、注册;2、找回密码;3、修改手机;4、修改密码;
export function getPhoneCode(params){
  return fly.get('/api/user/sendVerificationCode',qs.stringify(params))
}

// 获取任务分类字典
export function getTaskDict(){
  return fly.get('/api/dict/list')
}

// 获取任务列表   @params   pagesize,pageno
export function getTaskList(params){
  return fly.get('/api/task/list',qs.stringify(params))
}