<template>
  <div class="my-wrap">
    <!-- 个人信息（头像和昵称） -->
    <div class="admin-info">
        <div class="head-pic">
          <img :src="headPicUrl" alt="用户头像">
        </div>
        <div class="username" v-text="username"></div>
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
            username: "",
            headPicUrl: "",
            adminList: [
                {
                    icon: require("../../../static/images/my-income.png"),
                    title: "我的收益",
                    pathTo: "myIncome"
                },
                {
                    icon: require("../../../static/images/my-credibility.png"),
                    title: "我的信誉",
                    pathTo: "myCredibility"
                },
                {
                    icon: require("../../../static/images/withdraw.png"),
                    title: "我要提现",
                    pathTo: "myWallet"
                },
                {
                    icon: require("../../../static/images/my-information.png"),
                    title: "我的消息",
                    pathTo: "myInformation"
                }
            ]
        };
    },
    mounted() {
        let info = wx.getStorageSync("userInfo");
        this.username = info.nickName;
        this.headPicUrl = info.avatarUrl;
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

