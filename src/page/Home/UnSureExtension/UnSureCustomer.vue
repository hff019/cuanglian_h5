<template>
    <div>
        <div class="is-scroll" :class="{ active: isFullScreen }">
            <mt-navbar v-model="selected">
                <mt-tab-item id="all">
                    <p class="p1">全部</p>
                </mt-tab-item>
                <mt-tab-item id="province">
                    <p class="p1">省公司</p>
                </mt-tab-item>
                <mt-tab-item id="city">
                    <p class="p1">市公司</p>
                </mt-tab-item>
                <mt-tab-item id="partner">
                    <p class="p1">合伙人</p>
                </mt-tab-item>
                <mt-tab-item id="promoter">
                    <p class="p1">推广人</p>
                </mt-tab-item>
            </mt-navbar>
        </div>
        <Seach></Seach>
        <mt-tab-container v-model="selected" style="min-height: 5rem;padding-bottom: .2rem">
            <mt-tab-container-item id="all">
                <AllCustomerComponent/>
            </mt-tab-container-item>
            <mt-tab-container-item id="province">
                <ProvinceCustomerComponent/>
            </mt-tab-container-item>
            <mt-tab-container-item id="city">
                <CityCustomerComponent />
            </mt-tab-container-item>
            <mt-tab-container-item id="partner">
                <PartnerCustomerComponent/>
            </mt-tab-container-item>
            <mt-tab-container-item id="promoter">
                <PromoterCustomerComponent />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import AllCustomerComponent from "./Components/AllCustomerComponent"
    import ProvinceCustomerComponent from "./Components/ProvinceCustomerComponent"
    import CityCustomerComponent from "./Components/CityCustomerComponent"
    import PartnerCustomerComponent from "./Components/PartnerCustomerComponent"
    import PromoterCustomerComponent from "./Components/PromoterCustomerComponent"
    import  Seach from "../../../components/modules/Extension/ExtensionSeach2"

    export default {
        name: "UnSureCustomer",
        components:{
            AllCustomerComponent,
            ProvinceCustomerComponent,
            CityCustomerComponent,
            PartnerCustomerComponent,
            PromoterCustomerComponent,
            Seach
        },
        data(){
            return {
                selected:'all',//city,province,partner,promoter,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
            }
        },
        methods:{
            refresh(callback){
                this.$store.dispatch('fetchUserInfo')
                if(callback){
                    callback()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .is-scroll {
        width: 6.2rem;
        min-height: .8rem;
        left: .85rem;
        overflow-y: hidden;
        overflow-x: scroll;
        z-index: 999;
        position: fixed;
        top:0px;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .active {
        padding-top:.58rem;
    }
    .mint-navbar {
        border: 0px;
        background: #0090ff;
        position: relative;
        height: .88rem;
        width: 8.35rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom:0px;
        color: #fff;
        .p1 {
            font-size: .47rem;

        }
    }
    .mint-navbar .mint-tab-item {
        padding:  0;
    }
    .mint-tab-item {
        color: rgb(153,211,255);
        font-size: .37rem;
    }
    .mint-tab-item-label .p1 {
        font-size: .37rem;
        line-height: .88rem;
    }


    .notice {
        margin: .2rem ;
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
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .active {
            padding-top: .58rem;
        }
    }
</style>