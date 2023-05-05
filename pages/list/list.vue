<template>
	<view class="text-area">
		<text class="title">{{title}}</text>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">村组名：</view>
				<input class="uni-input" v-model="villageName"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">运营商：</view>
				<input class="uni-input" v-model="operator"/>
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
				<input class="uni-input" v-model="consumption" placeholder="消费/月" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">是否办理融合：</view>
				<input class="uni-input" v-model="handle"/>
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
				<input class="uni-input" v-model="maturityTime"  />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">年龄段：</view>
				<input class="uni-input" v-model="age"placeholder="中年" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">家庭成员/人</view>
				<input class="uni-input" v-model="number"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">成员总共消费</view>
				<input class="uni-input" v-model="allConsumption"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">网络情况</view>
				<input class="uni-input" v-model="situation" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">联系电话</view>
				<input class="uni-input" v-model="telephone" type="tel" @input="validatePhone" placeholder="电话号码" />
				<div v-show="phoneInvalid" style="color: red;">请输入有效的手机号码</div>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">用网习惯</view>
				<input class="uni-input" v-model='habit' />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">是否意向用户</view>
				<input class="uni-input" v-model="intention" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	import XlsExport from 'xlsexport';
	// import { createRequire } from 'module';
	
	export default {
		data() {
			return {
				title: '信息输入',
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
				intention: '',
				phoneInvalid: false
			}
		},
		onLoad() {
	
		},
		methods: {
			validatePhone() {
			  // 使用正则表达式验证手机号码
			  const regExp = /^1[3456789]\d{9}$/
			  this.phoneInvalid = !regExp.test(this.telephone)
			},
			formSubmit: function(e) {
				//获取表单数据
				const data = {
					villageName: this.villageName,
					operator: this.operator,
					consumption: this.consumption,
					handle: this.handle,
					maturityTime: this.maturityTime,
					age: this.age,
					number: this.number,
					allConsumption: this.allConsumption,
					situation: this.situation,
					telephone: this.telephone,
					habit: this.habit,
					intention: this.intention
				}
				console.log('form发生了submit事件，携带数据为：' + data)
				var formdata = data
				this.saveExcel(JSON.stringify(data));
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(data),
					showCancel: false
				});
				
				// let dataex = [
				// 	['村组名', '运营商', '消费/月','是否办理融合', '融合到期时间', '年龄段','家庭成员', '成员总共消费', '网络情况','联系电话', '用网习惯', '是否意向用户']
				// ];
				
				// // 创建一个XlsExport对象并将数据传递给它
				// let xls = new XlsExport(dataex, 'data.xlsx', 'Sheet1');
				// console.log(xls);
				
				
				// // 使用xls.base64()方法将数据导出为Excel文件的Base64编码字符串
				// // let base64Str = xls.base64();
				
				// // 将Excel文件保存到用户手机中
				// uni.saveFile({
				//   tempFilePath: '../../static/data.xlsx',
				//   // tempFilePath: xls.mimeType(),
				//   // filePath: '@/data.xlsx',
				//   success: function (res) {
				//     console.log('Excel文件已保存到用户手机中');
				//   },
				//   fail: function (res) {
				//     console.log('保存Excel文件失败:', res.errMsg);
				//   }
				// });
			},
			
			saveExcel(data){
				console.log("***************保存Excel数据中。。。****************")
				console.log("*数据=>",data);
				
				const fs = require('fs');
				
				console.log("加载Excel工具");
				const ExcelJS = require('xlsx');
				const workbook = new ExcelJS.Workbook();
				
				const databaseLocd = '@/data.xlsx';
				workbook.xlsx.readFile(databaseLocd).then(() => {
				    const worksheet = workbook.getWorksheet('data');
					console.log('获取Excel工作表=>',worksheet)
				    worksheet.addRow(data);
					console.log('追加数据=>成功')
				    return workbook.xlsx.writeFile(databaseLocd);
				  }).then(() => {
				    console.log('File updated!');
				  }).catch((error) => {
				    console.log('Error:', error);
				    console.log('Error:', error.message);
				  });

				console.log("***************保存Excel数据---成功。。。****************")
			},
			
			// saveExcel(data){
			// 	console.log("***************保存Excel数据中。。。****************")
			// 	console.log("*数据=>",data);
			// 	const XLSX = require('xlsx');
			// 	console.log("Excel工具=>",XLSX);
			// 	// 读取现有Excel文件
			// 	const workbook = XLSX.readFile('@/static/data.xlsx');
				
			// 	console.log("Excel=>",workbook,"workbook.SheetNames",workbook.SheetNames);
			// 	// 选择要追加数据的工作表
			// 	const worksheet = workbook.Sheets['data'];
				
			// 	// 将数据转换为二维数组
			// 	// const data = [
			// 	//   ['New Value 1', 'New Value 2', 'New Value 3'],
			// 	//   ['New Value 4', 'New Value 5', 'New Value 6'],
			// 	// ];
				
			// 	// 获取工作表的最后一行的索引
			// 	const lastRowIndex = worksheet['!ref'].split(':')[1].slice(1);
				
			// 	console.log("获取工作表的最后一行的索引=>",lastRowIndex);
			// 	// 将新数据追加到工作表中
			// 	XLSX.utils.sheet_add_aoa(worksheet, data, { origin: +lastRowIndex + 1 });
				
			// 	console.log("将新数据追加到工作表中=>",成功);
			// 	// 保存Excel文件
			// 	XLSX.writeFile(workbook, '@/static/data.xlsx');
			// 	console.log("***************保存Excel数据---成功。。。****************")
			// },
			
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