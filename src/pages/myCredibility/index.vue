<template>
	<div class="myCredibility-wrap">
		<div class="credibility-display">
			<progress-arc></progress-arc>
		</div>
		<div class="btn-share">分享给好友</div>
	</div>
</template>

<script>
import progressArc from "../../components/progressArc";
export default {
    components: { progressArc },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="stylus" scoped>
.myCredibility-wrap {
	.credibility-display {
		width: 750rpx;
		height: 560rpx;
		background-color: #efeff4;
	}

	.btn-share {
		width: 500rpx;
		height: 80rpx;
		background-color: #fc5833;
		text-align: center;
		line-height: 80rpx;
		color: #fff;
		font-size: 40rpx;
		border-radius: 40rpx;
		margin: 200rpx auto 0;
	}
}
</style>
