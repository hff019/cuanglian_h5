<template>
	<div class="home">
		<div v-bind:class="{ search: isActive, 'bg-blue': hasError ,activeTop: isFullScreen }">
			<SearchBar :searchFn="searchFn" v-model="searchValue"></SearchBar>
			<router-link to="/develop">
				<div class="approve">
					<img src="../../images/index/study1@2x.png"/>
				</div>
			</router-link>
		</div>
		<div class="">
			<mt-swipe :auto="4000" style="height: 4rem;">
				<mt-swipe-item :key="key" v-for="(swipe,key) in swipers"><a :href="swipe.link"> <img :src="swipe.img" width="100%"></a>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<!-- <Notice :notices="notices" v-if="notices!=null"></Notice>
		 -->
		  <div class="noticesBox"  v-if="notices!=null">
                <Notice class="noticesContent" :notices="notices"></Notice>
            </div>
		<div class="notice" v-else>
			<svg>
				<use xlink:href="#icon-notice"/>
			</svg>
			<span style="padding-left: 5px">暂时没有消息</span>
		</div>
		<div class="add">
			<a href="javascript:void(0)">
				<img src="../../images/index/activityA.png">
			</a>
			<a href="javascript:void(0)">
				<img src="../../images/index/activityB.png">
			</a>
			<a href="javascript:void(0)">
				<img src="../../images/index/activityC.png">
			</a>
			<a href="javascript:void(0)">
				<img src="../../images/index/activityD.png">
			</a>
		</div>
		<div class="select-box">
			<img src="../../images/index/home-leftLine.png">
			<span> 推荐厂家</span>
			<img src="../../images/index/home-rightLine.png">
		</div>
		<div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
			<!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill"> -->
				<supplier-item :data="item" v-for="(item,index) in suppliers"/>
			<!-- </mt-loadmore> -->
		</div>
		<p v-if="allLoaded" class="loader-over">加载完成</p>
		<!--
        <div @click="authToRouter('/factory/cart')">
            <img src="../../images/index/shop.png" class="shopcar" />
        </div>
        -->
		<router-link to="/factory/cart">
			<img src="../../images/index/shop.png" class="shopcar newClass"/>
		</router-link>
		<clxsd-foot-guide :user-type="3"/>
	</div>
</template>

<script>
	import {adList, infoList} from "@/api/ad";
	import {mapState} from "vuex";
	import SearchBar from '@/components/common/SearchBar';
	import {findNearBySuppliers} from '@/api/supplier.js';
	import SupplierItem from './SupplierItem';
	import EmptySupplier from '@/components/EmptyList'
	import Notice from '@/components/common/notice';

	export default {
		name: "page-lianshuo-home",
		components: {
			SupplierItem,
			SearchBar,
			EmptySupplier,
			Notice
		},
		data() {
			return {
				showLoading: true, //显示加载动画
				isActive: true,
				hasError: false,
				swipers: [],
				suppliers: [],
				page: 1,
				isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
				notices: [],
				allLoaded: false, //是否自动触发上拉函数
				isAutoFill: false,
				wrapperHeight: 0,
				courrentPage: 1,
				limit:20,
				searchValue: ''
			}
		},
		mounted() {
			// 父控件要加上高度，否则会出现上拉不动的情况
			this.wrapperHeight =
					document.documentElement.clientHeight -
					this.$refs.wrapper.getBoundingClientRect().top;
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
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
			// console.log(document.scrollTo, 'scrollto')
		},
		created() {
			this.initData()
			this.loadFrist();
		},
		methods: {
			loadTop() {
				this.courrentPage = 1
				this.loadFrist();
			},
			// 上拉加载
			loadBottom() {
				this.loadMore();
			},
			// 下来刷新加载
			loadFrist() {
				const params = {
					page: this.courrentPage,
					limit: this.limit,
					search: this.searchValue
				}
				findNearBySuppliers(params).then(response => {
					console.log(response.data.data)
					this.allLoaded = false; // 可以进行上拉
					this.suppliers = response.data.data;
					console.log(this.suppliers, 'this.suppliers')
					this.$refs.loadmore.onTopLoaded();
				})
			},
			// 加载更多
			loadMore() {
				this.courrentPage++;
				const params = {
					page: this.courrentPage,
					limit: this.limit,
					search: this.searchValue
				}
				findNearBySuppliers(params).then(response => {
					response.data.data && (this.suppliers = this.suppliers.concat(response.data.data))
					if (!response.data.data || response.data.data.length < this.limit) {
						this.allLoaded = true; // 若数据已全部获取完毕
					}
					this.$refs.loadmore.onBottomLoaded();
				})
			},
			async initData() {
				//console.log(44)
				const {data} = await adList({channel: 'app', space: 'home-top'})
				this.swipers = data.data
				infoList({from: 'platform'}).then(data => {
					this.notices = data.data.data
					console.log(this.notices)
				})
			},
			// 点击搜索
			searchFn() {
				// console.log(this.searchVaue)
				const params = {
					page: 1,
					limit: this.limit,
					search: this.searchValue
				}
				findNearBySuppliers(params).then(response => {
					console.log(response.data.data)
					this.allLoaded = false; // 可以进行上拉
					this.suppliers = response.data.data;
					console.log(this.suppliers, 'this.suppliers')
					this.$refs.loadmore.onTopLoaded();
				})
			},
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (scrollTop > 150) {
					this.hasError = 1;
				} else {
					this.hasError = 0;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main-body {
		/* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
		overflow: scroll;
	}
	.noticesBox {
		padding: .04rem;
		height: .88rem;
		background: #fff;
		display: flex;
		align-items: center;
		.noticesContent {

		}
	}
	.select-box {
		display: flex;
		justify-content: center;
		font-size: .24rem;
		height: .78rem;
		line-height: .78rem;
		text-align: center;
		color: #ccc;
		align-items: center;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(204,204,204,1);

		img {
			width: .82rem;
			// height: .002rem;
		}
		span {
			padding: 0 .2rem; 
		}
	}

	.bg-blue {
		background: #26A2FF;
	}

	.search {
		display: flex;
		position: fixed;
		width: 100%;
		top: 0px;
		padding: 10px 10px 6px;
		z-index: 999;
		align-items: center;
		justify-content: space-between;

		.retreat {
			width: 30px;
			height: 30px;
		}

		.approve {
			margin-left: .2rem;

			img {
				width: .65rem;
				height: .65rem;
			}
		}
	}

	.shopcar {
		position: fixed;
		width: 1.3rem;
		height: 1.3rem;
		height: auto;
		right: 0px;
		bottom: 1.3rem;
		z-index: 99;
		&.newClass {
            width: 1rem;
            height: 1rem;
            right: 20px;
            bottom: 60px;
        }
	}

	.notice {
		// margin: .2rem 0;
		margin-top: 0px;
		background: #fff;
		width: 100%;
		height: .88rem;
		line-height: .88rem;
		display: flex;
		padding: 0 .24rem;
		align-items: center;

		.notice-list {
			width: 6.2rem;
			height: .88rem;
			overflow-y: hidden;
			margin-left: .1rem;

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

	@keyframes anis {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-.88rem);
		}
	}

	.add {
		text-align: center;
		background: #fff;
		padding: .2rem 0px .06rem;
		margin-top: 5px;
		margin-bottom: 5px;

		a {
			display: inline-block;
			width: 46.5%;
			margin: 0 1%;
			margin-bottom: .07rem;

			img {
				width: 100%;
			}
		}
	}

	.empty {
		padding-top: 1rem;
	}

	.activeTop {
		height: 1.6rem;
		padding-top: .5rem;
	}

	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.activeTop {
			height: 1.6rem;
			padding-top: 35px;
		}
	}
</style>
