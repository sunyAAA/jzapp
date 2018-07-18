<template>
  <div class="task-card">
      <!--<li v-for="(item, index) in tasksArr" :key="index"  @click="goToDetail()">-->
    <div class="card-item" @click="goToDetail()">
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
      <!-- 任务赏金 -->
      <div class="task-bounty">¥<span v-text="item.taskBounty"></span></div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    },
    props: ['item'],
    methods: {
      goToDetail(){
        wx.navigateTo({
          url: '../taskDetail/main'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // 任务列表卡片
  .task-card {
    padding-bottom: 20rpx;
    .card-item {
      background-color: #fff;
      padding: 0 30rpx;
      width: 610rpx;
      height: 180rpx;
      margin: 0 auto;
      border-radius: 12rpx;
      margin-bottom: 16rpx;
      // 类型标记
      .type-flag {
        width: 90rpx;
        float: left;
        .flag {
          width: 38rpx;
          height: 70rpx;
          background-color: #ff4b2b;
          font-size: 18rpx;
          color: #fff;
          padding: 10rpx 6rpx 0 6rpx;
          text-align: center;
          position: relative;
          line-height: 20rpx;
        }
        .flag:after {
          content: '';
          display: block;
          width: 0;
          height: 0;
          border-left: 25rpx solid transparent;
          border-right: 25rpx solid transparent;
          border-bottom: 20rpx solid #fff;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      // 任务内容
      .task-content {
        float: left;
        .title {
          font-size: 30rpx;
          font-weight: 500;
          margin: 25rpx 0 30rpx;
        }
        .publisher {
          font-size: 20rpx;
          margin-bottom: 10rpx;
        }
        .time-limit {
          font-size: 20rpx;
        }
      }
      // 任务赏金
      .task-bounty {
        font-size: 30rpx;
        color: #ff4b2b;
        float: right;
        line-height: 180rpx;
        span {
          font-size: 60rpx;
        }
      }
    }
    .card-item:last-child {
      margin-bottom: 0;
    }
  }
</style>

