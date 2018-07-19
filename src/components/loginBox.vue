<template>
    <div class="box">
        <h2>寸金想要获得您的部分信息，请点击授权按钮</h2>
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">授权</button>
    </div>
</template>

<script>
import { _login, _loading, loginByUser } from "../utils";
export default {
    data() {
        return {};
    },
    mounted() {
        _login(res => {
            checkNewHands(res)
        });
    },
    methods: {
        getUserInfo(e) {
            _loading("加载中...");
            var res = e.mp.detail.userInfo;
            loginByUser(res, res => {
                if (res) {
                    this.userInfo = res;
                    wx.setStorageSync("userInfo", res);
                }
            });
        },
        goBindPhone() {
            wx.redirectTo({ url: "../../pages/telRegister/main" });
        },
        checkNewHands(){
            if (res) {
                if (!res.phone) {
                    // 如果没有绑定手机号  走手机绑定流程
                    this.goBindPhone();
                }
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.box {
    display: fixed;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 100rpx 0;

    h2 {
        font-size: 14rpx;
        text-align: center;
        margin-bottom: 35rpx;
    }

    button {
        width: 50%;
        margin: 0 auto;
        background: #ff4b2b;
        border: none;
        color: #fff;
    }
}
</style>


