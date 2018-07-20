<template>
  <div class="perfectInfo-wrap">
    <h3>Hi 请完善信息</h3>
    <h5>完善信息，领取红包哟！</h5>
    <!-- 头像 -->
    <div class="head-pic">
      <img :src="headPic" alt="" v-show="imgUrl.length > 0">
      <div class="tip" v-show="imgUrl.length == 0" @click="upLoadImg">
        <img src="../../../static/images/icon-img.png" alt="">
        <div>添加头像</div>
      </div>
    </div>
    <!-- 表单 -->
    <div class="form">
      <div class="name">
        <span>姓名</span>
        <input type="text" v-model="name">
      </div>
      <div class="birthday">
        <span>出生日期</span>
        <picker mode="date" @change="birthdayChange">
          {{ birthday }}
        </picker>
      </div>
      <div class="sex">
        <div class="sex-item"
             v-for="(item,index) in sexArr"
             v-text="item"
             :class="[ sexStatus == index ? 'current' : '' ]"
             @click="sexChange(index)"
             :key="index"></div>
      </div>
      <!-- 确认按钮 -->
      <div class="btn-sure">
        <img src="../../../static/images/icon-sure.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {upImgs} from '../../utils'
  export default {
    data(){
      return {
        imgUrl: [],
        name: '张三',
        birthday: '2000-00-00',
        sexStatus: -1,
        sexArr: ['男','女']
      }
    },
    methods: {
      upLoadImg(){
        upImgs(2,this.imgUrl)
      },
      birthdayChange(e){
        this.birthday = e.mp.detail.value
      },
      sexChange(index){
        this.sexStatus = index
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .perfectInfo-wrap {
    h3 {
      font-size: 40rpx;
      color: #000;
      text-align: center;
    }
    h5 {
      font-size: 20rpx;
      color: #000;
      text-align: center;
    }
    // 头像
    .head-pic {
      width: 180rpx;
      height: 180rpx;
      border: 10rpx solid #efeff4;
      border-radius: 50%;
      margin: 70rpx auto 145rpx;
      .tip {
        width: 100%;
        height: 100%;
        text-align: center;
        img {
          width: 30rpx;
          height: 25rpx;
          margin: 60rpx 0 10rpx;
        }
        div {
          font-size: 20rpx;
          color: #000;
        }
      }
    }
    // 表单
    .form {
      width: 500rpx;
      margin: 0 auto;
      .name, .birthday {
        border: 2rpx solid #efeff4;
        padding: 0 40rpx;
        height: 100rpx;
        line-height: 100rpx;
        border-radius: 50rpx;
        font-size: 30rpx;
        color: #000;
        display: flex;
        justify-content space-between;
        margin-bottom: 60rpx;
        input {
          height: 100%;
          text-align: right;
        }
      }
      .sex {
        display: flex;
        justify-content space-between
        .sex-item {
          width: 200rpx;
          height: 100rpx;
          border-radius: 50rpx;
          border: 2rpx solid #efeff4;
          text-align: center;
          line-height: 100rpx;
          font-size: 30rpx;
          color: #000;
        }
        .current {
          border-color: #ff4b2b;
          background-color: #ffc9bf;
          color: #ff4b2b;
        }
      }
      // 确认按钮
      .btn-sure {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        background-color: #ff4b2b;
        color: #fff;
        font-size: 30rpx;
        text-align: center;
        box-shadow: 0 0 20rpx rgba(255, 75, 43, 0.47);
        margin: 100rpx auto 0;
        img {
          width: 50rpx;
          height: 38rpx;
          margin-top: 30rpx;
        }
      }
    }
  }
</style>

