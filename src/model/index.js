import { getTaskDict } from '../api'
import { timestampToDate } from '../utils'
var taskDict = []

export async function initDict() {
    taskDict = (await getTaskDict()).data
    return taskDict;
}


export function formTask(arr) {
    let result = [];
    if(!arr){
        return result;
    }
    for (let item of arr) {
        let obj = {}
        obj.title = item.name;
        obj.beginTime = timestampToDate(item.beginTime);
        obj.endTime = timestampToDate(item.endTime);
        obj.preTime = formartTaskTime(item.preTime);
        obj.flag = getTaskType(item.type) || '';
        obj.taskId = item.taskId;
        obj.publisher = item.shopName || '平台发布';
        obj.taskBounty = item.amount;
        obj.type = item.type;
        obj.sortTime = item.preTime;
        obj.userStatus = item.userStatus;
        obj.userTaskDetailId = item.userTaskDetailId ;
        obj.url = item.url || '';
        obj.taskDetailId =item.taskDetailId
        result.push(obj)
    }
    return result;
}
export function formMyTask(arr) {
    let result = [];
    if(!arr){
        return result;
    }
    for (let item of arr) {
        let obj = {}
        obj.title = item.task.name;
        obj.beginTime = timestampToDate(item.beginTime);
        obj.endTime = timestampToDate(item.endTime);
        obj.preTime = formartTaskTime(item.task.preTime);
        obj.flag = getTaskType(item.task.type) || '';
        obj.taskId = item.taskId;
        obj.publisher = item.shopName || '平台发布';
        obj.taskBounty = item.task.amount;
        obj.type = item.type;
        obj.userStatus = item.status;
        obj.userTaskDetailId = item.userTaskDetailId;
        obj.isLocal = item.task.isLocal
        obj.url = item.task.url || '';
        obj.taskDetailId = item.task.taskDetailId
        result.push(obj)
    }
    return result;
}

export function formartTaskDetail(task) {
    return {
        name:task.name,
        type: getTaskType(task.type),
        publisher: task.shopName || "平台发布",
        startTime: timestampToDate(task.beginTime),
        endTime: timestampToDate(task.endTime),
        preTime:formartTaskTime(task.preTime),
        durationTime: task.taskTime,
        bounty: task.amount,
        countdown : getCalcDate(task.beginTime,task.endTime),
        durationTime:formartTaskTime(task.preTime),
        description: fixImg(task.description) || '',
        illustrate :task.illustrate|| '',
        userTaskDetailId:task.userTaskDetailId,
        taskDetailId:task.taskDetailId,
        taskTime :formartTaskTime(task.taskTime)
    }
}

export function formartTaskTime(time) {
    let timespan = time * 60;
    let day = Math.floor(timespan / 86400);
    let hour = Math.floor(timespan % 86400 / 3600);
    let minute = Math.floor(timespan % 86400 % 3600 / 60);
    return (day>0? `${day}天`:'') + (hour>0? `${hour}小时`:'') + `${minute}分钟`
}

function getCalcDate(begin, end) {
    let timespan = (end - begin)/1000;
    let day = Math.floor(timespan / 86400);
    let hour = Math.floor(timespan % 86400 / 3600);
    let minute = Math.floor(timespan % 86400 % 3600 / 60);
    return (day>0? `${day}天`:'') + (hour>0? `${hour}小时`:'') + `${minute}分钟`
}
export function diffTime(diff) {  
  
    //计算出相差天数  
    var days=Math.floor(diff/(24*3600*1000));  
       
    //计算出小时数  
    var leave1=diff%(24*3600*1000);    //计算天数后剩余的毫:数  
    var hours=Math.floor(leave1/(3600*1000));  
    //计算相差分钟数  
    var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫:数  
    var minutes=Math.floor(leave2/(60*1000));  
       
    //计算相差:数  
    var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫:数  
    var seconds=Math.round(leave3/1000);  
      
    var returnStr = seconds<10?'0'+seconds:seconds;  
    if(minutes>0) {  
        returnStr =minutes<10?'0'+minutes + ":":minutes+':' + returnStr;  
    }  
    if(hours>0) {  
        returnStr = hours<10?'0'+hours + ":":hours+':' + returnStr;  
    }  
    if(days>0) {  
        returnStr = days<10?'0'+days + ":":days+':' + returnStr;  
    }  
    return returnStr;  
}  
function getTaskType(type) {
    for (let item of taskDict) {
        if (type == item.dictId) {
            return item.dictName;
        }
    }
    return null;
}
export function fixImg(str){
    if(!str){return}
    var reg = /.jpg|.png|.jepg|.gif|.bmp/g 
    str = str.replace(reg,'$1/240')
    return str
}
