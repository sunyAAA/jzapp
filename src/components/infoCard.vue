<template>
  <div class="info-card">
    <ul>
      <li v-for="(item, index) in infoArr" :key="index"  @click="goToDetail()">
        <!-- 类型标记 -->
        <div class="type-flag">
          <div class="flag" v-text="item.flag"></div>
        </div>
        <!-- 任务内容 -->
        <div class="task-content">
          <div class="title" v-text="item.title"></div>
          <div class="publisher">发布商家：<span v-text="item.publisher"></span></div>
          <div class="time-limit">任务时间：<span v-text="item.beginTime"></span> 至 <span v-text="item.endTime"></span></div>
        </div>
        <!-- 倒计时 -->
        <div class="countdown">
          <div class="title">倒计时</div>
          <div class="time">{{ hour }}:{{ minute }}:{{ second }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        infoArr: [
          {
            flag: '试玩任务',
            title: '棋牌手游试玩',
            publisher: '米多游戏',
            beginTime: '2018-7-5',
            endTime: '2018-7-10',
            taskBounty: 380
          },
          {
            flag: '练级任务',
            title: '魔域之都手游',
            publisher: '新傲天',
            beginTime: '2018-7-5',
            endTime: '2018-7-10',
            taskBounty: 150
          },
          {
            flag: '福利任务',
            title: '注册任务',
            publisher: '花椒直播',
            beginTime: '2018-7-5',
            endTime: '2018-7-10',
            taskBounty: 10
          },
        ],
        countdown: 10000000,
        hour: '00',
        minute: '00',
        second: '00'
      }
    },
    computed: {
      countdownTime(){
        return this.countdown;
      }
    },
    mounted () {
      this.getTime();
    },
    methods: {
      goToDetail(){
        wx.navigateTo({
          url: '../taskDetail/main'
        })
      },
      // 倒计时
      async getTime(){
        setInterval(()=>{
          let h = Math.floor(this.countdown / 1000 / 60 / 60 % 60);
          let m = Math.floor(this.countdown / 1000 / 60 % 60);
          let s = Math.floor(this.countdown / 1000 % 60);
          this.hour = h >= 10 ? h : '0'+h;
          this.minute = m >= 10 ? m : '0'+m;
          this.second = s >= 10 ? s : '0'+s;
          this.countdown = this.countdown - 1000;
        },1000);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // 任务列表卡片
  .info-card {
    padding-bottom: 20px;
    margin-top: 20px;
    ul {
      li {
        background-color: #efeff4;
        padding: 0 30px;
        width: 610px;
        height: 180px;
        margin: 0 auto;
        border-radius: 12px;
        margin-bottom: 16px;
        // 类型标记
        .type-flag {
          width: 90px;
          float: left;
          .flag {
            width: 38px;
            height: 70px;
            background-color: #ff4b2b;
            font-size: 18px;
            color: #fff;
            padding: 10px 6px 0 6px;
            text-align: center;
            position: relative;
            line-height: 20px;
          }
          .flag:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border-left: 25px solid transparent;
            border-right: 25px solid transparent;
            border-bottom: 20px solid #fff;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
        // 任务内容
        .task-content {
          float: left;
          .title {
            font-size: 30px;
            font-weight: 500;
            margin: 25px 0 30px;
          }
          .publisher {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .time-limit {
            font-size: 20px;
          }
        }
        // 倒计时
        .countdown {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 2px solid #333;
          background-color: #fff;
          font-size: 20px;
          float: right;
          margin-top: 35px;
          text-align: center;
          .title {
            margin: 30px 0 10px;
          }
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>

