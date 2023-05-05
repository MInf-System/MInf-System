/**
 * 分页读取Excel文件数据
 * @param {Object} int pageNo 页码
 * @param {Object} int pageSize 大小
 */

// export function read(int pageNo,int pageSize){
// 	// 分页默认前十行
// 	pageNo = pageNo == null || pageNo === 0 ? 1 : pageNo;
// 	pageSize = pageSize == null || pageSize === 0 ? 10 : pageSize;
	
// 	// 分页查询Excel的行数
// 	pageNo = pageNo * pageSize;
// 	pageSize = pageNo + pageSize;
	
// 	// 导入SheetJS库
// 	const XLSX = require('xlsx');
	
// 	// 读取Excel文件 默认是相对路径
// 	const workbook = XLSX.readFile('../static/data/cus_info.xlsx');
	
// 	// 获取第一个工作表
// 	const worksheet = workbook.Sheets[workbook.SheetNames[0]];
	
// 	/ 指定要读取的行数
// 	const range = {s: {r: pageNo}, e: {r: pageSize}}; // 读取前10行

// 	// 将工作表转换为JSON对象
// 	const data = XLSX.utils.sheet_to_json(worksheet, {header:1, range});
	
// 	// 输出结果
// 	console.log(data);
	
// 	return data;
// }

