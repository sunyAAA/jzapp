import {getTaskDict} from '../api'


export async function initDict(){
    let  taskDict = (await  getTaskDict()).data.data
    wx.setStorageSync('taskType', taskDict);
    return taskDict;
}
