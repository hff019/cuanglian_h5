<template>
    <div>
        <div class="search" :class="{activeTop: isFullScreen}">
            <div v-if="is_search == true" class="search-form">
                <input type="text" placeholder="请输入搜索内容">
                <svg>
                    <use xlink:href="#icon-ordering-search" />
                </svg>
            </div>
            <ul class="nav-list"  v-if="is_search==false">
                <li :class="`${selected == 1 ? 'active':''}`" @click="selected =1">药店订单</li>
                <li :class="`${selected == 2 ? 'active':''}`" @click="selected = 2">我的订单</li>
            </ul>
            <div class="approve">
                <svg @click="is_search = !is_search" v-if="is_search == false">
                    <use xlink:href="#icon-ordering-search" />
                </svg>
                <p @click="is_search = !is_search" v-if="is_search == true">取消</p>
            </div>
        </div>
        <businessPage v-if="selected === 1"/>
        <my-order-page v-if="selected === 2"/>
        <!--订量生产结束-->
        <clxsd-foot-guide :user-type="USER_TYPE" />
    </div>

</template>

<script>
    import { mapState } from "vuex";
    import SearchBar from '@/components/common/SearchBar';
    import businessPage from '@/page/order/BusinessServiceOrder'
    import myOrderPage from '@/page/order/FactoryOrder'
    export default {
        name: "BusinessPortOrder",
        components: {
            SearchBar,
            businessPage,
            myOrderPage
        },
        data() {
            return {
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                is_search:false,
                selected:1
            }
        },
        computed: {
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.data.user_type,
            })
        },
    }
</script>

<style lang="scss" scoped>
    .search-form{
        width: 90%;
        background: #0081e5;
        height: .6rem;
        line-height: .6rem;
        border-radius: .6rem;
        align-items: center;
        display: flex;
        input {
            margin-left: .4rem;
            width: 84%;
            height: .5rem;
            background: #0081e5;
            color: #fff;
            &::placeholder {
                color: #fff;
                opacity: .6;
            }
        }
        svg {
            width: .32rem;
            height: .32rem;
        }
    }
    .nav-list {
        width: 80%;
        padding-left: 15%;
        color: #fff;
        text-align: center;
        height: .6rem;
        li {
            display: inline-block;
            padding-left: .3rem;
            font-size: .37rem;
            opacity: .6;
        }
        .active {
            opacity: 1;
            font-size: .47rem;
        }
    }
    .search {
        background: #26A2FF;
        display: flex;
        width: 100%;
        top: 0px;
        padding: 10px 10px 6px;
        z-index: 999;
        justify-content: space-between;
        .retreat {
            width: 30px;
            height: 30px;
        }
        .approve {
            text-align: center;
            margin-left: .1rem;
            width: .7rem;
            svg {
                width: .4rem;
                height: .4rem;
                color: #fff;
                margin-top: .1rem;
            }
            p {
                color: #fff;
                line-height: 2.5;
                font-size: .28rem;
            }
        }
    }
    .activeTop {
        padding-top: 38px;
    }

</style>