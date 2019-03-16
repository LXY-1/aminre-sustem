// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

// data手动序列化，因为要保留后面的值为字符串json
export function addSalaryItem(data) {
  // var data = qs.stringify(data)
  console.log(data);

  return request({
    url:'/addSalaryItem',
    method:'post',
    data
  })
}
