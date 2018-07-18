function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime
}
export function upImgs(num,result) {  // num:上传的数量   result:接受返回文件名的数组
  // return new Promise()
  wx.chooseImage({
    count: num, //最多可以选择的图片张数,
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: res => {//返回图片的本地文件路径列表 tempFilePaths,
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      wx.request({
        url: config.host + '/api/imgupload/getImgPolicy',  // 签名
        success: oss => {
          _loading('正在上传')
          for(var i =0 ; i <num;i++){
            var item = tempFilePaths[i]
            wx.uploadFile({
              url: config.host + '/api/imgupload/imgUpload',   //上传
              filePath: item,
              name: 'upfile',
              formData:{
                name:item,
                policy:res.policy,
                signature:res.signature,
                OSSAccessKeyId:res.accessid
              },
              success: res => {
                result.push('/'+ JSON.parse(res.data).data);
                if(i == num){_loading()}
              }
            });
          }

        },
      });
    },
  });
}
