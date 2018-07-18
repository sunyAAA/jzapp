import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/task/main'],
    window: {
      backgroundTextStyle: 'black',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '任务',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      "selectedColor": "#ff4b2b",
      "borderStyle": 'black',
      "list": [
        {
          "text": "任务",
          "pagePath": "pages/task/main",
          "iconPath": "static/images/task.png",
          "selectedIconPath": "static/images/task-active.png"
        },
        {
          "text": "任务进度",
          "pagePath": "pages/taskProgress/main",
          "iconPath": "static/images/task-progress.png",
          "selectedIconPath": "static/images/task-progress-active.png"
        },
        {
          "text": "我的",
          "pagePath": "pages/my/main",
          "iconPath": "static/images/admin.png",
          "selectedIconPath": "static/images/admin-active.png"
        },
      ]
    }
  }
}
