// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function userLogin(data) {
	// axios.post('/login', qs.JSON.stringify(data)).then(function(respone))
	 var data = qs.stringify(data)
     return request({
		 url:'/login',
		 method:'post',
		 data
	 })
}
