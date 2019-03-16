// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function addSalaryStandardItem(data) {
  // var data = qs.stringify(data)
  return request({
    url:'/addSalaryStandardItem',
    method:'post',
    data
  })
}
