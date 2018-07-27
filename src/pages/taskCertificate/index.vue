<template>
	<div class="verified-wrap">
		<!-- 任务信息卡片 -->
		<div class="card-item" v-if='curTask'>
			<!-- 任务内容 -->
			<div class="task-content">
				<div class="title" v-text="curTask.title"></div>
				<div class="publisher">发布商家：
					<span v-text="curTask.publisher"></span>
				</div>
				<div class="time-limit">任务时间：
					<span v-text="curTask.beginTime"></span> 至
					<span v-text="curTask.endTime"></span>
				</div>
			</div>
			<!-- 任务赏金 -->
			<div class="task-bounty">¥
				<span v-text="curTask.taskBounty"></span>
			</div>
		</div>
		<!-- 上传凭证 -->
		<div v-show='!isNew' class="reason-title">
			{{statusText}}
		</div>
		<div class="upload-box">
			<div class="upload-area">
				<textarea placeholder="内容描述..." v-model="remark"></textarea>
				<div class="img-box">
					<div class="img-item" v-for="(item,index) in curImg" :key="index" @click='remove(index)'>
						<img :src="oss + item" alt="">
					</div>
					<div class="btn-upload" @click.stop='upLoadImg'>
						<img src="../../../static/images/addImg.png" alt="">
					</div>
				</div>
			</div>
			<span>上传凭证（最多可上传9张）</span>
		</div>
		<!-- 审核按钮 -->
		<div class="btn-review" @click='send' v-if='isNew'>预计审核时间，将在七个工作日内</div>
	</div>
</template>

<script>
import {
    upImgs,
    errBack,
    showModel,
    _loading,
    showSucc,
    msg
} from "../../utils";
import taskCard from "../../components/taskCard.vue";
import config from "../../config.js";
import { getTaskDetail, completeApply, getApply } from "../../api";
import { formartTaskDetail, formTask } from "../../model";
export default {
    components: { taskCard },
    data() {
        return {
            imgUrl: [],
            oss: "",
            task: {},
            remark: "",
            isNew: null,
            statusText: "",
            taskList: []
        };
    },
    onLoad(options) {
        this.taskId = options.taskId;
        if (!this.taskId) {
            errBack();
        }
        this.taskDetailId = options.userTaskDetailId || " ";
        console.log(options);
    },
    mounted() {
        this.oss = config.ossroot;
        this.getTask();
    },
    computed: {
        curImg() {
            return this.imgUrl.slice(-9);
        },
        curTask() {
            let result = null;
            for (let item of this.taskList) {
                if (
                    item.userStatus == 0 ||
                    item.userStatus == 1 ||
                    item.userStatus == 2
                ) {
                    result = item;
                    break;
                }
            }

            return result ? formTask([result])[0] : formTask([this.task])[0];
        }
    },
    methods: {
        async getTask() {
            this.imgUrl = [];
            this.task = {};
            this.remark = "";
            this.statusText = "审核中，预计审核时间为七个工作日";
            this.isNew = true;
            let userId = wx.getStorageSync("userId");
            let data = (await getTaskDetail({
                taskId: this.taskId,
                userId
            })).data;
            console.log(data);
            this.task = data.missionTask;
            this.taskList = data.detail;
            this.getApplyData();
        },
        upLoadImg() {
            upImgs(9, this.imgUrl);
        },
        remove(index) {
            showModel("确定要删除该图片吗").then(res => {
                if (res) {
                    let offset =
                        this.imgUrl.length > 9
                            ? this.imgUrl.length - this.curImg.length
                            : 0;
                    this.imgUrl.splice(index + offset, 1);
                }
            });
        },
        getApplyData() {
            getApply(this.task.userTaskId, this.taskDetailId).then(res => {
                if (res.code == 1) {
                    if (res.data) {
                        this.remark = res.data.remark || "";
                        this.imgUrl = res.data.voucher.split(",") || [];
                        if (res.data.voucher) {
                            this.isNew = false;
                        } else if (res.data.status == 3) {
                            this.statusText = "审核失败：" + res.data.reason;
                        }
                    }
                } else {
                    // errBack()
                }
            });
        },
        send() {
            if (!this.curImg.length) {
                msg("请上传凭证");
                return;
            }
            _loading("正在发送");
            completeApply(
                this.task.userTaskId,
                this.taskDetailId,
                this.curImg.join(","),
                this.remark
            ).then(res => {
                _loading();
                if (res.code == 1) {
                    showSucc("提交成功");
                    setTimeout(() => {
                        wx.switchTab({ url: "../taskProgress/main" });
                    }, 800);
                } else {
                    msg("提交审核失败，请稍后再试");
                }
            });
        }
    },
    watch: {
        remark(val) {
            if (val.length > 120) {
                msg("最多输入120个字");
                this.remark = val.slice(-119);
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.verified-wrap {
	// 任务信息卡片
	.card-item {
		background-color: #efeff4;
		padding: 0 30rpx;
		width: 610rpx;
		height: 180rpx;
		margin: 0 auto;
		border-radius: 12rpx;
		margin-bottom: 60rpx;

		// 任务内容
		.task-content {
			float: left;

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

	// 上传凭证
	.upload-box {
		margin-bottom: 75px;

		.upload-area {
			width: 590rpx;
			min-height: 380rpx;
			border: 2rpx solid #e6e6e6;
			margin: 0 auto;
			padding: 40rpx;
			padding-bottom: 0px;

			textarea {
				width: 100%;
				min-height: 181rpx;
			}

			.btn-upload, .img-item {
				flex: 0 0 170rpx;
				height: 170rpx;
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 20px;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}

		span {
			font-size: 30rpx;
			color: #999;
			padding-left: 40rpx;
		}
	}

	// 审核按钮
	.btn-review {
		width: 630rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #fff;
		background-color: #ff4b2b;
		text-align: center;
		margin: 0 auto 20px auto;
	}
}

.img-box {
	display: flex;
	flex-wrap: wrap;
	padding: 10px 0;
	box-sizing: border-box;
	min-height: 100px;
}

.reason-title {
	font-size: 14px;
	padding: 10px 20px;
	color: #ff4b2b;
}
</style>


