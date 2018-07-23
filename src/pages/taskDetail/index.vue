<template>
	<div class="taskDetail-wrap">
		<!-- 任务简介和操作 -->
		<div class="information-operate">
			<div class="info">
				<!-- 任务内容 -->
				<div class="info-content">
					<div class="type" v-text="taskData.type"></div>
					<div class="title">发布商家：
						<span v-text="taskData.publisher"></span>
					</div>
					<div class="time">
						任务时间：
						<span v-text="taskData.startTime"></span> 至
						<span v-text="taskData.endTime"></span>
					</div>
					<div class="duration-time">
						任务时长：
						<span v-text="taskData.durationTime"></span>
					</div>
				</div>
				<!-- 赏金和时间 -->
				<div class="bounty-countdown">
					<div class="bounty">¥
						<span v-text="taskData.bounty"></span>
					</div>
					<div class="countdown" v-text="taskData.countdown"></div>
				</div>
			</div>
			<div class="operate" v-show='!complete'>
				<!-- 领取按钮 -->
				<div class="btn-receive" v-if="!receiveFlag" @click="receive">领取</div>
				<!-- 提交凭证和放弃按钮 -->
				<div class="btn-group" v-else>
					<div class="btn-submit" @click="submit">提交凭证</div>
					<div class="give-up" @click="giveUp">放弃</div>
				</div>
			</div>
		</div>
		<!-- 任务描述、任务说明、任务列表 -->
		<div :class="['task',{ 'received': receiveFlag } ]" v-show="!task">
			<!-- 任务导航 -->
			<div class="task-nav">
				<div class="nav-item" :class="[ currentTab == 0 ? 'current' : '' ]" @click="toggleNav(0)">任务描述</div>
				<div class="nav-item" :class="[ currentTab == 1 ? 'current' : '' ]" @click="toggleNav(1)">任务说明</div>
				<div class="nav-item" :class="[ currentTab == 2 ? 'current' : '' ]" @click="toggleNav(2)">任务列表</div>
			</div>
			<!-- 任务内容 -->
			<div class="task-content">
				<div class="content-item task-desc" v-show="currentTab == 0">
					<p>{{taskData.descriptionm}}</p>
				</div>
				<div class="content-item task-detail" v-show="currentTab == 1">
					<p>{{taskData.illustrate}}</p>
				</div>
				<div class="content-item task-list" v-show="currentTab == 2">
					<task-card v-if='taskList.length' v-for="(item,index) in taskList" :item='item' :key="index" :no-jump="true"></task-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import taskCard from "../../components/taskCard";
import { getTaskDetail,takeTask } from "../../api";
import { formartTaskDetail, formTask } from "../../model";
import {errBack} from '../../utils'
export default {
    components: {
        taskCard
    },
    data() {
        return {
            receiveFlag: false,
            currentTab: 0,
            taskList: [],
			taskData: {},
			complete:false
        };
    },
    async onLoad(options) {
		this.taskId = options.taskId;
        if (this.taskId) {
            let data = (await getTaskDetail({ taskId: this.taskId ,userId})).data;
            this.taskData = formartTaskDetail(data.missionTask);
			this.taskList = formTask(data.detail);
			if(this.taskData.userStatus == 2){
				this.receiveFlag = true;
			}else if (this.taskData.userStatus == 4){
				this.complete = true;
			}
        }else{
			errBack()
		}
	},
    methods: {
        receive() {
            this.receiveFlag = true;
        },
        submit() {
            //        this.receiveFlag = true;
        },
        giveUp() {
            this.receiveFlag = false;
        },
        toggleNav(n) {
            this.currentTab = n;
        }
    }
};
</script>

<style lang="stylus" scoped>
.taskDetail-wrap {
	// 任务简介和操作
	.information-operate {
		border-top: 2rpx solid #efeff4;
		border-bottom: 2rpx solid #efeff4;
		padding: 40rpx 40rpx 30rpx;
		position: relative;

		.info {
			display: flex;
			justify-content: space-between;

			// 任务内容
			.info-content {
				.type {
					font-size: 30rpx;
				}

				.title, .time, .duration-time {
					font-size: 22rpx;
					/* line-height: 40rpx; */
					margin-top: 10rpx;
				}
			}

			// 赏金和时间
			.bounty-countdown {
				color: #ff4b2b;
				text-align: right;

				.bounty {
					font-size: 22rpx;

					span {
						font-size: 40rpx;
					}
				}

				.countdown {
					font-size: 22rpx;
				}
			}
		}

		.operate {
			// 领取按钮
			.btn-receive {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #ff4b2b;
				color: #fff;
				font-size: 22rpx;
				text-align: center;
				line-height: 100rpx;
				position: absolute;
				bottom: -50rpx;
				right: 40rpx;
			}

			// 提交凭证和放弃按钮
			.btn-group {
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;

				.btn-submit, .give-up {
					width: 160rpx;
					height: 50rpx;
					border-radius: 8rpx;
					font-size: 30rpx;
					text-align: center;
					line-height: 50rpx;
					background-color: #ff4b2b;
					color: #fff;
				}

				.give-up {
					background-color: #fff;
					border: 2rpx solid #ff4b2b;
					color: #333;
					margin-left: 30rpx;
				}
			}
		}
	}

	// 任务描述、任务说明、任务列表
	.task {
		padding: 60rpx 40rpx 0;

		// 导航栏
		.task-nav {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.nav-item {
				font-size: 30rpx;
			}

			.current {
				color: #ff4b2b;
			}
		}

		// 任务内容
		.task-content {
			.content-item {
				font-size: 22rpx;
			}


			.task-desc, .task-detail {
				p {
					line-height: 48rpx;
				}
			}
		}
	}

	.received {
		padding-top: 30rpx;
	}
}
</style>
<style lang="stylus">
.taskDetail-wrap {
	// 任务简介和操作
	.information-operate {
		border-top: 2rpx solid #efeff4;
		border-bottom: 2rpx solid #efeff4;
		padding: 40rpx 40rpx 30rpx;
		position: relative;

		.info {
			display: flex;
			justify-content: space-between;

			// 任务内容
			.info-content {
				.type {
					font-size: 30rpx;
				}

				.title, .time, .duration-time {
					font-size: 22rpx;
					/* line-height: 40rpx; */
					margin-top: 10rpx;
				}
			}

			// 赏金和时间
			.bounty-countdown {
				color: #ff4b2b;
				text-align: right;

				.bounty {
					font-size: 22rpx;

					span {
						font-size: 40rpx;
					}
				}

				.countdown {
					font-size: 22rpx;
				}
			}
		}

		.operate {
			// 领取按钮
			.btn-receive {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #ff4b2b;
				color: #fff;
				font-size: 22rpx;
				text-align: center;
				line-height: 100rpx;
				position: absolute;
				bottom: -50rpx;
				right: 40rpx;
			}

			// 提交凭证和放弃按钮
			.btn-group {
				display: flex;
				justify-content: flex-end;
				margin-top: 30rpx;

				.btn-submit, .give-up {
					width: 160rpx;
					height: 50rpx;
					border-radius: 8rpx;
					font-size: 30rpx;
					text-align: center;
					line-height: 50rpx;
					background-color: #ff4b2b;
					color: #fff;
				}

				.give-up {
					background-color: #fff;
					border: 2rpx solid #ff4b2b;
					color: #333;
					margin-left: 30rpx;
				}
			}
		}
	}

	// 任务描述、任务说明、任务列表
	.task {
		padding: 60rpx 40rpx 0;

		// 导航栏
		.task-nav {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.nav-item {
				font-size: 30rpx;
			}

			.current {
				color: #ff4b2b;
			}
		}

		// 任务内容
		.task-content {
			.content-item {
				font-size: 22rpx;
			}

			.task-desc, .task-detail {
				p {
					line-height: 48rpx;
				}
			}
		}
	}

	.received {
		padding-top: 30rpx;
	}
}
</style>
