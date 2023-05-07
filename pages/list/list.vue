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
			<!-- <view class="uni-form-item uni-column">
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
			</view> -->
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	// import XlsExport from 'xlsexport';
	// import { createRequire } from 'module';
	// import uni from 'uni-app';
	// import XLSX from 'xlsx';
	// import uni from 'uni-app';
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
				const data = [{
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
				]
				console.log('form发生了submit事件，携带数据为：' + data)
				var formdata = data
				this.saveExcel(data);
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(data),
				// 	showCancel: false
				// });
				
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
				
				// 还未实现
				// TODO 判断文件是否存在，如果不存在则创建空文件
				const fs = require('fs');
				console.log("加载fs工具");
				const databaseFile = `${fs.rootPath}/data/data.xlsx`;
				uni.requestFileSystem({
				  // 指定文件系统的类型，这里使用临时文件系统
				  // 如果要持久保存文件，则需要使用本地文件系统
				  // 详情请参考文档：https://uniapp.dcloud.io/api/file/file-system?id=requestfilesystem
				  type: 0,
				  success(fs) {
				    // 获取文件信息
				    uni.getFileInfo({
				      filePath: `${fs.rootPath}/data/data.xlsx`,
				      success(res) {
				        console.log('文件已存在')
				      },
				      fail(err) {
				        console.log('文件不存在')
				      }
				    })
				  }
				})
				
				
				const XLSX = require('xlsx');
				console.log("加载Excel工具");
				
				// const workbook = XLSX.readFile(databaseFile);
				const workbook = XLSX.read(databaseFile, { type: 'binary' });
				console.log("打开excel成功");
				
				// 获取第一个工作表
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				console.log("获取第一个工作表成功");
				
				// 计算新数据的行数和列数
				const newRows = XLSX.utils.json_to_sheet(data);
				const range = XLSX.utils.decode_range(newRows['!ref']);
				const rowCount = range.e.r - range.s.r + 1;
				const colCount = range.e.c - range.s.c + 1;
				console.log("计算新数据的行数和列数rowCount:",rowCount,"colCount",colCount);
				
				// 将新数据添加到工作表中
				XLSX.utils.sheet_add_json(worksheet, data, {
				  origin: -1, // 从最后一行开始追加数据
				  skipHeader: true, // 不要在工作表中添加标题行
				  header: ['name', 'age'], // 指定标题行的字段名
				  originRow: worksheet['!ref'] ? range.e.r + 1 : 0, // 从第一行开始追加数据
				});
				console.log("将新数据添加到工作表中");
				
				// 更新工作表的范围
				worksheet['!ref'] = XLSX.utils.encode_range({
				  s: { c: 0, r: 0 }, // 左上角单元格的列号和行号
				  e: { c: colCount - 1, r: rowCount + range.e.r }, // 右下角单元格的列号和行号
				});
				console.log("更新工作表的范围");
				
				// 一定需要excel文件存在
				XLSX.writeFile(workbook, databaseFile);
				
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