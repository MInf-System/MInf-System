<template>
	<view class="text-area">
		<text class="title">{{title}}</text>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">村组名：</view>
				<input class="uni-input" v-model="tableData.villageName"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">运营商：</view>
				<input class="uni-input" v-model="tableData.operator"/>
				<!-- <radio-group name="radio">
					<label>
						<radio v-model="operator" value="电信" /><text>电信</text>
					</label>
					<label>
						<radio v-model="operator" value="移动" /><text>移动</text>
					</label>
					<label>
						<radio v-model="operator" value="联通" /><text>联通</text>
					</label>
				</radio-group> -->
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">消费/月：</view>
				<input class="uni-input" v-model="tableData.consumption" placeholder="消费/月" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">是否办理融合：</view>
				<input class="uni-input" v-model="tableData.handle"/>
				<!-- <radio-group v-model="handle">
					<label>
						<radio name="yes" value="yes" /><text>是</text>
					</label>
					<label>
						<radio name="no" value="no" /><text>否</text>
					</label>
				</radio-group> -->
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">融合到期时间：</view>
				<input class="uni-input" v-model="tableData.maturityTime"  />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">年龄段：</view>
				<input class="uni-input" v-model="tableData.age"placeholder="中年" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">家庭成员/人</view>
				<input class="uni-input" v-model="tableData.number"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">成员总共消费</view>
				<input class="uni-input" v-model="tableData.allConsumption"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">网络情况</view>
				<input class="uni-input" v-model="tableData.situation" />
			</view>
			<!-- <view class="uni-form-item uni-column">
				<view class="title">联系电话</view>
				<input class="uni-input" v-model="tableData.telephone" type="tel" @input="validatePhone" placeholder="电话号码" />
				<div v-show="phoneInvalid" style="color: red;">请输入有效的手机号码</div>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">用网习惯</view>
				<input class="uni-input" v-model='tableData.habit' />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">是否意向用户</view>
				<input class="uni-input" v-model="tableData.intention" />
			</view> -->
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	import Kvite from '../../js_sdk/x-kvite/kvite-0.0.5/kvite.js';
	// import path from  'path';
	// import XlsExport from 'xlsexport';
	// import { createRequire } from 'module';
	// import uni from 'uni-app';
	// import XLSX from 'xlsx';
	// import uni from 'uni-app';
	export default {
		data() {
			return {
				title: '信息输入',
				tableData: {
					villageName: '',
					operator: '',
					consumption: '',
					handle: '',
					maturityTime: '',
					age: '',
					number: '',
					allConsumption: '',
					situation: '',
					telephone: '',
					habit: '',
					intention: ''
				},
				restData: {},
				phoneInvalid: false
			}
		},
		onLoad() {
			this.restData = this.tableData;
		},
		methods: {
			validatePhone() {
			  // 使用正则表达式验证手机号码
			  const regExp = /^1[3456789]\d{9}$/;
			  this.phoneInvalid = !regExp.test(this.telephone);
			},
			formSubmit: function(e) {
				//获取表单数据
				const data = this.tableData;
				this.tableData = this.restData;
				console.log('form发生了submit事件，携带数据为：' + data);
				// var formdata = data;
				this.saveExcel(data);
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(data),
				// 	showCancel: false
				// });
				
			},
			
			//将数据保存在数据库
			async saveExcel(data){
				console.log("***************保存Excel数据中。。。****************")
				console.log("*数据=>",data);
				
				//创建数据库对象和数据库对象的表对象
				const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
				
				console.log(await userTable.size());
				
				//查询最后一个key值
				const value = await userTable.selectSQL(
					`SELECT key, value FROM ${userTable.tableName} ORDER BY key DESC LIMIT 1`
				);
				
				console.log("查询最后一个key值", value);
				
				//计算保存数据的key值
				const keyData = await userTable.size() == 0? 1 : parseInt(userTable.keyDeserializer(value[0].key)) + 1;
				
				console.log("下一保存key值：",keyData);
				//保存数据
				await userTable.put(keyData, data);	
				
				console.log("数据库中全部值=>", await userTable.values());
				
				// 还未实现
				// TODO 判断文件是否存在，如果不存在则创建空文件
				// const fs = require('fs');
				// console.log("加载fs工具");
				// const databaseFile = `../../data/data.xlsx`;
				// const databaseFile = path.resolve(__dirname, '../../data/data.xlsx');
				// uni.getFileInfo({
				//   // 指定文件系统的类型，这里使用临时文件系统
				//   // 如果要持久保存文件，则需要使用本地文件系统
				//   // 详情请参考文档：https://uniapp.dcloud.io/api/file/file-system?id=requestfilesystem
				//   type: 0,
				//   success(fs) {
				//     // 获取文件信息
				//     uni.getFileInfo({
				//       filePath: `/data/data.xlsx`,
				//       success(res) {
				//         console.log('文件已存在')
				//       },
				//       fail(err) {
				//         console.log('文件不存在')
				//       }
				//     })
				//   }
				// })
				
				// const XLSX = require('xlsx');
				// console.log("加载Excel工具");
				
				// // const workbook = XLSX.readFile(databaseFile);
				// const workbook = XLSX.read(databaseFile, { type: 'binary' });
				// console.log("打开excel成功");
				
				// // 获取第一个工作表
				// const sheetName = workbook.SheetNames[0];
				// const worksheet = workbook.Sheets[sheetName];
				// console.log("获取第一个工作表成功");
				
				// // 计算新数据的行数和列数
				// const newRows = XLSX.utils.json_to_sheet(data);
				// const range = XLSX.utils.decode_range(newRows['!ref']);
				// const rowCount = range.e.r - range.s.r + 1;
				// const colCount = range.e.c - range.s.c + 1;
				// console.log("计算新数据的行数和列数rowCount:",rowCount,"colCount",colCount);
				
				// // 将新数据添加到工作表中
				// XLSX.utils.sheet_add_json(worksheet, data, {
				//   origin: -1, // 从最后一行开始追加数据
				//   skipHeader: true, // 不要在工作表中添加标题行
				//   header: ['name', 'age'], // 指定标题行的字段名
				//   originRow: worksheet['!ref'] ? range.e.r + 1 : 0, // 从第一行开始追加数据
				// });
				// console.log("将新数据添加到工作表中");
				
				// // 更新工作表的范围
				// worksheet['!ref'] = XLSX.utils.encode_range({
				//   s: { c: 0, r: 0 }, // 左上角单元格的列号和行号
				//   e: { c: colCount - 1, r: rowCount + range.e.r }, // 右下角单元格的列号和行号
				// });
				// console.log("更新工作表的范围");
				
				// // 一定需要excel文件存在
				// XLSX.writeFileXLSX(workbook, databaseFile);
				
				// 只能保存文件，不能新增
				// 将 workbook 转换成二进制数据
				
				// const wbout = XLSX.write(workbook, {bookType:'xlsx', type:'array'});
				
				// 定义保存文件的文件名和文件类型
				// uni.saveFile({
				//   tempFilePath: '/static/data/data.xlsx',
				//   filePath: '/static/data/data.xlsx',
				//   success: function(res) {
				//     // 保存成功
				//     console.log('saveFile success', res);
				//     console.log('saveFile success', res.savedFilePath);
				//   },
				//   fail: function(err) {
				//     // 保存失败
				//     console.log('saveFile fail', err);
				//   },
				//   complete: function() {
				//     // 保存完成
				//     console.log('saveFile complete');
				//   },
				//   data: wbout
				// });
				
				
				console.log("保存excel");

				console.log("***************保存Excel数据---成功。。。****************")
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>
	
	.uni-form-item .uni-input {
		height: 20px;
		width: 70%;
		font-size: 15px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}
</style>