<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view class="uni-container">
					<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
						<uni-tr>
							<uni-th width="100" align="center">村组名</uni-th>
							<uni-th width="100" align="center">运营商</uni-th>
							<uni-th width="100" align="center">消费/月</uni-th>
							<uni-th width="100" align="center">是否办理融合</uni-th>
							<uni-th width="100" align="center">融合到期时间</uni-th>
							<uni-th width="100" align="center">年龄段</uni-th>
							<uni-th width="100" align="center">家庭成员/人</uni-th>
							<uni-th width="100" align="center">成员总共消费</uni-th>
							<uni-th width="100" align="center">网络情况</uni-th>
							<uni-th width="100" align="center">联系电话</uni-th>
							<uni-th width="100" align="center">用网习惯</uni-th>
							<uni-th width="100" align="center">是否意向用户</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) in tableData" :key="index">
							<uni-td>{{ item.value.villageName }}</uni-td>
							<uni-td>{{ item.value.operator }}</uni-td>
							<uni-td>{{ item.value.consumption }}</uni-td>
							<uni-td>{{ item.value.handle }}</uni-td>
							<uni-td>{{ item.value.maturityTime }}</uni-td>
							<uni-td>{{ item.value.age }}</uni-td>
							<uni-td>{{ item.value.number }}</uni-td>
							<uni-td>{{ item.value.allConsumption }}</uni-td>
							<uni-td>{{ item.value.situation }}</uni-td>
							<uni-td>{{ item.value.telephone }}</uni-td>
							<uni-td>{{ item.value.habit }}</uni-td>
							<uni-td>{{ item.value.intention }}</uni-td>
							<uni-td>
								<view class="uni-group">
									<button class="uni-button" size="mini" type="primary">修改</button>
									<button class="uni-button" size="mini" type="warn">删除</button>
								</view>
							</uni-td>
						</uni-tr>
					</uni-table>
					<view class="uni-pagination-box"><uni-pagination prev-text="前一页" next-text="后一页" show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Kvite from '../../js_sdk/x-kvite/kvite-0.0.5/kvite.js';
	
	export default {
		data() {
			return {
				title: '数据输入',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				searchVal: '',
				tableData: [],
				// 每页数据量
				pageSize: 4,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 10,
				loading: false
			}
		},
		onLoad() {
			// this.selectedIndexs = []
			this.getData(1)
		},
		methods: {
			// 多选处理
			selectedItems() {
				return this.selectedIndexs.map(i => this.tableData[i])
			},
			// 多选
			selectionChange(e) {
				console.log(e.detail.index)
				this.selectedIndexs = e.detail.index
			},
			//批量删除
			delTable() {
				console.log(this.selectedItems())
			},
			// 分页触发
			change(e) {
				this.$refs.table.clearSelection()
				this.selectedIndexs.length = 0
				this.getData(e.current)
			},
			// 搜索
			search() {
				this.getData(1, this.searchVal)
			},
			// 获取数据
			// async getData() {
			// 	console.log("开始运行")
			// 	const userTable = await Kvite.buildDefaultKvite('testDb', 'user')
			// 	console.log("数据库加载成功")
			// 	this.tableData = await userTable.entries()
			// 	console.log("查询数据：", await userTable.entries())
			// 	console.log("数据是：", this.tableData)
			// },
			scroll: function(e) {
				// console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
			async getData(pageCurrent, value = '') {
				const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
				this.loading = true;
				this.pageCurrent = pageCurrent;
				
				//最下行
				const low = (pageCurrent - 1) * this.pageSize;
				//最上行
				const heigh = low + this.pageSize + 1;
				console.log("最高和最低值", low, heigh);
				console.log("开始查询");
				const pagingData = await userTable.allpaging(low, heigh);
				console.log("查询结果", pagingData);
				this.tableData = pagingData;
				this.loading = false;
				
			},
			// async entries() {
			//   const res = await this.selectSQL(
			//     `SELECT key, value FROM ${this.tableName}`
			//   );
			//   const entries = new Array(res.length);
			//   for (let i = 0; i < res.length; i++) {
			//     entries[i] = {
			//       key: this.keyDeserializer(res[i].key),
			//       value: this.valueDeserializer(res[i].value),
			//     };
			//   }
			//   return entries;
			// }
		}
	}
</script>

<style>
	/* .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	} */

	.uni-group {
		display: flex;
		align-items: center;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.btn-view {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		text-align: center;
		background-color: #fff;
		justify-content: center;
		align-items: center;
	}

	.btn-flex {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.button {
		margin: 20px;
		width: 150px;
		font-size: 14px;
		color: #333;
	}

	/* .text-area {
		display: flex;
		justify-content: center;
	} */

	/* .title {
		font-size: 36rpx;
		color: #8f8f94;
	} */
	
	
</style>
