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
				<radio-group name="radio">
					<label>
						<radio v-model="operator" value="电信" /><text>电信</text>
					</label>
					<label>
						<radio v-model="operator" value="移动" /><text>移动</text>
					</label>
					<label>
						<radio v-model="operator" value="联通" /><text>联通</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">消费/月：</view>
				<input class="uni-input" type="number" v-model="consumption" placeholder="消费/月" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">是否办理融合：</view>
				<radio-group name="radio">
					<label>
						<radio v-model="handle" value="是" /><text>是</text>
					</label>
					<label>
						<radio v-model="handle" value="否" /><text>否</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">融合到期时间：</view>
				<input class="uni-input" v-model="maturityTime" focus />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">年龄段：</view>
				<input class="uni-input" v-model="age" focus placeholder="中年" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">家庭成员/人</view>
				<input class="uni-input" v-model="number" type="number"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">成员总共消费</view>
				<input class="uni-input" v-model="allConsumption" type="number"/>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">网络情况</view>
				<input class="uni-input" v-model="situation" focus placeholder="一般" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">联系电话</view>
				<input class="uni-input" v-model="telephone" type="tel" @input="validatePhone" placeholder="电话号码" />
				<div v-show="phoneInvalid" style="color: red;">请输入有效的手机号码</div>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">用网习惯</view>
				<input class="uni-input" v-model='habit' type="number"  />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">是否意向用户</view>
				<input class="uni-input" v-model="intention"  type="number" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '信息输入',
				villageName: '',
				operator: '电信',
				consumption: 0,
				handle: '是',
				maturityTime: '',
				age: '',
				number: 0,
				allConsumption: 0,
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
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(data))
				var formdata = data
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(data),
					showCancel: false
				});
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