<template>
    <div>
        <div class="task-wrap" v-if="loginStatus">
            <!-- 广告位轮播 -->
            <swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
                <block v-for="(item,index) in bannerList" :key="index" @click='bannerGoDetail(item.itemId)'>
                    <swiper-item>
                        <img :src="oss+item.face" class="slide-image">
                    </swiper-item>
                </block>
            </swiper>
            <!-- 排序方式tab -->
            <div class="nav">
                <ul class="sort">

                    <li class="sort-item" v-for="(item,index) in sortArr" v-text="item.title" :class="[ sortStatus == index ? 'current' : '' ]" @click="toggleTab(index)" :key="index"></li>
                </ul>
                <!-- <div class="type-kind">
                    <span @click="toggleType()">
                        {{ type }}
                        <i></i>
                    </span>
                    <ul v-show="typeShow">
                        <li v-for="(item, index) in taskType" v-text="item.dictName" :class="[ typeStatus == index ? 'selected' : '' ]" @click="chooseType(item,index)" :key="index"></li>
                    </ul>
                </div> -->
            </div>
            <scroll-view scroll-y :style='scrollHeight' @scrolltolower='loadMore'>
                <!-- 新手任务 -->
                <task-card v-if="newHands" :item="newHands[0]" @noLogin="goLogin"></task-card>
                <!-- 任务列表 -->
                <!-- 推荐任务· -->
                <div>
                    <task-card v-for="(item,index) in curRecommendList" :key="index" :item="item" @noLogin="goLogin"></task-card>
                </div>
                <!-- 分类任务 -->
                <div v-show='isNoMore' class="no-more">—— 我们是有底线的 ——</div>
            </scroll-view>

        </div>
        <login-box v-else @succ='loginSucc'></login-box>
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
import { _loading, _login } from "../../utils";
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
            taskListFilter: 0,
            recommendPageNo: 1,
            isOrder: true,
            isNoMore: false,
            newHands: null,
            scrollHeight: "height:355px",
            sortArr: [
                {
                    title: "智能优选"
                },
                {
                    title: "耗时最短"
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
        wx.hideTabBar(); //  隐藏导航
        this.oss = config.ossroot;
        _login(res => {
            if (res) {
                wx.showTabBar();
            }
        });
    },
    async onShow() {
        _loading("载入中...");
        this.recommendList = [];
        [
            this.taskType,
            this.bannerList,
            this.newHandsData,
            this.recommendListData
        ] = await Promise.all([
            initDict(),
            (await getBannerList()).data,
            await getNewHandsTask(),
            await getRecommendTask(this.recommendPageNo)
        ]);
        this.newHands = formTask(this.newHandsData.data);
        this.recommendList = formTask(this.recommendListData.data);
        _loading();
    },
    mounted() {
        this.setScrollViewHeight();
    },
    computed: {
        curRecommendList() {
            return this.recommendList.length
                ? this.recommendList.slice(0, this.recommendNo)
                : [];
        },
        // curTaskList() {
        //     return this.taskList
        //         .filter(item => {
        //             return item.type == this.taskListFilter;
        //         })
        //         .slice(0, this.taskListNo);
        // },
        curSortFun() {
            return this.sortStatus == 1
                ? (a, b) => {
                      return a.sortTime - b.sortTime;
                  }
                : this.sortStatus == 2
                    ? (a, b) => {
                          return b.taskBounty - a.taskBounty;
                      }
                    : (a, b) => {
                          return a.taskId - b.taskId;
                      };
        }
    },
    methods: {
        toggleTab(index) {
            //  排序
            this.sortStatus = index;
            this.recommendList.sort(this.curSortFun);
        },
        setScrollViewHeight() {
            wx.getSystemInfo({
                success: res => {
                    this.scrollHeight = `height:${res.windowHeight - 246}px;`;
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
                if (this.curRecommendList.length < this.recommendList.length) {
                    this.recommendNo += 4;
                    return;
                }
                if (
                    this.curRecommendList.length <
                    this.recommendListData.totalCount
                ) {
                    this.recommendNo++;
                    _loading("加载中...");
                    return getRecommendTask(this.recommendPageNo).then(res => {
                        _loading();
                        if (res.code == 1) {
                            this.recommendList = this.recommendList.concat(
                                formTask(res.data)
                            );
                        }
                    });
                }
                this.isNoMore = true;
            } else {
                this.taskListNo += 4;
                wx.getSystemInfo({
                    success: res => {
                        this.scrollHeight = `height:${res.windowHeight -
                            225}px;`;
                    }
                });
            }
        },
        goLogin(taskId) {
            this.curTaskId = taskId;
            this.loginStatus = false;
        },
        loginSucc() {
            this.loginStatus = true;
            wx.showTabBar();
            if (this.curTaskId) {
                wx.navigateTo({
                    url: "../taskDetail/main?taskId=" + this.curTaskId
                });
            }
        },
        bannerGoDetail(id) {
            wx.navigateTo({
                url: "../taskDetail/main?taskId=" + id
            });
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
        height: 350rpx;

        image {
            width: 100%;
            height: 100%;
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
            width: 100%;
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

.slide-image {
    object-fit: cover;
}

.no-more {
    text-align: center;
    font-size: 12px;
    color: #aaa;
    padding: 10px 0;
}
</style>
