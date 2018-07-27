import {msg} from '../utils'
import config from '../config'

var Fly = require("flyio/dist/npm/wx")
var qs = require('qs');           // 针对参数formData
var fly = new Fly();
const pageSize = 100;
fly.config.baseURL = config.host
fly.interceptors.request.use((request) => {
	//给所有请求添加自定义header
	//打印出请求体
	//   console.log(request)
	let t = wx.getStorageSync('_token');
	if (t) { request.body = request.body ? request.body + "&_token=" + t : "_token=" + t };
	//终止请求    
	//var err=new Error("xxx")
	//err.request=request
	//return Promise.reject(new Error(""))
	return request;
})
fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        return response.data
    },
    (err) => {
        //发生网络错误后会走到这里
		//return Promise.resolve("ssss")
		msg('网络连接失败，请稍后再试')
    }
)
//   普通登录
export function loginByCode(userInfo) {
	return fly.post('/api/user/getWeChatToken', qs.stringify(userInfo))
}

// 绑定手机   @params  phone , code
export function bindPhone(params) {
	return fly.post('/api/user/bindPhone', qs.stringify(params))
}
// 获取手机验证码 @params 
///         phone, 
///         type  1、注册;2、找回密码;3、修改手机;4、修改密码;
export function getPhoneCode(params) {
	return fly.get('/api/user/sendVerificationCode', qs.stringify(params))
}

// 获取任务分类
export function getTaskDict() {
	return fly.get('/api/dict/list?dictType=task_type')
}

export function getBannerList() {
	return fly.get('/api/advert/list')
}

//  获取任务详情   @params    taskId  userId
export function getTaskDetail(params) {
	return fly.get('/api/task/getDetailById', qs.stringify(params))
}
// 获取新手任务  @params    userid,dictId  2 
export function getNewHandsTask(userid, dictId = 2) {
	return fly.get('/api/task/newTask', qs.stringify({ userid, dictId }))
}

// 获取推荐任务
export function getRecommendTask(pageNo, userId = '') {
	userId = wx.getStorageSync('userId') || '';
	return fly.get('/api/task/getRecommend', qs.stringify({ pageNo, userId, pageSize }))
}

// 获取所有任务
export function getAllTask(pageNo, userId = '') {
	userId = wx.getStorageSync('userId') || '';
	return fly.get('/api/task/list', qs.stringify({ pageNo, userId, pageSize }))
}

//领取任务 
export function takeTask(taskId,taskDetailId){
	let params = {}
	if(!taskDetailId){
		params = {taskId}
	}else{
		params = {taskId,taskDetailId}
	}
	return fly.get('/api/taskUser/getReceive',qs.stringify(params))
}

// 查询我的余额
export function getMyMoney(){
	return fly.get('/api/userDeposit/getMyBalance')
}

//完善资料   @params  name sex avatar
export function completeUser(params){
	return fly.post('/api/user/completeUser',qs.stringify(params))
}

//查询我的任务 
/**
 * param status  状态(2进行中3已完成)			
 */
export function getMyTask(status,pageSize,pageNum){
	return fly.get('/api/task/myList',qs.stringify({status,pageSize,pageNum}))
}

// 提交审核  taskId taskDetailId  voucher remark
export function completeApply(userTaskId,userTaskDetailId,voucher,remark){
	return fly.post('/api/taskUser/completeApply',qs.stringify({userTaskId,userTaskDetailId,voucher,remark}))
}

export function getMyDeposit(beginTime,endTime){
	return fly.get('/api/userDeposit/getMyDeposit',qs.stringify({beginTime,endTime}))
}

// 放弃任务   taskId  taskDetailId
export function giveUpTask(taskId,taskDetailId){
	return fly.post('/api/taskUser/giveUpTask',qs.stringify({taskId,taskDetailId}))
}

// 查询绑定账户
export function getMyBind(){
	return fly.get('/api/userDeposit/getMyBind')
}

// 查询收益明细
export function getMoneyDetail(type,pageSize,pageNum){
	return fly.get('/api/userDeposit/getDepositPage',qs.stringify({type,pageSize,pageNum}))
}

// 绑定微信账号 
export function bindWx(name,accountNo){
	return fly.post('/api/userDeposit/addUserAccount',qs.stringify({type:1,name,accountNo}))
}

//查询凭证信息
export function getApply(userTaskId,userTaskDetailId=""){
	return fly.get('/api/task/getApplyById',qs.stringify({userTaskId,userTaskDetailId}))
}

//查询正在审核的任务
export function getApprove(pageSize,pageNum){
	return fly.get('/api/taskUser/getApprove',qs.stringify({pageSize,pageNum}))
}
