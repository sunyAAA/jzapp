<template>
	<div class="task-card" @click="goDetail">
		<!--<li v-for="(item, index) in tasksArr" :key="index"  @click="goToDetail()">-->
		<div class="card-item" v-if='curItem'>
			<!-- 类型标记 -->
			<div class="type-flag">
				<div class="flag" v-text="curItem.title || ''"></div>
			</div>

			<!-- 任务内容 -->
			<div class="task-content">
				<div class="publisher">发送时间：
					<span v-text="curItem.time||''"></span>
				</div>
				<div class="time-limit">{{curItem.content || ''}}</div>
			</div>

		</div>
	</div>
</template>

<script>
import { timestampToDate } from '../utils';
export default {
    data() {
        return {};
    },
    props: {
        item: {
            type: Object
        },
        noJump: {
            type: Boolean,
            default: false
        },
        current:{type:Number,default:0}
    },
    computed:{
      curItem(){
          this.item.time = timestampToDate(this.item.sendTime,'Y-m-d');
          return this.item
      }
    }
};
</script>

<style lang="stylus" scoped>
// 任务列表卡片
.task-card {
	padding-bottom: 20rpx;

	.card-item {
		background-color: #efeff4;
		padding: 0 30rpx;
		width: 610rpx;
		height: 220rpx;
		margin: 0 auto;
		border-radius: 12rpx;
		margin-bottom: 16rpx;
    display: flex;

		// 类型标记
		.type-flag {
			flex:0 0 90rpx;

			.flag {
				width: 38rpx;
				height: 70rpx;
				background-color: #ff4b2b;
				font-size: 18rpx;
				color: #fff;
				padding: 10rpx 6rpx 0 6rpx;
				text-align: center;
				position: relative;
				line-height: 20rpx;
			}

			.flag:after {
				content: '';
				display: block;
				width: 0;
				height: 0;
				border-left: 25rpx solid transparent;
				border-right: 25rpx solid transparent;
				border-bottom: 20rpx solid #efeff4;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}

		// 任务内容
		.task-content {
      padding-top:30px;
			flex:1;

			.title {
				font-size: 30rpx;
				font-weight: 500;
				margin: 25rpx 0 30rpx;
			}

			.publisher {
				font-size: 20rpx;
				margin-bottom: 10rpx;
			}

			.time-limit {
				font-size: 20rpx;
				margin-bottom: 10rpx;
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        overflow:hidden;
			}
		}

		// 任务赏金
		.task-bounty {
			font-size: 30rpx;
			color: #ff4b2b;
			float: right;
			line-height: 180rpx;

			span {
				font-size: 60rpx;
			}
		}
	}

	.card-item:last-child {
		margin-bottom: 0;
	}
}
</style>

