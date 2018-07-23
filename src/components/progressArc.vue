<template>
    <view class='content'>
        <canvas canvas-id='bgCanvas' class='canvasI'></canvas>
    </view>
</template>

<script>
const ctx = wx.createCanvasContext("bgCanvas"); //创建一个全局的canvas绘图上下文
const color = "#fc5833";
export default {
    props: {
        score: {
            type: Number,
            default: 0
        }
    },
    methods: {
        // run(e) {
        //     let src = this.src; //每个间隔所需绘制的弧度
        //     let allSrc = this.allSrc; //总共需要绘制的弧度
        //     n += 5;
        //     if (src * n > allSrc) {
        //         clearInterval(this.mytime); //如果绘制完成，停掉计时器，绘制结束
        //         n = 0;
        //         return;
        //     }
        //     let grade = Math.round(src * n / 1.5 * 100); //百分数
        //     ctx2.arc(this.ctxW, this.ctxH, 75, 0, (0.75 + src * n) * Math.PI); //每个间隔绘制的弧度
        //     ctx2.setStrokeStyle("#97F7D0");
        //     ctx2.setLineWidth("8");
        //     ctx2.setLineCap("round");
        //     ctx2.stroke();
        //     ctx2.beginPath();
        //     ctx2.setFontSize(16); //注意不要加引号
        //     ctx2.setFillStyle(color);
        //     ctx2.setTextAlign("center");
        //     ctx2.setTextBaseline("middle");
        //     ctx2.fillText(grade + "%", this.ctxW, 170);
        //     ctx2.draw();
        // },
        // do() {
        //     clearInterval(this.mytime);
        //     this.mytime = setInterval(this.run, 50);
        // }
        
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */

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
                ctx.arc(40, 40, 10, 0, 0.5 * Math.PI, true);
                ctx.setFillStyle(color);
                ctx.fill();
                ctx.setFillStyle('#fff')
                ctx.setFontSize('12')
                ctx.fillText('1',37,42)
                ctx.setFillStyle('#333')
                ctx.setFontSize('16')
                ctx.fillText('信誉说明',48,57)
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
                ctx.arc(320, 60, 10, 0, 0.5 * Math.PI, true);
                ctx.setFillStyle(color);
                ctx.fill();
                ctx.setFillStyle('#fff')
                ctx.setFontSize('12')
                ctx.fillText('3',317,62)
                ctx.setFillStyle('#333')
                ctx.setFontSize('16')
                ctx.fillText('提升信誉',328,77)
                ctx.beginPath();
                ctx.setFillStyle('#000')
                ctx.fillText('优秀信誉',this.ctxW-32,this.ctxH-20);
                ctx.draw(); //开始绘制
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
    width: 400rpx;
    height: 400rpx;
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
