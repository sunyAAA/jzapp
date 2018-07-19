<template>
  <div class="telRegister-wrap">
    <div class="form">
      <!-- 输入手机号 -->
      <div class="tel-number">
        <div class="icon"></div>
        <input type="Number" placeholder="请输入手机号" v-model="phone">
      </div>
      <!-- 获取验证码 -->
      <div class="code">
        <div class="icon"></div>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <div class="get" @click="getCode" v-text="labelText"></div>
      </div>
    </div>
    <div class="btn-next" @click="nextStep">下一步</div>
  </div>
</template>

<script>
import {bindPhone,getPhoneCode} from '../../api'
import {msg} from '../../utils'
export default {
    data() {
        return {
            labelText: "获取验证码",
            phone:'',
            code:''
        };
    },
    methods: {
        getCode() {
            if (this.timer) {
                return;
			}
			if(this.phone.match(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)){
				getPhoneCode({phone:this.phone,type:1}).then(res=>{
					if(res.code == 1){
						msg('验证码已发送，请注意查收');
						this.countDown = 60;
						this.timer = setInterval(() => {
							this.labelText = `${this.countDown} s`;
							this.countDown--;
							if (this.countDown < 0) {
								clearInterval(this.timer);
								this.labelText = "重新获取";
							}
						}, 1000);
					}else{
						msg('发送失败，请稍后再试');
					}
				})
            }else{
              msg('请输入正确的手机号')
            }

        },
        nextStep() {
            if(this.phone.match(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/)){
                if(!this.code ){
                  msg('请输入验证码');
                  return;
                }
                bindPhone({phone:this.phone,code:this.code}).then(res=>{
                  if(res.code == 1){
					  wx.redirectTo('../../pages/adminData/main')
                  }
                })
            }else{
              msg('请输入正确的手机号')
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.telRegister-wrap {
  .form {
    // 输入手机号
    .tel-number {
      height: 100px;
      border-top: 2px solid #efeff4;
      border-bottom: 2px solid #efeff4;
      padding: 0 40px;

      .icon {
        width: 33px;
        height: 48px;
        background-color: red;
        margin-right: 40px;
        float: left;
        margin-top: 28px;
      }

      input {
        height: 100%;
        font-size: 30px;
        color: #999;
        float: left;
      }
    }

    // 获取验证码
    .code {
      height: 100px;
      border-bottom: 2px solid #efeff4;
      padding: 0 40px;

      .icon {
        width: 39px;
        height: 41px;
        background-color: green;
        float: left;
        margin-top: 28px;
        margin-right: 34px;
      }

      input {
        height: 100%;
        font-size: 30px;
        color: #999;
        float: left;
      }

      .get {
        float: right;
        width: 205px;
        height: 63px;
        line-height: 63px;
        background-color: #ff4b2b;
        color: #fff;
        font-size: 30px;
        text-align: center;
        border-radius: 10px;
        margin-top: 20px;
      }
    }
  }

  .btn-next {
    width: 630px;
    height: 80px;
    line-height: 80px;
    margin: 200px auto 0;
    background-color: #ff4b2b;
    text-align: center;
    color: #fff;
    font-size: 30px;
    border-radius: 10px;
  }
}
</style>

