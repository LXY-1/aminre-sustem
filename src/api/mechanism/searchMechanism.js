
// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function findAllMechanism() {
  return request({
    url:'/findAllMechanism',
    method:'post'
  })
}

export function findMechanismByName(data) {
  var data = qs.stringify(data)
  return request({
    url:'/findMechanismByName',
    method:'post',
    data
  })
}
