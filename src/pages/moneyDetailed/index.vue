<template>
    <div class="over-page">
        <div class="top-bar">
            <div class="case" :class="{active:active==1}" @click='toggle(1)'>收入明细</div>
            <div class="case" :class="{active:active==2}" @click='toggle(2)'>提现明细</div>
        </div>
    </div>
</template>

<script>
import { getMoneyDetail } from "../../api";
const PAGESIZE = 8;
export default {
    data() {
        return {
            active: 1,
            pageNum: 1
        };
    },
    methods: {
        toggle(i) {
            this.active = i;
            this.pageNum = 1;
            this.getData();
        },
        getData() {
            getMoneyDetail(this.active, PAGESIZE, this.pageNum).then(res => {});
        }
    }
};
</script>

<style lang="stylus" scoped>
.top-bar {
    display: flex;
    height: 50px;
    border: 1px solid #eee;

    .case {
        flex: 1;
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 14px;

        &:nth-child(1) {
            border-right: 1px solid #eee;
        }

        &.active {
            color: #ff4b2b;
        }
    }
}
</style>
