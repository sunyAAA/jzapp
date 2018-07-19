<template>
  <div class="verified-wrap">
    <!-- 上传身份证（正面） -->
    <div class="upload-IDCard">
      <div class="ID-area" @click.stop='upLoadImg'>
        <img src='../../../static/images/icon-camera.png' alt="">
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
        width: 500px;
        height: 300px;
        border-radius: 10px;
        background-color: #efeff4;
        margin: 160px auto 10px;
        text-align: center;
        img {
          width: 69px;
          height: 57px;
          margin-top: 122px;
        }
      }
      span {
        font-size: 30px;
        color: #999;
        padding-left: 125px;
      }
    }
    // 确认按钮
    .btn-sure {
      width: 630px;
      height: 80px;
      line-height: 80px;
      border-radius: 10px;
      font-size: 30px;
      color: #fff;
      background-color: #ff4b2b;
      text-align: center;
      margin: 150px auto 0;
    }
  }
</style>

