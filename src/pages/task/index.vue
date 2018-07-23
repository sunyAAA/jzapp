<template>
    <div>
        <div class="task-wrap" v-if="loginStatus">
            <!-- 广告位轮播 -->
            <swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="true">
                <block v-for="(item,index) in bannerList" :key="index">
                    <swiper-item>
                        <img :src="oss+item.face" class="slide-image">
                    </swiper-item>
                </block>
            </swiper>
            <!-- 排序方式tab -->
            <div class="nav">
                <ul class="sort">
                    <li class="sort-item" :class="{'current':isOrder}" @click='changeType'>智能排序</li>

                    <li class="sort-item" v-for="(item,index) in sortArr" v-text="item.title" :class="[ sortStatus == index ? 'current' : '' ]" @click="toggleTab(index)" :key="index"></li>
                </ul>
                <div class="type-kind">
                    <span @click="toggleType()">
                        {{ type }}
                        <i></i>
                    </span>
                    <ul v-show="typeShow">
                        <li v-for="(item, index) in taskType" v-text="item.dictName" :class="[ typeStatus == index ? 'selected' : '' ]" @click="chooseType(item,index)" :key="index"></li>
                    </ul>
                </div>
            </div>
            <scroll-view scroll-y :style='scrollHeight' @scrolltolower='loadMore'>
                <!-- 新手任务 -->
                <task-card v-if="newHands" :item="newHands[0]"  @noLogin="goLogin"></task-card>
                <!-- 任务列表 -->
                <!-- 推荐任务· -->
                <div v-show='isOrder'>
                    <task-card v-for="(item,index) in curRecommendList" :key="index" :item="item"  @noLogin="goLogin"></task-card>
                </div>
                <!-- 分类任务 -->
                <div v-show="!isOrder">
                    <task-card v-for="(item,index) in curTaskList" :key="index" :item="item" @noLogin="goLogin"></task-card>
                </div>
            </scroll-view>

        </div>
        <login-box v-else></login-box>
    </div>

</template>

<script>
import taskCard from "../../components/taskCard";
import LoginBox from "../../components/loginBox.vue";
import { initDict, formTask } from "../../model";
import {
    getBannerList,
    getNewHandsTask,
    getRecommendTask,
    getAllTask
} from "../../api";
import config from "../../config.js";
import { _loading } from "../../utils";
export default {
    components: {
        taskCard,
        LoginBox
    },
    data() {
        return {
            bannerList: [],
            oss: "",
            loginStatus: true,
            taskType: [],
            recommendList: [],
            recommendNo: 4,
            taskList: [],
            taskListNo: 4,
            taskListFilter: 0,
            recommendPageNo: 1,
            taskListPageNo: 1,
            isOrder: true,
            newHands: null,
            scrollHeight: "height:355px",
            sortArr: [
                {
                    title: "时间最优"
                },
                {
                    title: "赏金最高"
                }
            ],
            type: "任务类型",
            typeShow: false,
            sortStatus: 0,
            typeStatus: -1
        };
    },
    async onReady() {
        wx.hideTabBar();                //  隐藏导航
        this.oss = config.ossroot;
        _loading("载入中...");
        [
            this.taskType,
            this.bannerList,
            this.newHands,
            this.recommendList           
        ] = await Promise.all([
            initDict(),
            (await getBannerList()).data,
            formTask((await getNewHandsTask()).data),
            formTask((await getRecommendTask(this.recommendPageNo)).data)
        ]);
         this.taskList =  formTask((await getAllTask(this.taskListPageNo)).data)
        _loading();
    },
    mounted() {
        this.setScrollViewHeight();
    },
    computed: {
        curRecommendList() {
            return this.recommendList.slice(0, this.recommendNo);
        },
        curTaskList() {
            return this.taskList
                .filter(item => {
                    return item.type == this.taskListFilter;
                })
                .slice(0, this.taskListNo);
        },
        curSortFun() {
            return this.sortStatus == 0
                ? (a, b) => {
                      return a.sortTime - b.sortTime;
                  }
                : (a, b) => {
                      return b.taskBounty - a.taskBounty;
                  };
        }
    },
    methods: {
        toggleTab(index) {
            //  排序
            this.sortStatus = index;
            this.taskList.sort(this.curSortFun);
            this.recommendList.sort(this.curSortFun);
        },
        toggleType() {
            this.typeShow = !this.typeShow;
        },
        chooseType(item, index) {
            //  类型
            this.isOrder = false;
            this.taskListNo = 4;
            this.typeStatus = index;
            this.type = item.dictName;
            this.typeShow = false;
            this.taskListFilter = item.dictId;
        },
        setScrollViewHeight() {
            wx.getSystemInfo({
                success: res => {
                    this.scrollHeight = `height:${res.windowHeight -
                        200}px;`;
                }
            });
        },

        changeType() {
            this.isOrder = true;
            this.typeStatus = -1;
            this.type = "任务类型";
            this.typeShow = false;
        },
        getNextData() {
            this.pageNo++;
        },
        loadMore() {
            if (this.isOrder) {
                this.recommendNo += 4;
            } else {
                this.taskListNo += 4;
            }
        },
        goLogin(){
            this.loginStatus = false;
        }
    }
};
</script>

<style lang="stylus" scoped>
.task-wrap {
    min-height: 100vh;

    // 广告位轮播
    swiper {
        width: 750rpx;

        image {
            width: 100%;
            height: 375rpx;
        }
    }

    // 排序方式tab
    .nav {
        display: flex;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;

        ul.sort {
            display: flex;
            width: 75%;
            justify-content: space-around;

            li {
                font-size: 30rpx;
                color: #000;
            }

            li.current {
                color: #ff4b2b;
            }
        }

        .type-kind {
            width: 25%;
            font-size: 30rpx;
            text-align: center;

            span {
                i {
                    width: 0;
                    height: 0;
                    display: inline-block;
                    border-left: 10rpx solid transparent;
                    border-right: 10rpx solid transparent;
                    border-top: 18rpx solid #333;
                }
            }

            ul {
                background-color: #999;
                z-index: 999;
                position: relative;

                li {
                    width: 100%;
                    height: 50rpx;
                    line-height: 50rpx;
                    text-align: center;
                }

                li.selected {
                    color: #ff4b2b;
                }
            }
        }
    }
}
</style>
