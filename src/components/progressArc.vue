<template>
    <view class='content'>
        <canvas canvas-id='bgCanvas' class='canvasI'></canvas>
 <canvas canvas-id="runCanvas" class='canvasII'></canvas>  

    </view>
</template>

<script>
const ctx = wx.createCanvasContext("bgCanvas"); //创建一个全局的canvas绘图上下文
const ctx2 = wx.createCanvasContext("runCanvas");  

const color = "#fc5833";
export default {
    props: {
        score: {
            type: Number,
            default: 0
        }
    },
    methods: {
        show(score){
            ctx2.setFillStyle('#000')
            ctx2.setFontSize('18')
            ctx2.fillText(score,this.ctxW-24,this.ctxH+24);
            ctx2.fill()
            ctx2.draw()
        }
    },
    onReady: function() {
        wx.getSystemInfo({
            //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
            success: res => {
                var width = res.windowWidth;
                var height = res.windowHeight;
                this.ctxW = width / 2;
                this.ctxH = 125;
                ctx.arc(this.ctxW, this.ctxH, 64, 0, 2 * Math.PI); //绘制圆形弧线         小圆
                ctx.setStrokeStyle(color); //设置填充线条颜色
                ctx.setLineWidth("12"); //设置线条宽度
                ctx.setLineCap("round"); //设置线条端点样式
                ctx.stroke(); //对路径进行描边，也就是绘制线条。
                ctx.beginPath();
                ctx.arc(this.ctxW, this.ctxH, 84, 0, 2 * Math.PI); //绘制圆形弧线         大圆
                ctx.setStrokeStyle(color); //设置填充线条颜色
                ctx.setLineWidth("2"); //设置线条宽度
                ctx.setLineCap("round"); //设置线条端点样式
                ctx.stroke(); //对路径进行描边，也就是绘制线条。
                ctx.beginPath();
                ctx.arc(this.ctxW + 84, this.ctxH, 5, 0, 2 * Math.PI); //绘制圆形弧线       右边的球
                ctx.setFillStyle(color);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.ctxW - 84, this.ctxH, 5, 0, 2 * Math.PI); //绘制圆形弧线       左边的球
                ctx.setFillStyle(color);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.ctxW*.2, 40, 10, 0, 0.5 * Math.PI, true);
                ctx.setFillStyle(color);
                ctx.fill();
                ctx.setFillStyle('#fff')
                ctx.setFontSize('12')
                ctx.fillText('1',this.ctxW*.2-3,42)
                ctx.setFillStyle('#333')
                ctx.setFontSize('16')
                ctx.fillText('信誉说明',this.ctxW*.2+8,57)
                ctx.beginPath()
                ctx.arc(120, 220, 10, 0, 0.5 * Math.PI, true);
                ctx.setFillStyle(color);
                ctx.fill();
                ctx.setFillStyle('#fff')
                ctx.setFontSize('12')
                ctx.fillText('2',117,222)
                ctx.setFillStyle('#333')
                ctx.setFontSize('16')
                ctx.fillText('信誉特权',128,237)
                ctx.beginPath()
                ctx.arc(this.ctxW*1.5, 60, 10, 0, 0.5 * Math.PI, true);
                ctx.setFillStyle(color);
                ctx.fill();
                ctx.setFillStyle('#fff')
                ctx.setFontSize('12')
                ctx.fillText('3',this.ctxW*1.5-3,62)
                ctx.setFillStyle('#333')
                ctx.setFontSize('16')
                ctx.fillText('提升信誉',this.ctxW*1.5+8,77)
                ctx.beginPath();
                ctx.setFillStyle('#000')
                ctx.fillText('优秀信誉',this.ctxW-32,this.ctxH-20);
                ctx.draw(); //开始绘制


                this.show(1992)
            }
        });
    },
    watch: {
        score(val) {
            if (val) {
                this.do();
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.content {
    width: 100%;
    height: 560rpx;
    margin: 0 auto;
    position: relative;
}

.canvasI {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0 8rpx;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto auto;
}

.canvasII {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 0 8rpx;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto auto;
}

.btn {
    position: absolute;
    width: 200rpx;
    bottom: 30rpx;
    left: 0;
    right: 0;
    margin: 0 auto;
}
</style>
