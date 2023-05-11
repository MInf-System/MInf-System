<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
			
			<button size="mini" type="default" @click="delTable">批量删除</button>
			
			<uni-section title="基本用法" type="line">
				<uni-search-bar @confirm="search" :focus="true" v-model="searchValue">
				</uni-search-bar>	
			</uni-section>
			
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
									<button class="uni-button" size="mini" type="primary" @click="updatedata(item)">修改</button>
									<button class="uni-button" size="mini" type="warn" @click="deletedata(item.key)">删除</button>
								</view>
							</uni-td>
						</uni-tr>
					</uni-table>
					<!-- <view class="uni-pagination-box"><uni-pagination prev-text="前一页" next-text="后一页" show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view> -->
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
				Key: 0,
				searchValue: '方家组',
				tableData: [],
				// // 每页数据量
				// pageSize: 4,
				// // 当前页
				// pageCurrent: 1,
				// // 数据总量
				// total: 10,
				loading: false
			}
		},
		onLoad() {
			this.selectedIndexs = [];
			this.getData(1);
		},
		methods: {
			//修改单行数据
			updatedata(e){
				console.log(e);
				//将对应的一行数据传输到修改页面
				const url = '/pages/index/updateData?data=' + encodeURIComponent(JSON.stringify(e));
				uni.navigateTo({
					url: url
				});
				this.getData(1);
			},
			
			//删除单行数据
			async deletedata(e){
				console.log(e);
				const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
				//获取数据库表名
				const tableName = userTable.tableName;
				//删除该行，防止出现唯一性约束异常
				await userTable.remove(e);
				// //更新记录
				// await userTable.executeSQL(
				// 	`UPDATE ${tableName} SET key = (key - 1) WHERE key > ${e}`
				// );
				//查询总记录数
				const all = await userTable.size();
				console.log("总数据", all);
				// console.log("全部数据结构", await userTable.entries());
				// //删除最后一行
				// await userTable.remove(all);
				//重新访问分页数据
				this.getData(1);
			},
			
			// input(res) {
			// 	console.log('----input:', res)
			// },
			// clear(res) {
			// 	uni.showToast({
			// 		title: 'clear事件，清除值为：' + res.value,
			// 		icon: 'none'
			// 	})
			// },
			// blur(res) {
			// 	uni.showToast({
			// 		title: 'blur事件，输入值为：' + res.value,
			// 		icon: 'none'
			// 	})
			// },
			// focus(e) {
			// 	uni.showToast({
			// 		title: 'focus事件，输出值为：' + e.value,
			// 		icon: 'none'
			// 	})
			// },
			// cancel(res) {
			// 	uni.showToast({
			// 		title: '点击取消，输入值为：' + res.value,
			// 		icon: 'none'
			// 	})
			// },
			// 搜索
			search() {
				console.log("触发搜索");
				this.getData(1, this.searchValue)
			},
			
			// 多选处理
			selectedItems() {
				return this.selectedIndexs.map(i => this.tableData[i]);
			},
			// 多选
			selectionChange(e) {
				console.log(e.detail.index)
				this.selectedIndexs = e.detail.index
			},
			//批量删除
			delTable() {
				console.log(this.selectedItems());
				const items = this.selectedItems();
				//调用删除
				this.delTableKV(items);
				//清空多选框
				this.selectedIndexs = [];
			},
			
			async delTableKV(datas){
				console.log("删除的数据为=>", datas);
				const selLen = datas.length;
				const dataKey = datas;
				console.log(selLen);
				const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
				console.log("获取数据库")
				//获取数据库表名
				const tableName = userTable.tableName;
				console.log("获取表")
				const keys = new Array(selLen);
				for (let i = 0; i < selLen; i++) {
					keys[i] = userTable.keySerializer(dataKey[i].key);
				};
				console.log("输出key列表=>", keys);
				/* const obj = Object.assign(keys);
				console.log("输出key列表=>", obj); */
				console.log("开始批量删除");
				await userTable.executeSQL(
					`DELETE FROM ${userTable.tableName} WHERE key IN (${keys.map(key => `'${key}'`).join(',')})`
				);
				console.log("删除结束")
				//查询总记录数
				const all = await userTable.size();
				console.log("总数据", all);
				//重新访问分页数据
				this.getData(1);
			},
			// // 分页触发
			// change(e) {
			// 	console.log("分页触发", e);
			// 	this.$refs.table.clearSelection();
			// 	this.selectedIndexs.length = 0;
			// 	this.getData(e.current);
			// },

			scroll: function(e) {
				// console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
			//获取数据
			async getData(pageCurrent, value = '') {
				
				const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
				
				this.loading = true;

				if(value.length == 0){
					console.log("非搜索查询");
					const pagingData = await userTable.entries();
					this.tableData = pagingData;
					this.loading = false;
				}else{
					console.log("搜索查询");
					this.searchData(value);
				}
			},
			
			//搜索功能
			async searchData(value){
				console.log("value值=>", value);
				const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
				//获取数据库表名
				const tableName = userTable.tableName;
				console.log("开始模糊匹配");
				const serializedValue = userTable.valueSerializer(value);
				const res = await userTable.selectSQL(
					// `UPDATE ${tableName} SET key = (key - 1) WHERE key > ${e}`
					`SELECT key, value FROM ${tableName} WHERE value LIKE '%${serializedValue}%'`
				);
				const searchs = new Array(res.length);
				for (let i = 0; i < res.length; i++) {
				  searchs[i] = {
				    key: userTable.keyDeserializer(res[i].key),
				    value: userTable.valueDeserializer(res[i].value),
				  };
				}
				this.tableData = searchs;
				console.log("结束模糊匹配");
				this.loading = false;
			}
			// //获取分页数据
			// async getData(pageCurrent, value = '') {
			// 	const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
			// 	this.loading = true;
			// 	this.pageCurrent = pageCurrent;
				
			// 	//最下行
			// 	const low = (pageCurrent - 1) * this.pageSize;
			// 	//最上行
			// 	const heigh = low + this.pageSize + 1;
			// 	console.log("最高和最低值", low, heigh);
			// 	console.log("开始查询");
			// 	const pagingData = await userTable.allpaging(low, heigh);
			// 	console.log("查询结果", pagingData);
			// 	this.tableData = pagingData;
			// 	this.loading = false;
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

	
	
</style>
