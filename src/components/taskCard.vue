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
    padding-bottom: 20px;
    .card-item {
      background-color: #fff;
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
      // 任务赏金
      .task-bounty {
        font-size: 30px;
        color: #ff4b2b;
        float: right;
        line-height: 180px;
        span {
          font-size: 60px;
        }
      }
    }
    .card-item:last-child {
      margin-bottom: 0;
    }
  }
</style>

