<template>
  <div class="verified-wrap">
    <!-- 上传身份证（正面） -->
    <div class="upload-IDCard">
      <div class="ID-area" @click.stop='upLoadImg'>
        <img src='../../../static/images/uploadImg.png' alt="">
      </div>
      <span>请上传身份证（正面）</span>
    </div>
    <!-- 确认按钮 -->
    <div class="btn-sure">确认</div>
  </div>
</template>

<script>
  import {upImgs} from '../../utils'
  export default {
    data(){
      return {
        imgUrl: []
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
    // 上传身份证（正面）
    .upload-IDCard {
      .ID-area {
        width: 500rpx;
        height: 300rpx;
        border-radius: 10rpx;
        background-color: #efeff4;
        margin: 160rpx auto 10rpx;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        font-size: 30rpx;
        color: #999;
        padding-left: 125rpx;
      }
    }
    // 确认按钮
    .btn-sure {
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

