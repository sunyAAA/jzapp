<template>
  <div class="taskProgress-wrap">
    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li v-for="(item, index) in navArr" :key="index" v-text="item.title"></li>
      </ul>
    </div>
    <!-- 内容 -->
    <task-card></task-card>
  </div>
</template>

<script>
  import taskCard from '../../components/taskCard'
export default {
  components:{
    taskCard
  },
  data(){
    return {
      navArr: [
        {
          title: '进行中'
        },
        {
          title: '审核中'
        },
        {
          title: '已完成'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .taskProgress-wrap {
    background-color: #fff;
    min-height: 100vh;
    // 导航nav
    .nav {
      display: flex;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      ul {
        display: flex;
        width: 100%;
        justify-content: space-around;
        li {
          font-size: 30rpx;
          color: #000;
        }
        li.current {
          color: #ff4b2b;
        }
      }
    }
  }
</style>
<style lang="stylus">
  // 内容
  .task-card {
    ul {
      li {
        background-color: #efeff4 !important;
      }
    }
  }
</style>
