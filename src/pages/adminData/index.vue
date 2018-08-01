<template>
	<div class="admin-wrap">
		<!-- 头像 -->
		<div class="head-pic">
			<img :src="headPicUrl" alt="">
		</div>
		<!-- 相关信息 -->
		<div class="info-list">
			<div class="list-item nickname">
				<span>昵称</span>
				<input type="text" v-model="user.nickname">
			</div>
			<div class="list-item sex">
				<span>性别</span>
				<picker :value="index" :range="sex" @change='changeSex'>
					<div class="picker">
						当前选择：{{sex[index]}}
					</div>
				</picker>
			</div>
			<div class="list-item telephone-number">
				<span>手机号码</span>
				<input class="disabled" type="text" v-model="user.telNumber" disabled>
			</div>
			<div class="list-item verified">
				<span>实名认证</span>
				<input class="disabled" type="text" v-model="user.verified" disabled>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            headPicUrl:
                "",
            user: {
                nickname: "",
                telNumber: "18888889999",
                birthday: "2000-01-01",
                verified: "未认证"
            },
            sex: ["保密", "男", "女"],
            sexVal: "男",
            index: 0
        };
    },
    mounted() {},
    methods: {
        changeSex(e) {
            this.index = e.mp.detail.value;
        }
    }
};
</script>

<style lang="stylus" scoped>
.admin-wrap {
	// 头像
	.head-pic {
		height: 354rpx;
		border-top: 2rpx solid #efeff4;
		text-align: center;

		img {
			width: 220rpx;
			height: 220rpx;
			border-radius: 50%;
			border: 6rpx solid #efeff4;
			margin: 60rpx auto 0;
		}
	}

	// 相关信息
	.info-list {
		.list-item {
			height: 110rpx;
			line-height: 110rpx;
			border-bottom: 2rpx solid #efeff4;
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			font-size: 30rpx;

			span {
				color: #999;
			}

			input {
				height: 110rpx;
				color: #000;
				text-align: right;
			}

			.disabled {
				color: #999;
			}
		}
	}
}

.sex-picker {
	display: inline-block;
	width: 120px;
	height: 80px;
}
</style>

