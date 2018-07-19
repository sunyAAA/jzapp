<template>
	<div class="container">
		Canvas
		<canvas canvas-id="columnCanvas" class="canvas"></canvas>
		<button @click='change'>动态改变数据</button>
	</div>
</template>

<script>
/*
	@params   chartDate  Object  
					title  底部标题
					data   Y轴数据
					categories 	X轴数据
	@methods
			  change(Object)  接受一个新的数据对象  手动触发chartData赋值 和canvas重绘
*/
var wxCharts = require("./wxChart.js");
var columnChart = null;
export default {
    props: {
        chartData: {
            type: Object,
            default: function() {
                return {
					title: "每日收益",
					data: [15, 20, 45, 37,11],
					categories: ["07-01", "07-02", "07-03", "07-04","07-05"]
            	}
            }
		},
    },
    data() {
        return {
            isMainChartDisplay: true,
        };
    },
    mounted: function(e) {
        this.render(e);
    },
    methods: {
        change(newData) {
            //  模拟赋值
            newData =  { title:'新的数据表',data: [100, 120, 170, 160, 300], categories: ["07-06", "07-07", "07-08", "07-09","07-10"]}
            this.chartData = newData

            this.render();
        },
        render(e) {
            var windowWidth = 320;
            try {
                var res = wx.getSystemInfoSync();
                windowWidth = res.windowWidth;
            } catch (e) {
                console.error("getSystemInfoSync failed!");
            }

            columnChart = new wxCharts({
                canvasId: "columnCanvas",
                type: "column",
                animation: true,
                categories: this.chartData.categories,
                series: [
                    {
                        name: this.chartData.title,
                        data: this.chartData.data,
                        format: function(val, name) {
                            return val.toFixed(2) + "元";
                        },
                        color: "red" //每个柱子的颜色
                    }
                ],
                yAxis: {
                    format: function(val) {
                        // Y轴刻度
                        return val + "元";
                    },
                    min: 0,
                    gridColor: "red", //Y轴网格颜色
                    fontColor: "green", // Y轴字体颜色
                    titleFontColor: "yellow"
                },
                xAxis: {
                    disableGrid: false,
                    type: "calibration",
                    gridColor: "red", //X轴网格颜色
                    fontColor: "green" // X轴字体颜色
                },
                extra: {
                    column: {
                        width:25
                    },
                    legendTextColor: "red" //  文案颜色
                },
                width: windowWidth,
                height: 300
            });
        }
    }
};
</script>

<style scoped>
.canvas {
    width: 100%;
    height: 350rpx;
    margin-top: 40rpx;
}
</style>
