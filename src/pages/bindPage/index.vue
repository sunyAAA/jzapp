<template>
    <div class="telRegister-wrap">
        <div class="form">
            <!-- 输入手机号 -->
            <div class="tel-number">
                <input type="Number" placeholder="请输入微信号" v-model="accountNo">
            </div>
            <div class="tel-number">
                <input type="Number" placeholder="请输入收款人姓名" v-model="name">
            </div>
        </div>
        <div class="btn-next" @click="send">完成</div>
    </div>
</template>

<script>
import { bindWx } from "../../api";
import { msg, showSucc } from "../../utils";
export default {
    data() {
        return {
            labelText: "获取验证码",
            accountNo: "",
            name: ""
        };
    },
    methods: {
        send() {
            if (!this.accountNo || !this.name) {
                msg("请将表单填写完整");
                return;
            }
            bindWx(this.name, this.accountNo).then(res => {
                if (res.code == 1) {
                    showSucc("绑定成功");
                    setTimeout(() => {
                        wx.navigateBack({ delta: 1 });
                    }, 800);
                } else {
                    msg("绑定失败，请稍后再试");
                }
            });
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

            .icon {
                width: 33rpx;
                height: 48rpx;
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
            padding: 20rpx 40rpx;

            .icon {
                width: 39rpx;
                height: 41rpx;
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

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

