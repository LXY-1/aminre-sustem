// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function addMechanism(data) {
	 var data = qs.stringify(data)
     return request({
		 url:'/addMechanis',
		 method:'post',
		 data
	 })
}
