<template>
    <div class="UnautMy">
        <div class="container">
            <div class="header">
                <span>{{companyName}}</span>
            </div>

            <div class="userinfo">
                <div class="userinfo-left">
                    <img :src="userInfo.avatar | display_avatar" class="logo" v-if="userInfo.avatar"/>
                    <img src="../../../images/my/user_default.png" v-else/>
                    <div v-if="userInfo.sub_type === 1">
                        <img src="../../../images/extension/province.png" class="tag"/>
                    </div>
                    <div v-if="userInfo.sub_type === 2">
                        <img src="../../../images/extension/city.png" class="tag"/>
                    </div>
                    <div v-if="userInfo.sub_type === 3">
                        <img src="../../../images/extension/partner.png" class="tag"/>
                    </div>
                    <div v-if="userInfo.sub_type === 4">
                        <img src="../../../images/extension/promoter.png" class="tag"/>
                    </div>
                </div>
                <div class="userinfo-centre">
                    <p class="name">
                        {{userInfo.userName}}
                    </p>
                    <span class="phone">{{userInfo.userTel}}</span>
                </div>
                <div class="userinfo-right">
                    <router-link to="/invitation">
                        <svg>
                            <use xlink:href="#icon-QRCode"/>
                        </svg>
                        <span style="color: #fff">邀请</span>
                    </router-link>
                </div>
            </div>
            <div class="userinfo-lianshu">
                <span>联数(包)</span>
                <b>1800.00</b>
            </div>
        </div>
        <clxsd-cell :title="'通道收益'" :to="'/channel-profit'" :value="userInfo.lianPiaoVaule" is-link icon="my-message"/>
        <clxsd-cell :title="'广告收益'" :to="'/develop'" :value="userInfo.lianPiaoVaule" is-link icon="my-message" style="margin-bottom: .2rem"/>
        <ul class="unautMy-userlist">
            <div style="margin-bottom:.2rem">
                <clxsd-cell v-if="userInfo.sub_type === 0" :title="'角色选择'" :to="'/customer-choose-role'" is-link icon="my-collection"/>
            </div>
        </ul>
        <div style="margin-bottom:.2rem">
            <clxsd-cell :title="'消息通知'" :to="'/develop'" is-link icon="my-message"/>
            <clxsd-cell :title="'个人信息'" :to="'/business-setting'" is-link icon="my-employee"/>
        </div>
        <clxsd-cell :title="'设置'" :to="'/setting'" is-link icon="my-setting"/>
        <clxsd-foot-guide :user-type="4"/>
    </div>
</template>

<script>
    import ClxsdCell from "@/components/common/Cell";
    import {mapState} from "vuex";

    export default {
        name: "Myinfo",
        components: {
            ClxsdCell
        },
        data(){
          return{
              companyName: '未认证'
          }
        },
        computed: {
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    return {
                        //companyName: currentInfo.shop_supplier.display_name || currentInfo.shop_supplier.name,
                        userName: currentInfo.display_name || currentInfo.real_name || currentInfo.phone || '丢失信息',
                        userTel: currentInfo.phone || '丢失信息',
                        //role: currentInfo
                        user_type: currentInfo.user_type,
                        sub_type: currentInfo.sub_type,
                        state: currentInfo.status,
                        avatar: currentInfo.avatar
                    }
                },
            }),
            canShou() {
                const userInfo = this.userInfo
                console.log(userInfo)
                return (userInfo.state === 1) && (
                    userInfo.sub_type === 1 ||
                    userInfo.sub_type === 2 ||
                    userInfo.sub_type === 3)
            }
        }

    };
</script>

<style lang="scss" scoped>
    .UnautMy {
        background: #f4f5f5;
        font-size: 0.34rem;
    }

    .container {
        background: rgba(45, 162, 255, 1);

        .header {
            height: 0.88rem;
            line-height: 0.88rem;
            text-align: center;

            span {
                width: 1.09rem;
                height: 0.35rem;
                font-size: 0.37rem;
                color: rgba(255, 255, 255, 1);
            }
        }

        .userinfo {
            display: flex;
            height: 1.7rem;

            .userinfo-left {
                margin-left: 0.36rem;
                margin-right: 0.32rem;
                width: 1.28rem;
                height: 1.28rem;
                background: rgba(255, 255, 255, 1);
                padding: 0.04rem;
                border-radius: 0.06rem;
                opacity: 0.9;

                img {
                    display: block;
                    width: 1.2rem;
                    height: 1.2rem;
                    z-index: 9;
                    position: relative;
                }
                >div {
                    img {
                        width: .3rem;
                        height: .3rem;
                        float: right;
                        margin-top: -.2rem;
                        z-index: 99;
                        position: relative;
                    }
                }
            }

            .userinfo-centre {
                flex-grow: 1;

                .name {
                    height: 0.32rem;
                    line-height: 1;
                    margin-top: 0.24rem;
                    margin-bottom: 0.18rem;
                    font-size: 0.34rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);

                    small {
                        color: #fff;
                        font-weight: 200;
                    }
                }

                .phone {
                    width: 1.8rem;
                    height: 0.22rem;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                }
            }

            .userinfo-right {
                margin-right: 0.44rem;
                font-size: 0.22rem;
                padding-top: 0.24rem;
                text-align: center;

                svg {
                    width: 0.54rem;
                    height: 0.54rem;
                }

                img {
                    display: block;
                    width: 0.54rem;
                    height: 0.54rem;
                    border: 0.01rem solid #000;
                }

                span {
                    display: block;
                    margin-top: 0.02rem;
                    color: rgba(255, 255, 255, 1);
                    font-size: 0.22rem;
                    font-weight: 500;
                }
            }
        }
    }
    .userinfo-lianshu {
        height: 1rem;
        border-top: 1px solid #33a6ff;
        line-height: 1rem;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        color: #fff;
        span {
            font-size:.24rem;
        }
        b {
            font-size: .44rem;
        }
    }
</style>