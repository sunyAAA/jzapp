<template>
  <div class="telRegister-wrap">
    <div class="form">
      <!-- 输入手机号 -->
      <div class="tel-number">
        <div class="icon"></div>
        <input type="text" placeholder="请输入手机号">
      </div>
      <!-- 获取验证码 -->
      <div class="code">
        <div class="icon"></div>
        <input type="text" placeholder="请输入验证码">
        <div class="get" @click="getCode" v-text="labelText"></div>
      </div>
    </div>
    <div class="btn-next" @click="nextStep">下一步</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            labelText: "获取验证码"
        };
    },
    methods: {
        getCode() {
            //        msg('验证码已发送，请注意查收');
            if (this.timer) {
                return;
            }
            this.countDown = 60;
            this.timer = setInterval(() => {
                this.labelText = `${this.countDown} s`;
                this.countDown--;
                if (this.countDown < 0) {
                    clearInterval(this.timer);
                    this.labelText = "重新获取";
                }
            }, 1000);
        },
        nextStep() {
            console.log("下一步");
        }
    }
};
</script>

<style lang="stylus" scoped>
.telRegister-wrap {
  .form {
    // 输入手机号
    .tel-number {
      height: 100rpx;
      border-top: 2rpx solid #efeff4;
      border-bottom: 2rpx solid #efeff4;
      padding: 0 40rpx;

      .icon {
        width: 33rpx;
        height: 48rpx;
        background-color: red;
        margin-right: 40rpx;
        float: left;
        margin-top: 28rpx;
      }

      input {
        height: 100%;
        font-size: 30rpx;
        color: #999;
        float: left;
      }
    }

    // 获取验证码
    .code {
      height: 100rpx;
      border-bottom: 2rpx solid #efeff4;
      padding: 0 40rpx;

      .icon {
        width: 39rpx;
        height: 41rpx;
        background-color: green;
        float: left;
        margin-top: 28rpx;
        margin-right: 34rpx;
      }

      input {
        height: 100%;
        font-size: 30rpx;
        color: #999;
        float: left;
      }

      .get {
        float: right;
        width: 205rpx;
        height: 63rpx;
        line-height: 63rpx;
        background-color: #ff4b2b;
        color: #fff;
        font-size: 30rpx;
        text-align: center;
        border-radius: 10rpx;
        margin-top: 20rpx;
      }
    }
  }

  .btn-next {
    width: 630rpx;
    height: 80rpx;
    line-height: 80rpx;
    margin: 200rpx auto 0;
    background-color: #ff4b2b;
    text-align: center;
    color: #fff;
    font-size: 30rpx;
    border-radius: 10rpx;
  }
}
</style>

