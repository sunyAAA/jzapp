<template>
  <div class="my-wrap">
    <!-- 个人信息（头像和昵称） -->
    <div class="admin-info">
      <navigator open-type="navigate" url="../adminData/main">
        <div class="head-pic">
          <img :src="headPicUrl" alt="用户头像">
        </div>
        <div class="username" v-text="username"></div>
      </navigator>
    </div>

    <!-- 功能列表 -->
    <div class="admin-list">
      <div class="list-item" v-for="(item, index) in adminList" :key="index" @click="jumpTo(item.pathTo)">
        <navigator open-type="navigate" :url="item.pathTo">
          <div class="icon"><img :src="item.icon"></div>
          <div class="title" v-text="item.title"></div>
          <div class="icon-arrow"><img src="../../../static/images/arrow-right.png"></div>
        </navigator>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: "傻兔不会跳",
            headPicUrl:
                "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg",
            adminList: [
                {
                    icon: "../../../static/images/my-income.png",
                    title: "我的收益",
                    pathTo: "myIncome"
                },
                {
                    icon: "../../../static/images/my-credibility.png",
                    title: "我的信誉",
                    pathTo: "myCredibility"
                },
                {
                    icon: "../../../static/images/withdraw.png",
                    title: "我要提现",
                    pathTo: "myWallet"
                },
                {
                    icon: "../../../static/images/my-information.png",
                    title: "我的消息",
                    pathTo: "myInformation"
                }
            ]
        };
    },
    methods: {
        jumpTo(path) {
            wx.navigateTo({
                url: `../${path}/main`
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.my-wrap {
  // 个人信息（头像和昵称）
  .admin-info {
    width: 750rpx;
    height: 340rpx;
    text-align: center;
    padding-top: 60rpx;

    .head-pic {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      margin: 0 auto;
      margin-bottom: 10rpx;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .username {
      font-size: 30rpx;
      font-weight: 400;
    }
  }

  // 功能列表
  .admin-list {
    .list-item {
      /* display: flex; */
      width: 662rpx;
      height: 120rpx;
      line-height: 120rpx;
      border-bottom: 2rpx solid #efeff4;
      padding: 0 44rpx;

      .icon {
        width: 35rpx;
        height: 40rpx;
        float: left;
        margin-top: 5rpx;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        float: left;
        margin-left: 30rpx;
      }

      .icon-arrow {
        width: 16rpx;
        height: 30rpx;
        float: right;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

