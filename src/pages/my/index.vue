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
        <div class="list-item" v-for="(item, index) in adminList" :key="index">
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
  data(){
    return {
      username: '傻兔不会跳',
      headPicUrl: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      adminList: [
        {
          icon: '../../../static/images/my-income.png',
          title: '我的收益',
          pathTo: '../myIncome/main'
        },
        {
          icon: '../../../static/images/my-credibility.png',
          title: '我的信誉',
          pathTo: '../myCredibility/main'
        },
        {
          icon: '../../../static/images/withdraw.png',
          title: '我要提现',
          pathTo: '../myWallet/main'
        },
        {
          icon: '../../../static/images/my-information.png',
          title: '我的消息',
          pathTo: '../myInformation/main'
        },
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .my-wrap {
    // 个人信息（头像和昵称）
    .admin-info {
      width: 750px;
      height: 340px;
      text-align: center;
      padding-top: 60px;
      .head-pic {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin: 0 auto;
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .username {
        font-size: 30px;
        font-weight: 400;
      }
    }
    // 功能列表
    .admin-list {
      .list-item {
        /*display: flex;*/
        width: 662px;
        height: 120px;
        line-height: 120px;
        border-bottom: 2px solid #efeff4;
        padding: 0 44px;
        .icon {
          width: 35px;
          height: 40px;
          float: left;
          margin-top: 5px
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title {
          float: left;
          margin-left: 30px;
        }
        .icon-arrow {
          width: 16px;
          height: 30px;
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

