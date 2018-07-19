<template>
  <div class="myIncome-wrap">
    <!-- 收益金额展示 -->
    <div class="account">
      <div class="bounty" v-text="sumBounty"></div>
      <span>累计收益额（元）</span>
    </div>
    <!-- 近期收益情况展示 -->
    <div class="recently-bounty">
      <div class="header">
        <span>近期收益情况</span>
        <div class="range-date">
          <picker mode="date" @change="startDateChange">
              {{startDate}}<i></i>
          </picker>
          <span>-</span>
          <picker mode="date" @change="endDateChange">
              {{endDate}}<i></i>
          </picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        sumBounty: 2345,
        startDate: '2018-01-01',
        endDate: '2018-02-01'
      }
    },
    computed: {
    },
    methods: {
      startDateChange(e){
        this.startDate = e.mp.detail.value
      },
      endDateChange(e){
        this.endDate = e.mp.detail.value
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .myIncome-wrap {
    // 收益金额展示
    .account {
      height: 198rpx;
      border-top: 2rpx solid #efeff4;
      border-bottom: 10rpx solid #efeff4;
      text-align: center;
      padding-top: 70rpx;
      .bounty {
        font-size: 60rpx;
        font-weight: 500;
        color: #000;
      }
      span {
        font-size: 20rpx;
      }
    }
    // 近期收益情况展示
    .recently-bounty {
      .header {
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 2rpx solid #efeff4;
        display: flex;
        justify-content: space-between;
        .range-date {
          display: flex;
          justify-content: space-between;
          picker {
            i {
              width: 0;
              height: 0;
              display: inline-block;
              border-left: 10rpx solid transparent;
              border-right: 10rpx solid transparent;
              border-top: 18rpx solid #333;
            }
          }
          span {
            margin: 0 20rpx;
          }
        }
      }
    }
  }
</style>

