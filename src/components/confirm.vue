<template>
    <div class="mask" v-show='isShow'>
        <div class="content">
            <p class="close-box" @click='close'>×</p>
            <div class="contorol">
                <input type="number" placeholder="请输入手机号" placeholder-style="color:#999">
            </div>
            <div class="contorol">
                <input type="number" placeholder="请输入验证码" placeholder-style="color:#999">
                <span class="label" @click='getCode'>{{labelText}}</span>
            </div>
            <div class="btn-box">
                <button @click='send'>提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import {msg} from '../utils'
export default {
    data(){
        return{
            labelText:'获取验证码',
            isShow:false
        }
    },
    methods:{
        getCode(){
            if(this.timer){
                return
            }
            msg('验证码已发送，请注意查收');
            this.countDown = 60
            this.timer = setInterval(()=>{
                this.labelText = `${this.countDown} s`
                this.countDown--
                if(this.countDown < 0 ){
                    clearInterval(this.timer)
                    this.labelText = '重新获取'
                }
            },1000)
        },
        send(){
            this.$emit('send',true);
            this.close()
        },
        show(){
            this.isShow = true;
        },
        close(){
            this.isShow = false
        }
    }
}
</script>

<style lang="stylus" scoped>
.mask
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(0,0,0,.2)
    z-index 9999
    .content
        width 90%
        margin 100rpx auto 300rpx auto
        height 250rpx
        background #fff
        border 1rpx solid transparent
        border-raduis 10rpx
        .close-box
            text-align right
            font-size 34rpx
            padding 0 18rpx
            padding-top 10rpx
        .contorol
            height 50rpx
            margin 0rpx 25rpx
            border-bottom 1rpx solid #eee
            padding 0 25rpx
            position relative
            input
                height 50rpx
                line-height 50rpx
                font-size 14rpx
                width 70%
            .label
                position absolute
                height 50rpx
                line-height 50rpx
                padding-right 25rpx
                right 0
                top 0
                font-size 14rpx
                color  #479EF8
    .btn-box
        margin-top 30rpx
        text-align center
        button
            display inline-block
            width 100rpx
            height 40rpx
            border-radius 5rpx
            font-size 16rpx
            background  #479EF8
            color #fff
</style>

