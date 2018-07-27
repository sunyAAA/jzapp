<template>
	<div class="taskDetail-wrap">
		<!-- 任务简介和操作 -->
		<div class="information-operate">
			<div class="info">
				<!-- 任务内容 -->
				<div class="info-content">
					<div class="type" v-text="curTaskDetail.name"></div>
					<div class="title">发布商家：
						<span v-text="curTaskDetail.publisher"></span>
					</div>
					<div class="time">
						任务时间：
						<span v-text="curTaskDetail.startTime"></span> 至
						<span v-text="curTaskDetail.endTime"></span>
					</div>
					<div class="duration-time" v-if="!showCountDown">
						任务时长：
						<span v-text="curTaskDetail.taskTime"></span>
					</div>
					<div class="count-down duration-time" v-else>
						倒计时：
						<span>{{countDownText}}</span>
					</div>
				</div>
				<!-- 赏金和时间 -->
				<div class="bounty-countdown">
					<div class="bounty">¥
						<span v-text="curTaskDetail.bounty"></span>
					</div>
					<div class="countdown" v-text="'预计耗时'+curTaskDetail.preTime"></div>
				</div>
			</div>
			<div class="operate" v-show='!complete'>
				<!-- 领取按钮 -->
				<div class="btn-receive" v-if="!receiveFlag" @click="receive">领取</div>
				<!-- 提交凭证和放弃按钮 -->
				<div class="btn-group" v-else>
					<div class="btn-submit" @click="submit">提交凭证</div>
					<div class="give-up" @click="giveUp" v-show="!isNew">放弃</div>
				</div>
			</div>
		</div>
		<!-- 任务描述、任务说明、任务列表 -->
		<div :class="['task',{ 'received': receiveFlag } ]" v-show="!task">
			<!-- 任务导航 -->
			<div class="task-nav">
				<div class="nav-item" :class="[ currentTab == 0 ? 'current' : '' ]" @click="toggleNav(0)">任务描述</div>
				<div class="nav-item" :class="[ currentTab == 1 ? 'current' : '' ]" @click="toggleNav(1)">任务说明</div>
				<!-- <div class="nav-item" :class="[ currentTab == 2 ? 'current' : '' ]" @click="toggleNav(2)">任务列表</div> -->
			</div>
			<!-- 任务内容 -->
			<div class="task-content">
				<div class="content-item task-desc" v-show="currentTab == 0">
					<scroll-view scroll-x style="width:350px">
						<rich-text class="text-box" :nodes='curTaskDetail.description'></rich-text>
					</scroll-view>
				</div>
				<div class="content-item task-detail" v-show="currentTab == 1">
					<scroll-view scroll-x style="width:350px">

					<rich-text class="text-box" :nodes='curTaskDetail.illustrate'></rich-text>
					</scroll-view>

				</div>
				<!-- <div class="content-item task-list" v-show="currentTab == 2">
					<task-card v-if="curTask" :item='curTask' :no-jump="true"></task-card>
					<div v-else class="no-result">
						没有更多内容了
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import taskCard from "../../components/taskCard";
import { getTaskDetail, takeTask, giveUpTask } from "../../api";
import { formartTaskDetail, formTask,fixImg,diffTime } from "../../model";
import { errBack, showSucc, msg, _loading, showModel } from "../../utils";
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
            complete: null,
			isNew: false,
			showCountDown:false,
			countDownText:''
        };
    },
    onLoad(options) {
        this.taskId = options.taskId;
    },
    mounted() {
		this.getTaskData();
		this.taskList = [];
		
	},
	onUnLoad(){
		console.log('--')
		clearInterval(this.timer);
		this.timer= null;
		this.countDownText=''
	},
    computed: {
        curTask() {
            let result = null;
            for (let item of this.taskList) {
                if (
					item.userStatus<=3 || item.userStatus 
                ) {
                    result = item;
                    break;
                }
            }
			result  =  result ?  formTask([result])[0] :  null;
			if(result){
				if(result.userStatus == 2 || result.userStatus == 3){
					this.receiveFlag = true;
					this.showCountDown = true;
					this.setCountDown(this.taskData.countDown,this.taskData.taskTime)
				}
			}else{
				if(this.taskData.userStatus == 2 || this.taskData.userStatus == 3){
					this.receiveFlag = true;
					this.showCountDown = true;
					this.setCountDown(this.taskData.countDown,this.taskData.taskTime)
				}else if(this.taskData.userStatus == 6){
					this.complete = true;
				}
			}
			return result;
        },
        curTaskDetail() {
            return formartTaskDetail(this.taskData);
        }
    },
    methods: {
        receive() {
            takeTask(
                this.taskData.taskId,
                this.curTask ? this.curTask.taskDetailId : ""
            ).then(res => {
                if (res.code == 1) {
                    showSucc("领取成功");
                    setTimeout(() => {
                        this.receiveFlag = true;
                        if (this.taskData.isLocal == 1) {
                            wx.navigateTo({
                                url: `../${this.taskData.url}/main`
                            });
                        } else {
                            this.getTaskData();
                        }
                    }, 800);
                } else {
                    msg(res.msg);
                }
            });
        },
        submit() {
            //        this.receiveFlag = true;
            wx.navigateTo({
                url: `../taskCertificate/main?taskId=${
                    this.taskData.taskId
                }&userTaskDetailId=${
                    this.curTask ? this.curTask.userTaskDetailId : " "
                }`
            });
        },
        giveUp() {
            showModel("确定要放弃这个任务吗？").then(res => {
                if (res) {
                    giveUpTask(
                        this.taskData.taskId,
                        this.curTask ? this.curTask.userTaskDetailId : ""
                    ).then(res => {
                        if (res.code == 1) {
                            msg("取消成功");
							wx.navigateBack({delta:1})
                        } else {
                            msg(res.msg);
                        }
                    });
                    this.receiveFlag = false;
                }
            });
		},
		setCountDown(countDownTime,taskTime){
			if(this.timer){
				return
			}else{
				let t = countDownTime+(taskTime*60*1000) - (new Date().getTime())
				if(t< 0 ){
					this.countDownText = '已过期'
					return
				}
				this.timer = setInterval(()=>{
					this.countDownText = diffTime(t);
					t-=1000;
					if(t < 0){
						clearInterval(this.timer);
						this.timer= null;
					}
				},1000)
			}
		},
        toggleNav(n) {
            this.currentTab = n;
        },
        async getTaskData() {
            _loading("加载中...");
			this.receiveFlag = false;
			this.showCountDown=false;
			this.complete = false;
            if (this.taskId) {
                let userId = wx.getStorageSync("userId") || "";
                let data = (await getTaskDetail({
                    taskId: this.taskId,
                    userId
				})).data;
                _loading();
				this.taskData = data.missionTask;
                this.isNew = this.taskData.type == 2 ? true : false;
				this.taskList = data.detail;
            } else {
                errBack();
            }
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
				flex 1
				text-align center
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

.no-result {
	width: 100%;
	height: 200px;
	line-height: 200px;
	text-align: center;
	color: #999;
}
.count-down
	color #ff4b2b		
</style>
