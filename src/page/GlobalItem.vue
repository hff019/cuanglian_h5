<template>
    <div style="min-height: 6rem">
        <ClxsdLoadMore key="factory-list" ref="loadmore" @onRefresh="onRefresh" @onLoadMore="onLoadMore">
            <div class="company" :key="`en-${index}`" v-for="(item,index) in businesses">
                <div class="company-name" @click="entryBusinessShop(item)">
                    <img :src="item.logo" alt=" ">
                    <p>{{item.display_name || item.name }}</p>
                    <span>24小时</span>
                </div>
                <div class="company-box">
                    <div class="left">
                        <div class="notice">
                            <svg>
                                <use xlink:href="#icon-notice"/>
                            </svg>
                            <div class="scroll-wrap">
                                <ul class="scroll-content" ref="con1" :class="{anim:animate==true}">
                                    <li v-for="(item,index) in prizeList">{{item.name}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClxsdLoadMore>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {businessList} from '@/api/supplier.js'
    import {infoList} from "@/api/ad";

    export default {
        name: "GlobalItem",
        props:["is_active"],
        data() {
            return {
                isActive: true,
                hasError: false,
                page: 1,
                businesses: [],
                swippers: [],
                animate: false,
                areaList: null,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                active: 0,
                preActive: 0,
                prizeList: [
                    {name: '重磅！国家重点监控药品目录公布'},
                    {name: '国家药监局开会，4+7集采又迎来一“战队”?'},
                    {name: '最高领导人讲话，中医药机会来了'},
                    {name: '重磅！国家重点监控药品目录公布'},
                    {name: '最高领导人讲话，中医药机会来了'},
                    {name: '重磅！国家重点监控药品目录公布'},
                    {name: '国家药监局开会，4+7集采又迎来一“战队”?'},
                    {name: '最高领导人讲话，中医药机会来了'},
                    {name: '国家药监局开会，4+7集采又迎来一“战队”?'},
                ],
            }
        },

        created() {
            setInterval(this.scroll, 2500)
            this.onRefresh()
            console.log(this.is_active)
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 50) {
                    this.hasError = 1
                } else {
                    this.hasError = 0;
                }
            },
            getData(options, loadMore = false) {
                const params = {
                    page: this.page,
                    type: this.is_active,
                    limit: options.limit,
                }
                console.log(params)
                businessList(params, loadMore).then(({data = []}) => {
                    console.log(data.data)
                    if (loadMore) {
                        this.businesses = [...this.businesses, ...data.data.businessList]
                    } else {
                        this.businesses = data.data.businessList
                    }
                    this.page = this.page + 1
                    this.$refs.loadmore.afterLoadMore(data.data.businessList.length < options.limit)
                    if (options.callback) {
                        options.callback()
                    }
                })
            },
            onRefresh(callback) {
                this.page = 1;
                const options = {
                    limit: 15,
                    callback: callback,
                }
                this.getData(options)

            },
            onLoadMore() {
                const options = {
                    limit: 15
                }
                this.getData(options, true)
            },
            entryBusinessShop(item) {
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP', item.id)
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP_DATA', item)
                this.$router.push('/business-shop')
            },
            scroll() {
                let con1 = this.$refs.con1;
                this.animate = !this.animate;
                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function () {
                    that.prizeList.push(that.prizeList[0]);
                    that.prizeList.shift();
                    that.animate = !that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了

                }, 700)
            }

        },

    }
</script>

<style lang="scss" scoped>
    .shopcar {
        position: fixed;
        width: 1.2rem;
        height: 1.2rem;
        right: 0px;
        bottom: 1.3rem;
    }

    .top-box {
        background: #0090FF;

        ul {
            height: .88rem;
            line-height: .88rem;
            text-align: center;

            li {
                display: inline-block;
                width: 28%;
                color: rgba(153, 211, 255, 1);
                font-size: .37rem;
            }

            .active {
                color: #fff;
                font-size: .47rem;
            }
        }

        &-search {
            padding: .2rem;
            input {
                width: 100%;
                height: .54rem;
                background: rgba(51, 166, 255, 1);
                border-radius: .27rem;
                color: #D6EDFF;
                text-align: center;

                &::placeholder {
                    color: #D6EDFF;
                }
            }
        }
    }

    .swiper-box {
        background: #fff;
        height: 2.9rem;
        .swiper {
            width: 7.2rem;
            height: 2.5rem;
            margin: 0 auto;
        }
    }

    .business-list {
        height: 100%;
    }

    .bg-blue {
        background: #26a2ff;
    }

    .mint-searchbar-cancel {
        font-size: 12px;
    }

    .home-top {
        background: #26A2FF;
        padding-top: .8rem;
        padding-bottom: .15rem;
    }

    .activeHome {
        padding-top: 0.58rem;
    }

    .is_scroll {
        overflow-x: scroll;
        position: relative;
        height: .8rem;
        letter-spacing: 1px;
        overflow-y: hidden;
        margin-top: .18rem;
        z-index: 99;

        &::-webkit-scrollbar {
            height: 0px;
            background: #26A2FF;
        }

        .area-ul {
            width: 50rem;
            height: 1rem;
            line-height: 1rem;
            padding-left: .2rem;

            li {
                display: block;
                float: left;
                color: #fff;
                opacity: .7;
                font-size: .28rem;
                line-height: .8rem;
                padding-right: .3rem;
                font-weight: bold;
            }

            .active {
                font-size: .42rem;
                opacity: 1;
                font-weight: 600;
            }

            .active-county {
                font-size: .28rem;
                opacity: 1;
                font-weight: bold;
            }
        }
    }

    .scroll-area {
        background: #fff;
        border-bottom: 1px solid #f1f1f1;
        height: 40px;
        margin-top: .15rem;
        padding-top: 3px;

        .area-ul {
            li {
                color: #7C7C7C
            }

            .active {
                color: #26A2FF;
            }
        }
    }

    .search {
        position: fixed;
        display: flex;
        position: relative;
        width: 100%;
        top: 0px;
        padding: 10px .2rem 6px;
        z-index: 999;
        justify-content: space-between;

        .retreat {
            width: 1.4rem;
            font-size: .26rem;
            vertical-align: middle;
            color: #fff;
            padding-top: .1rem;

            svg {
                width: .3rem;
                height: .3rem;
                margin-right: 2px;
                margin-top: 2px;
            }
        }

        .approve {
            margin-left: .2rem;

            svg {
                width: .65rem;
                height: .65rem;
            }
        }
    }

    .swiper {
        height: 2.8rem;
        background: #fff;
        padding: .15rem;
    }

    .company {
        width: 100%;
        background: #fff;
        margin-top: 0.2rem;
        border-radius: .1rem;
    }

    .company .company-name {
        width: 7.02rem;
        height: 1.45rem;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: auto;
        border-bottom: 1px solid rgb(230, 230, 230);

        img {
            width: .64rem;
            height: .64rem;
            border-radius: .64rem;
            margin: 0.2rem 0.2rem 0.24rem 0;
        }

        p {
            width: 5.2rem;
            font-size: 0.32rem;
            color: rgb(51, 51, 51);
            font-weight: bold;
        }

        a {
            svg {
                width: .45rem;
                height: .45rem;
            }
        }

        span {
            font-size: .24rem;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
        }
    }

    .company .company-box {
        display: flex;
        justify-content: space-between;

        .left {
            width: 100%;
        }

        .right {
            padding-top: .15rem;
            text-align: center;
            position: relative;

            svg {
                width: .75rem;
                height: .75rem;
            }

            p {
                position: absolute;
                font-size: .24rem;
                color: #fff;
                top: .3rem;
                left: .3rem;
            }
        }
    }

    .company .tel {
        position: relative;
        height: 0.79rem;
        width: 7.02rem;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        line-height: 0.79rem;
        margin: auto;

        .chunk {
            width: 50%;
            text-align: center;
            color: rgb(45, 162, 255);
            font-size: 0.28rem;

            a {
                color: rgb(45, 162, 255);
            }
        }

        i {
            width: 1px;
            height: 0.35rem;
            background: rgb(230, 230, 230);
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
        }
    }

    .activeTop {
        height: 1.7rem;
        padding-top: .9rem;
    }

    .notice {
        margin: .2rem;
        background: #f1f4f5;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;

        .notice-list {
            width: 6.2rem;
            height: .64rem;
            overflow-y: hidden;
            margin-right: .1rem;

            a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .24rem;
                line-height: .64rem;
                color: #333;
            }
        }

        svg {
            width: .38rem;
            height: .38rem;
        }
    }

    .scroll-wrap {
        height: .6rem;
        overflow: hidden;
    }

    .scroll-content {
        position: relative;

        li {
            height: .62rem;
            line-height: .62rem;
            font-size: 14px;
            padding: 0 .2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
                display: inline-block;
                width: 60%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            small {
                float: right;
                font-size: 14px;
            }

            &:hover {
                color: #26a2ff;
            }
        }
    }

    .anim {
        transition: all .9s;
        margin-top: -.6rem;
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .activeTop {
            height: 1.7rem;
            padding-top: .9rem;
        }
    }
</style>