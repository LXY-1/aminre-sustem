
// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function findAllSalaryItem() {
  return request({
    url:'/findAllSalaryItem',
    method:'post'
  })
}

export function findSalaryItemsByJob(data) {
  var data = qs.stringify(data)
  return request({
    url: '/findSalaryItemsByJob',
    method: 'post',
    data
  })
}
