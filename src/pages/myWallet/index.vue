<template>
  <div class="myWallet-wrap">
    <div class="icon-box-rect">
      <img src="../../../static/images/icon-wallet.png" alt="">
    </div>
    <p class="title">我的钱包</p>
    <p class="money">
      <span class="unit">￥</span>
      0.00
    </p>
    <div class="blank"></div>
    <p class="left">申请提现（元）</p>
    <div class="box">
      <p class="unit">￥</p>
      <div class="ctrol"><input type="number" v-model="money" placeholder="请输入提现金额（整数）"
                                placeholder-style="color:#999;font-size:12rpx"
      ></div>
      <p class="desc">全部提现</p>
    </div>
    <div class="ye-box" @click='goMoneyDetail'>
      余额明细   <span class="arrow">></span>
    </div>
    <button class="btn" @click='take'>申请提现</button>
    <confirm ref='conf' @send='catchSend'></confirm>
  </div>
</template>

<script>
  import confirm from '../../components/confirm'
  export default {
    components:{confirm},
    data(){
      return {
        money:null,
      }
    },
    methods:{
      goMoneyDetail(){
        wx.navigateTo({ url: '../../pages/moneyDetailed/main' });
      },
      catchSend(state){
      },
      take(){
        this.$refs.conf.show()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .icon-box-rect
    width 88rpx
    height 105rpx
    overflow hidden
    margin 20rpx auto
    &>img
      width 100%
      height 100%
      object-fit cover
  .title
    text-align center
    padding 10rpx
  .money
    text-align center
    font-size 40rpx
    font-weight bold
    transform translate(0,0)
    .unit
      font-size 20rpx
      vertical-align top
  .blank
    margin-top 44rpx
    height 1rpx
    background #eee
  .left
    padding 10rpx 15rpx
    font-size 14rpx
  .box
    display flex
    align-items flex-end
    padding-bottom 20rpx
    border-bottom 1rpx solid #eee
    .unit
      flex 0 0 44rpx
      padding-left 30rpx
      font-size 26rpx
      font-weight bold
    .ctrol
      flex 1
      input
        text-align center
        font-size 26rpx
    .desc
      flex 0 0 60rpx
      padding-right 20rpx
      font-size 12rpx
      transform translate(0,-35%)
      color #3743B2
  .ye-box
    height 60rpx
    padding 0 30rpx
    line-height 60rpx
    font-size 14rpx
    border-bottom 1rpx solid #eee
    .arrow
      font-weight bold
      float right
  .btn
    width 70%
    margin 0 auto
    height 40rpx
    line-height 40rpx
    color #fff
    background #479EF8
    margin-top 30rpx
</style>
