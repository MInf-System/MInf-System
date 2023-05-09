<template>
	<view class="text-area">
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
				<button form-type="submit" >Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	import Kvite from '../../js_sdk/x-kvite/kvite-0.0.5/kvite.js';
	export default {
		data() {
			return {
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
				key: 0,
				restData: {},
				phoneInvalid: false
			}
		},
		onLoad: function (option) { 
			if (option.data) {
			    const encodedData = option.data;
			    const decodedData = decodeURIComponent(encodedData);
			    const data = JSON.parse(decodedData);
			    console.log(data);
			    // 在这里可以使用解码后的数据进行后续操作
				console.log(data.key);
				console.log(data.value);
				this.key = data.key;
				this.restData = this.tableData;
				this.tableData = data.value;
				console.log(this.tableData);
			}else{
				console.log("传递值失败");
			}
		},
		methods: {
			validatePhone() {
			  // 使用正则表达式验证手机号码
			  const regExp = /^1[3456789]\d{9}$/;
			  this.phoneInvalid = !regExp.test(this.telephone);
			},
			
			formSubmit: function(e) {
				console.log("数据为=>",this.tableData);
				//获取修改表单数据
				const data = this.tableData;
				this.tableData = this.restData;
				//获取修改的key值
				const key = this.key;
				this.updataData(data, key);
			},
			
			async updataData(data, key){
				console.log("*数据=>",data);
				console.log("键值", key);
				
				//创建数据库对象和数据库对象的表对象
				const userTable = await Kvite.buildDefaultKvite('testDb', 'user');
				
				console.log(await userTable.size());
				
				//删除对应key的数据，
				await userTable.remove(key);
				
				//添加对应key的数据
				await userTable.put(key, data);
				
				console.log("修改成功");
				
				
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
