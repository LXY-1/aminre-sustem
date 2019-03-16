
// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function updateMechanism(data) {
  var data = qs.stringify(data)
  return request({
    url:'/updateMechanism',
    method:'post',
    data
  })
}
