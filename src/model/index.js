import { getTaskDict } from '../api'
import { timestampToDate } from '../utils'
var taskDict = []

export async function initDict() {
    taskDict = (await getTaskDict()).data.data
    wx.setStorageSync('taskType', taskDict);
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
        obj.publisher = item.shopName || '无';
        obj.taskBounty = item.amount;
        obj.type = item.type;
        obj.sortTime = item.preTime;
        result.push(obj)
    }
    return result;
}

export function formartTaskDetail(task) {
    return {
        type: getTaskType(task.type),
        publisher: task.shopName || "无",
        startTime: timestampToDate(task.beginTime),
        endTime: timestampToDate(task.endTime),
        durationTime: task.taskTime,
        bounty: task.amount,
        countdown : getCalcDate(task.beginTime,task.endTime),
        durationTime:formartTaskTime(task.preTime)
    }
}

function formartTaskTime(time) {
    let timespan = time * 60;
    let day = Math.floor(timespan / 86400);
    let hour = Math.floor(timespan % 86400 / 3600);
    let minute = Math.floor(timespan % 86400 % 3600 / 60);
    return (day>0? `${day>10?day:'0'+day}天`:'') + (hour>0? `${hour>10?hour:'0'+hour}时`:'') + `${minute>10?minute:'0'+minute}分`
}

function getCalcDate(begin, end) {
    let timespan = (end - begin)/1000;
    let day = Math.floor(timespan / 86400);
    let hour = Math.floor(timespan % 86400 / 3600);
    let minute = Math.floor(timespan % 86400 % 3600 / 60);
    return (day>0? `${day}天`:'') + (hour>0? `${hour}时`:'') + `${minute}分`
}

function getTaskType(type) {
    for (let item of taskDict) {
        if (type == item.dictId) {
            return item.dictName;
        }
    }
    return null;
}
// {
//     flag: "试玩任务",
//     title: "棋牌手游试玩",
//     publisher: "米多游戏",
//     beginTime: "2018-7-5",
//     endTime: "2018-7-10",
//     taskBounty: 380
// },
