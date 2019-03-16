// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function findAllJob() {

  return request({
    url:'/findAllJob',
    method:'post',

  })
}
