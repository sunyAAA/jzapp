<template>
    <div class="box">
        <h2>存金想要获得您的信息，请点击授权按钮</h2>
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
    </div>
</template>

<script>
import { _login } from "../utils";
export default {
    data() {
        return {};
    },
    mounted() {
        _login(res => {
            console.log(res);
        });
    },
    mothods: {
        getUserInfo(e) {
            _loading("加载中...");
            var res = e.mp.detail.userInfo;
            loginByUser(res, res => {
                if (res) {
                    this.isLogin = true;
                    this.userInfo = res;
                    wx.setStorageSync("userInfo", res);
                    wx.showTabBar();
                    this.getIndexDate();
                }
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.box {
    display fixed
    top 0 
    left  0 
    right  0 
    bottom  0 
    padding  100px 0
}
</style>


