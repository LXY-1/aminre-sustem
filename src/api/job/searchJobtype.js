// 封装登录请求
import request from '@/utils/request'
import qs from 'qs';

export function findAllJobType() {

  return request({
    url:'/findAllJobtype',
    method:'post',

  })
}
