
// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function findMechanism(data) {
	 var data = qs.stringify(data)
     return request({
		 url:'/findMechanism',
		 method:'post',
		 data
	 })
}
