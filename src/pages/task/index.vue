<template>
  <div>
    <div class="task-wrap" v-if="loginStatus">
      <!-- 广告位轮播 -->
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <img :src="item" class="slide-image">
          </swiper-item>
        </block>
      </swiper>
      <!-- 排序方式tab -->
      <div class="nav">
        <ul class="sort">
          <li class="sort-item" v-for="(item,index) in sortArr" v-text="item.title" :class="[ sortStatus == index ? 'current' : '' ]" @click="toggleTab(index)" :key="index"></li>
        </ul>
        <div class="type-kind">
          <span @click="toggleType()">
            {{ type }}
            <i></i>
          </span>
          <ul v-show="typeShow">
            <li v-for="(item, index) in taskKind" v-text="item.type" :class="[ typeStatus == index ? 'selected' : '' ]" @click="chooseType(item,index)" :key="index"></li>
          </ul>
        </div>
      </div>
      <!-- 任务列表 -->
      <task-card v-for="(item,index) in tasksArr" :key="index" :item="item"></task-card>
    </div>
    <login-box v-else></login-box>
  </div>

</template>

<script>
import taskCard from "../../components/taskCard";
import LoginBox from "../../components/loginBox.vue";
export default {
    components: {
        taskCard,
        LoginBox
    },
    data() {
        return {
            imgUrls: [
                "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
                "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
                "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
            ],
            loginStatus:false,
            indicatorDots: true,
            autoplay: true,
            interval: 5000,
            duration: 1000,
            sortArr: [
                {
                    title: "智能推荐"
                },
                {
                    title: "时间最优"
                },
                {
                    title: "赏金最高"
                }
            ],
            taskKind: [
                {
                    type: "福利任务"
                },
                {
                    type: "练级任务"
                },
                {
                    type: "注册任务"
                }
            ],
            type: "任务类型",
            typeShow: false,
            sortStatus: 0,
            typeStatus: -1,
            tasksArr: [
                {
                    flag: "试玩任务",
                    title: "棋牌手游试玩",
                    publisher: "米多游戏",
                    beginTime: "2018-7-5",
                    endTime: "2018-7-10",
                    taskBounty: 380
                },
                {
                    flag: "练级任务",
                    title: "魔域之都手游",
                    publisher: "新傲天",
                    beginTime: "2018-7-5",
                    endTime: "2018-7-10",
                    taskBounty: 150
                },
                {
                    flag: "福利任务",
                    title: "注册任务",
                    publisher: "花椒直播",
                    beginTime: "2018-7-5",
                    endTime: "2018-7-10",
                    taskBounty: 10
                }
            ]
        };
    },
    created(){
        wx.hideTabBar()
    },
    methods: {
        getTaskData() {
            console.log("获取了任务列表");
        },
        toggleTab(index) {
            this.sortStatus = index;
            this.getTaskData();
        },
        toggleType() {
            this.typeShow = !this.typeShow;
        },
        chooseType(item, index) {
            this.typeStatus = index;
            this.type = item.type;
            this.typeShow = false;
        }
    }
};
</script>

<style lang="stylus" scoped>
.task-wrap {
  background-color: #efeff4;
  min-height: 100vh;

  // 广告位轮播
  swiper {
    width: 750rpx;

    image {
      width: 100%;
      height: 375rpx;
    }
  }

  // 排序方式tab
  .nav {
    display: flex;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;

    ul.sort {
      display: flex;
      width: 75%;
      justify-content: space-around;

      li {
        font-size: 30rpx;
        color: #000;
      }

      li.current {
        color: #ff4b2b;
      }
    }

    .type-kind {
      width: 25%;
      font-size: 30rpx;
      text-align: center;

      span {
        i {
          width: 0;
          height: 0;
          display: inline-block;
          border-left: 10rpx solid transparent;
          border-right: 10rpx solid transparent;
          border-top: 18rpx solid #333;
        }
      }

      ul {
        background-color: #999;
        z-index: 999;

        li {
          width: 100%;
          height: 50rpx;
          line-height: 50rpx;
          text-align: center;
        }

        li.selected {
          color: #ff4b2b;
        }
      }
    }
  }
}
</style>
