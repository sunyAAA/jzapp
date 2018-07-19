<template>
  <div class="taskDetail-wrap">
    <!-- 任务简介和操作 -->
    <div class="information-operate">
      <div class="info">
        <!-- 任务内容 -->
        <div class="info-content">
          <div class="type" v-text="type"></div>
          <div class="title">发布商家：<span v-text="publisher"></span></div>
          <div class="time">
            任务时间：<span v-text="startTime"></span> 至 <span v-text="endTime"></span>
          </div>
          <div class="duration-time">
            任务时长：<span v-text="durationTime"></span>
          </div>
        </div>
        <!-- 赏金和时间 -->
        <div class="bounty-countdown">
          <div class="bounty">¥<span v-text="bounty"></span></div>
          <div class="countdown" v-text="countdown"></div>
        </div>
      </div>
      <div class="operate">
        <!-- 领取按钮 -->
        <div class="btn-receive" v-if="!receiveFlag" @click="receive">领取</div>
        <!-- 提交凭证和放弃按钮 -->
        <div class="btn-group" v-else>
          <div class="btn-submit" @click="submit">提交凭证</div>
          <div class="give-up" @click="giveUp">放弃</div>
        </div>
      </div>
    </div>
    <!-- 任务描述、任务说明、任务列表 -->
    <div :class="['task',{ 'received': receiveFlag } ]" v-show="!task">
      <!-- 任务导航 -->
      <div class="task-nav">
        <div class="nav-item" :class="[ currentTab == 0 ? 'current' : '' ]" @click="toggleNav(0)">任务描述</div>
        <div class="nav-item" :class="[ currentTab == 1 ? 'current' : '' ]" @click="toggleNav(1)">任务说明</div>
        <div class="nav-item" :class="[ currentTab == 2 ? 'current' : '' ]" @click="toggleNav(2)">任务列表</div>
      </div>
      <!-- 任务内容 -->
      <div class="task-content">
        <div class="content-item task-desc" v-show="currentTab == 0">
          <p v-for="(item, index) in taskDesc" :key="index" v-text="item"></p>
        </div>
        <div class="content-item task-detail" v-show="currentTab == 1">
          <p v-for="(item, index) in taskDetail" :key="index" v-text="item"></p>
        </div>
        <div class="content-item task-list" v-show="currentTab == 2">
          <task-card></task-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import taskCard from '../../components/taskCard'
  export default {
    components:{
      taskCard
    },
    data(){
      return {
        type: '注册任务',
        publisher: '花椒直播',
        startTime: '2018-07-05',
        endTime: '2018-07-10',
        durationTime: '5小时',
        bounty: '20',
        countdown: '4天7小时26分34秒',
        receiveFlag: false,
        currentTab: 0,
        taskDesc: [
          '1.新用户绑定手机号码可获得5000金币奖励，救济金每天可以领取3次，每次3000金币。',
          '2.新手7天签到可领取35000金币及13个元宝、10钻石奖励。',
          '3.游戏中完成任务可获得1100W金币。'
        ],
        taskDetail: [
          '1.这里是任务说明页面。',
          '2.这里是任务说明页面。',
          '3.这里是任务说明页面。',
          '4.这里是任务说明页面。',
          '5.这里是任务说明页面这里是任务说明页面这里是任务说明页面这里是任务说明页面。',
        ]
      }
    },
    methods: {
      receive(){
        this.receiveFlag = true;
      },
      submit(){
//        this.receiveFlag = true;
      },
      giveUp(){
        this.receiveFlag = false;
      },
      toggleNav(n){
        this.currentTab = n;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .taskDetail-wrap {
    // 任务简介和操作
    .information-operate {
      border-top: 2px solid #efeff4;
      border-bottom: 2px solid #efeff4;
      padding: 40px 40px 30px;
      position: relative;
      .info {
        display: flex;
        justify-content: space-between;
        // 任务内容
        .info-content {
          .type {
            font-size: 30px;
          }
          .title, .time, .duration-time {
            font-size: 22px;
            /*line-height: 40px;*/
            margin-top: 10px;
          }
        }
        // 赏金和时间
        .bounty-countdown {
          color: #ff4b2b;
          text-align: right;
          .bounty {
            font-size: 22px;
            span {
              font-size: 40px;
            }
          }
          .countdown {
            font-size: 22px;
          }
        }
      }
      .operate {
        // 领取按钮
        .btn-receive {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: #ff4b2b;
          color: #fff;
          font-size: 22px;
          text-align: center;
          line-height: 100px;
          position: absolute;
          bottom: -50px;
          right: 40px;
        }
        // 提交凭证和放弃按钮
        .btn-group {
          display: flex;
          justify-content: flex-end;
          margin-top: 30px;
          .btn-submit, .give-up {
            width: 160px;
            height: 50px;
            border-radius: 8px;
            font-size: 30px;
            text-align: center;
            line-height: 50px;
            background-color: #ff4b2b;
            color: #fff;
          }
          .give-up {
            background-color: #fff;
            border: 2px solid #ff4b2b;
            color: #333;
            margin-left: 30px;
          }
        }
      }
    }
    // 任务描述、任务说明、任务列表
    .task {
      padding: 60px 40px 0;
      // 导航栏
      .task-nav {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .nav-item {
          font-size: 30px;
        }
        .current {
          color: #ff4b2b;
        }
      }
      // 任务内容
      .task-content {
         .content-item {
           font-size: 22px;
         }
        .task-desc, .task-detail {
          p {
            line-height: 48px;
          }
        }
      }
    }
    .received {
      padding-top: 30px;
    }
  }
</style>
<style lang="stylus">
  .task-card {
    ul {
      li {
        background-color: #efeff4 !important;
      }
    }
  }
</style>
