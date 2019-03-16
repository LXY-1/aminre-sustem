// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function getMenuList(data) {
	// axios.post('/login', qs.JSON.stringify(data)).then(function(respone))
	 var data = qs.stringify(data)
     return request({
		 url:'/findPermissionMenuByRoleId',
		 method:'post',
		 data
	 })
}
