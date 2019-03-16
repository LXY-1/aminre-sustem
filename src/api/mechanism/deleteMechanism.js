
// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function deleteteMechanism(data) {
  var data = qs.stringify(data)
  return request({
    url:'/deleteMechanism',
    method:'post',
    data
  })
}
