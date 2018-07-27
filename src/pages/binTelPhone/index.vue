<template>
	<div class="telRegister-wrap">
		<div class="form">
			<!-- 输入手机号 -->
			<div class="tel-number">
				<div class="icon">
					<img src="../../../static/images/icon-phone.png" alt="">
				</div>
				<input type="Number" placeholder="请输入手机号" v-model="phone">
			</div>
			<!-- 获取验证码 -->
			<div class="code">
				<div class="icon"><img src="../../../static/images/icon-code.png" alt=""></div>
				<input type="text" placeholder="请输入验证码" v-model="code">
				<div class="get" @click="getCode" v-text="labelText"></div>
			</div>
		</div>
		<div class="btn-next" @click="nextStep">完成</div>
	</div>
</template>

<script>
import { bindPhone, getPhoneCode } from "../../api";
import { msg, showSucc } from "../../utils";
export default {
    data() {
        return {
            labelText: "获取验证码",
            phone: "",
            code: ""
        };
    },
    methods: {
        getCode() {
            if (this.timer) {
                return;
            }
            if (
                this.phone.match(
                    /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
                )
            ) {
                getPhoneCode({ phone: this.phone, type: 1 }).then(res => {
                    if (res.code == 1) {
                        msg("验证码已发送，请注意查收");
                        this.countDown = 60;
                        this.timer = setInterval(() => {
                            this.labelText = `${this.countDown} s`;
                            this.countDown--;
                            if (this.countDown < 0) {
                                clearInterval(this.timer);
                                this.labelText = "重新获取";
                            }
                        }, 1000);
                    } else {
                        msg("发送失败，请稍后再试");
                    }
                });
            } else {
                msg("请输入正确的手机号");
            }
        },
        nextStep() {
            if (
                this.phone.match(
                    /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
                )
            ) {
                if (!this.code) {
                    msg("请输入验证码");
                    return;
                }
                bindPhone({ phone: this.phone, code: this.code }).then(res => {
                    if (res.code == 1) {
                        showSucc("绑定成功");
                        setTimeout(() => {
                            wx.navigateBack({ delta: 1 });
                        }, 800);
                    } else {
                        msg(res.msg);
                    }
                });
            } else {
                msg("请输入正确的手机号");
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
			height: 100rpx;
			border-bottom: 2rpx solid #efeff4;
			padding: 20rpx 40rpx;
			display flex

			.icon {
				flex 0 0  33rpx;
				height: 48rpx;
				margin-right: 40rpx;
				float: left;
				margin-top: 28rpx;
			}

			input {
				flex 1
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
			padding: 20rpx 40rpx;
			display: flex;

			.icon {
				flex: 0 0 39rpx;
				height: 41rpx;
				float: left;
				margin-top: 28rpx;
				margin-right: 34rpx;
			}

			input {
				flex: 1;
				height: 100%;
				font-size: 30rpx;
				color: #999;
				float: left;
			}

			.get {
				flex: 0 0 205rpx;
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

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>

