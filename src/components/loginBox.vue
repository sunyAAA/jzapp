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
    methods: {
        getUserInfo(e) {
            _loading("加载中...");
            var u = e.mp.detail.userInfo;
            loginByUser(u, res => {
                if (res) {
                    this.userInfo = res;
                    wx.setStorageSync("userInfo", res);
                    this.$emit('succ')
                }else{
                    msg('登录失败，请稍后再试')
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
    padding: 100px 0;

    h2 {
        font-size: 14px;
        text-align: center;
        margin-bottom: 35px;
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


