<template>
  <div class="taskProgress-wrap">
    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li
          v-for="(item, index) in navArr"
          :key="index"
          :class="[ status == index ? 'current' : '' ]"
          @click="toggleTab(index)"
          v-text="item.title"></li>
      </ul>
    </div>
    <!-- 内容 -->
    <task-card v-for="(item,index) in taskArr" :key="index" :item="item"></task-card>
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
      ],
      status: 0,
      taskArr: [
        {
          flag: '试玩任务',
          title: '棋牌手游试玩',
          publisher: '米多游戏',
          beginTime: '2018-7-5',
          endTime: '2018-7-10',
          taskBounty: 380
        },
        {
          flag: '练级任务',
          title: '魔域之都手游',
          publisher: '新傲天',
          beginTime: '2018-7-5',
          endTime: '2018-7-10',
          taskBounty: 150
        },
        {
          flag: '福利任务',
          title: '注册任务',
          publisher: '花椒直播',
          beginTime: '2018-7-5',
          endTime: '2018-7-10',
          taskBounty: 10
        }
      ]
    }
  },
  methods: {
    toggleTab(index){
      this.status = index;
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
