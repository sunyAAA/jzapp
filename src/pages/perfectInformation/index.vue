<template>
  <div class="perfectInfo-wrap">
    <h3>Hi 请完善信息</h3>
    <h5>完善信息，领取红包哟！</h5>
    <!-- 头像 -->
    <div class="head-pic">
      <img :src="headPic" alt="" v-show="headPic">
      <div class="tip" v-show="!headPic">
        <img src="../../../static/images/icon-camera.png" alt="">
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
        #_#
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
      font-size: 40px;
      color: #000;
      text-align: center;
    }
    h5 {
      font-size: 20px;
      color: #000;
      text-align: center;
    }
    // 头像
    .head-pic {
      width: 180px;
      height: 180px;
      border: 10px solid #efeff4;
      border-radius: 50%;
      margin: 70px auto 145px;
      .tip {
        width: 100%;
        height: 100%;
        text-align: center;
        img {
          width: 30px;
          height: 25px;
          margin: 60px 0 10px;
        }
        div {
          font-size: 20px;
          color: #000;
        }
      }
    }
    // 表单
    .form {
      width: 500px;
      margin: 0 auto;
      .name, .birthday {
        border: 2px solid #efeff4;
        padding: 0 40px;
        height: 100px;
        line-height: 100px;
        border-radius: 50px;
        font-size: 30px;
        color: #000;
        display: flex;
        justify-content space-between;
        margin-bottom: 60px;
        input {
          height: 100%;
          text-align: right;
        }
      }
      .sex {
        display: flex;
        justify-content space-between
        .sex-item {
          width: 200px;
          height: 100px;
          border-radius: 50px;
          border: 2px solid #efeff4;
          text-align: center;
          line-height: 100px;
          font-size: 30px;
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
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #ff4b2b;
        color: #fff;
        font-size: 30px;
        text-align: center;
        line-height: 100px;
        box-shadow: 0 0 20px rgba(255, 75, 43, 0.47);
        margin: 100px auto 0;
      }
    }
  }
</style>

