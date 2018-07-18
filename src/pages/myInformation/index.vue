<template>
  <div class="myInformation-wrap">
    <!-- 消息nav -->
    <div class="nav-tab">
      <div class="nav-item"
           v-for="(item,index) in navArr"
           v-text="item"
           @click="toggleNav(index)"
           :class="[ tabStatus == index ? 'current' : '' ]"
           :key="index"></div>
    </div>
    <!-- 消息卡片 -->
    <info-card></info-card>
  </div>
</template>

<script>
  import infoCard from '../../components/infoCard.vue'
  export default {
    components: {
      infoCard
    },
    data(){
      return {
        tabStatus: 0,
        navArr: ['任务消息','赏金消息']
      }
    },
    methods: {
      getInfoList(index){
        console.log('获取一次信息数据'+index)
      },
      toggleNav(index){
        this.tabStatus = index;
        this.getInfoList(index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .myInformation-wrap {
    .nav-tab {
      display: flex;
      justify-content: space-around;
    }
    .current {
      color: #ff4b2b;
    }
  }
</style>
