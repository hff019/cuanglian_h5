<template>
    <div>
        <clxsd-head-top title='反馈记录' :goBackFnc="goBackFnc" :goBackNum="-3"></clxsd-head-top>
        <div style="padding-top: .2rem" v-if="feedList.length>0">
            <div class="main-body" ref="wrapper" style="height: 12rem">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <div class="feed-item" v-for="(item,index) in feedList" :key="`${index}_feeditem`">
                    <p>{{item.date}}</p>
                    <div>
                        <span style="background: #FF7612" v-if="item.reply_contents != null">问</span>{{item.body}}
                    </div>
                    <div v-if="item.reply_contents != null">
                        <span>答</span>{{item.reply_contents}}
                    </div>
                </div>
                </mt-loadmore>
            </div>
            <p v-if="allLoaded" class="loader-over">加载完毕</p>
        </div>
        <div v-else><Empty/></div>
    </div>
</template>

<script>
    import Empty from "@/components/EmptyList"
    export default {
        name: "FeedbackList",
        components:{
            Empty
        },
        data(){
            return{
                feedList:[],
                allLoaded: false, //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 1,
                limit:15,
                time:''
            }
        },
        created(){
            this.loadFrist(true);
        },

        methods:{
            async _handleData(data, flag) {
                if (data) {
                    data.forEach((item, index, arr) => {
                        let time = item.created_at
                        arr[index].date = this.$moment.unix(time).format("YYYY-MM-DD")
                    })
                   !flag &&this.$refs.loadmore.onTopLoaded()
                }
            },
            goBackFnc() {},
            loadTop() {
                this.loadFrist();
            },
            // 上拉加载
            loadBottom() {
                this.loadMore();
            },
            // 下来刷新加载
            loadFrist(flag) {
                const params = {
                    page: 1,
                    limit:this.limit
                }
                this.$http.get("comments/list",{params}).then(response => {
                    // console.log(response.data.data.data)
                    this.allLoaded = false; // 可以进行上拉
                    this.feedList = response.data.data.data;
                    this._handleData(this.feedList, flag)
                    //this.$refs.loadmore.onTopLoaded();
                })
            },
            // 加载更多
            loadMore() {
                this.courrentPage++;
                const params = {
                    page: this.courrentPage,
                    limit:this.limit
                }
                this.$http.get("comments/list",{params}).then(response => {

                    // concat数组的追加
                    this.feedList = this.feedList.concat(response.data.data.data);
                    this._handleData(this.feedList)
                    if (this.courrentPage > 1) {
                        this.allLoaded = true; // 若数据已全部获取完毕
                    }
                    this.$refs.loadmore.onBottomLoaded();
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .main-body {
        /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
        overflow: scroll;
    }
    .feed-item {
        width:6.9rem;
        background:rgba(255,255,255,1);
        border-radius:.24rem;
        padding: .2rem;
        margin: 0 auto;
        margin-bottom: .2rem;
        padding-bottom: .35rem;
        p {
            font-size:.22rem;
            font-weight:400;
            color:rgba(153,153,153,1);
        }
        div {
            background:rgba(245,245,245,1);
            font-size:.28rem;
            line-height: .46rem;
            padding: .1rem;
            margin-top: .2rem;
            span {
                width:.32rem;
                height:.32rem;
                line-height: .32rem;
                background:rgba(45,162,255,1);
                border-radius:2px;
                color: #fff;
                display: inline-block;
                text-align: center;
                margin-right: .1rem;
            }
        }
    }
</style>