<template>
    <div>
        <clxsd-head-top :title='`AB证`'></clxsd-head-top>
        <div class="search">
            <SearchBar></SearchBar>
        </div>

        <div style="min-height: 5rem;" class="company-list">
            <ClxsdLoadMore key="factory-list" ref="loadmore" @onRefresh="onRefresh" @onLoadMore="onLoadMore">
                <li class="company" :key="`en-${index}`" v-for="(item,index) in businesses">
                    <div @click="entryBusinessShop(item)">
                        {{item.display_name || item.name }}
                    </div>
                    <svg>
                        <use xlink:href="#icon-enter"></use>
                    </svg>
                </li>
            </ClxsdLoadMore>
        </div>
    </div>
</template>

<script>
    import SearchBar from '@/components/common/SearchBar';
    import {mapState} from "vuex";
    import {findNearBySuppliers} from '@/api/supplier.js'

    export default {
        name: "CompanyABList",
        components: {
            SearchBar
        },
        data() {
            return {
                isActive: true,
                hasError: false,
                page: 1,
                businesses: [],
                swippers: [],
                areaList: null,
                active: 0,
                preActive: 0
            }
        },
        created() {
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        activated() {
            console.log(1)
        },
        computed: {
            ...mapState(['POSITION']),
            lat() {
                return this.POSITION.lat
            },
            lng() {
                return this.POSITION.lng
            }
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
            async getData(options, loadMore = false) {
                options.is_load_ad = options.is_load_ad || false
                const params = {
                    lat: this.lat,
                    lng: this.lng,
                    page: this.page,
                    type: 'business',
                    limit: options.limit,
                    province: options.areaCode,
                    is_load_ad: options.is_load_ad ? true : false
                }
                const {
                    data
                } = await findNearBySuppliers(params)
                if (options.is_load_ad) {
                    this.swippers = data.swippers
                }
                if (loadMore) {
                    console.log(this.businesses)
                    this.businesses = [...this.businesses, ...data.items]
                    console.log(this.businesses)
                } else {
                    this.businesses = data.items
                }
                this.page = this.page + 1
                this.$refs.loadmore.afterLoadMore(data.items.length < options.limit)
                if (options.callback) {
                    options.callback()
                }

            },
            entryBusinessShop(item) {
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP', item.id)
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP_DATA', item)
                this.$router.push('/business-shop')
            },
            onRefresh(callback) {
                this.page = 1;
                const options = {
                    limit: 6,
                    callback: callback
                }
                this.getData(options)

            },
            onLoadMore() {
                console.log('loadMore')
                const options = {
                    limit: 6
                }
                this.getData(options, true)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .mint-cell {
        border-bottom: 1px solid #f1f1f1;
    }

    .search {
        background: #f5f5f5;
        top: 0px;
        padding: 10px;
        z-index: 999;
    }

    .company-list {
        background: #fff;
        padding: 0 .2rem;

        li {
            line-height: .9rem;
            font-size: .3rem;
            padding: 0 .1rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-bottom: 1px solid #f1f1f1;
            position: relative;
            list-style: none;
            display: flex;
            justify-content: space-between;
            &:last-child() {
                border: 0px;
            }
            >div {
                width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            svg {
                width: .3rem;
                height: .3rem;
                float: right;
                margin-top: .3rem;
            }
        }
    }
</style>