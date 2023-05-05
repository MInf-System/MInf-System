<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'index1',
			}
		},
		onLoad() {
		// 	let data = [
		// 		['村组名', '运营商', '消费/月','是否办理融合', '融合到期时间', '年龄段','家庭成员', '成员总共消费', '网络情况','联系电话', '用网习惯', '是否意向用户']
		// 	];
			
		// 	// 获取static目录的绝对路径
		// 	let staticPath = uni.getStorageSync('static');
		
		// 	// 拼接Excel文件的路径
		// 	let filePath = `${staticPath}/data.xlsx`;
		
		// 	// 创建一个XlsExport对象，并设置文件名和工作表名称
		// 	let xls = new XlsExport(data, 'data.xlsx', 'Sheet1');
		
		// 	// 将数据导出为Excel文件，并使用uni.saveFile方法将文件保存到用户手机中
		// 	uni.saveFile({
		// 		tempFilePath: xls.base64(),
		// 		filePath: filePath,
		// 		success: function (res) {
		// 		  console.log('Excel文件已保存到用户手机中');
		// 		},
		// 		fail: function (res) {
		// 		  console.log('保存Excel文件失败:', res);
		// 		}
		// 	});
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
