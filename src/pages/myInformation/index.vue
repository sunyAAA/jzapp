<template>
  <div class="myInformation-wrap">
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
      }
    },
    methods: {
      getInfoList(index){
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
