// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

// data手动序列化，因为要保留后面的值为字符串json
export function addJobSalaryItem(data) {
  //
  console.log(data);
 var data = qs.stringify(data)
  return request({
    url:'/addJobSalaryItem',
    method:'post',
    data
  })
}
