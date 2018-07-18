<template>
  <div class="perfectInfo-wrap">
    <!-- 头像 -->
    <div class="head-pic">
      <img src="" alt="">
      <div class="tip">
        <div class="icon-pic"><img src="" alt=""></div>
        <span>添加头像</span>
      </div>
    </div>
    <!-- 表单 -->
    <div class="form">
      <div class="name">
        <span>姓名</span>
        <input type="text" v-html="name">
      </div>
      <div class="birthday">
        <span>出生日期</span>
        <picker mode="date" @change="birthdayChange">
          {{ birthday }}
        </picker>
      </div>
      <div class="sex">
        <div class="sex-item boy">男</div>
        <div class="sex-item girl">女</div>
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
        birthday: '2000-00-00'
      }
    },
    methods: {
      upLoadImg(){
        upImgs(2,this.imgUrl)
      },
      birthdayChange(e){
        this.birthday = e.mp.detail.value
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .perfectInfo-wrap {
    // 头像
    .head-pic {
      img {

      }
    }
  }
</style>

