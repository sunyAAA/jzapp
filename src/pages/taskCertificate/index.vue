<template>
  <div class="verified-wrap">
    <!-- 任务信息卡片 -->
    <div class="card-item">
      <!-- 任务内容 -->
      <div class="task-content">
        <div class="title" v-text="task.title"></div>
        <div class="publisher">发布商家：<span v-text="task.publisher"></span></div>
        <div class="time-limit">任务时间：<span v-text="task.beginTime"></span> 至 <span v-text="task.endTime"></span></div>
      </div>
      <!-- 任务赏金 -->
      <div class="task-bounty">¥<span v-text="task.taskBounty"></span></div>
    </div>
    <!-- 上传凭证 -->
    <div class="upload-box">
      <div class="upload-area">
        <textarea placeholder="内容描述..."></textarea>
        <div class="btn-upload" @click.stop='upLoadImg'>
          <img src="../../../static/images/icon-camera.png" alt="">
        </div>
      </div>
      <span>上传凭证（最多可上传9张）</span>
    </div>
    <!-- 审核按钮 -->
    <div class="btn-review">预计审核时间，将在七个工作日内</div>
  </div>
</template>

<script>
  import {upImgs} from '../../utils'
  import taskCard from '../../components/taskCard.vue'
  export default {
    components: {taskCard},
    data(){
      return {
        imgUrl: [],
        task: {
          title: '注册任务',
          publisher: '花椒直播',
          beginTime: '2018-07-05',
          endTime: '2018-07-10',
          taskBounty: '10'
        }
      }
    },
    methods: {
      upLoadImg(){
        upImgs(2,this.imgUrl)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .verified-wrap {
    // 任务信息卡片
    .card-item {
      background-color: #efeff4;
      padding: 0 30rpx;
      width: 610rpx;
      height: 180rpx;
      margin: 0 auto;
      border-radius: 12rpx;
      margin-bottom: 60rpx;
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
    // 上传凭证
    .upload-box {
      .upload-area {
        width: 590rpx;
        height: 380rpx;
        border: 2rpx solid #e6e6e6;
        margin: 0 auto;
        padding: 40rpx;
        textarea {
          width: 100%;
          height: 181rpx;
        }
        .btn-upload {
          width: 200rpx;
          height: 200rpx;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      span {
        font-size: 30rpx;
        color: #999;
        padding-left: 40rpx;
      }
    }
    // 审核按钮
    .btn-review {
      width: 630rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 10rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: #ff4b2b;
      text-align: center;
      margin: 150rpx auto 0;
    }
  }
</style>


