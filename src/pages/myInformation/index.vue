<template>
	<div class="myInformation-wrap">
		<!-- 消息卡片 -->
		<info-card v-for='(item,index) in data' :key="index" :item='item.context'></info-card>
	</div>
</template> 

<script>
import infoCard from "../../components/infoCard.vue";
import { getMsgList } from "../../api";

export default {
    components: {
        infoCard
    },
    data() {
        return {
			data:[]
		};
	},
	mounted(){
		this.getList();
	},
    methods: {
        getInfoList(index) {},
        toggleNav(index) {
            this.tabStatus = index;
            this.getInfoList(index);
        },
        async getList() {
			this.data = (await getMsgList()).data
		}
    }
};
</script>

<style lang="stylus" scoped>
.myInformation-wrap {
	.nav-tab {
		display: flex;
		justify-content: space-around;
	}

	.current {
		color: #ff4b2b;
	}
}
</style>
