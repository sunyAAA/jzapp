<template>
  <div class="verified-wrap">
    <!-- 上传身份证（正面） -->
    <div class="upload-IDCard">
      <div class="ID-area" @click.stop='upLoadImg'>
        <img v-if="card" :src='oss+card' alt="">
        <img v-else src='../../../static/images/uploadImg.png' alt="">
      </div>
      <span>请上传身份证（正面）</span>
    </div>
    <!-- 确认按钮 -->
    <div class="btn-sure">确认</div>
  </div>
</template>

<script>
  import {upImgs, msg, showSucc} from '../../utils'
  import config from '../../config.js'
import { sendCard } from '../../api';
  const icon = require('../../../static/images/uploadImg.png')
  export default {
    data(){
      return {
        imgUrl: [],
        oss:config.ossroot
      }
    },
    methods: {
      upLoadImg(){
        upImgs(1,this.imgUrl)
      },
    },
    computed:{
      card(){
        return this.imgUrl[this.imgUrl.length - 1] || null;
      }
    },
    send(){
      sendCard(card).then(res=>{
        if(res.code == 1){
          showSucc('上传成功');
          back();
        }else{
          msg('上传失败，请稍后再试')
        }
      })
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

