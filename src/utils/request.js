import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { Loading } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: 'http://localhost:8080/humanResource/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

// 基本上一下子使用一个封装的ajax除了快速了解它关于全局配置的api以及发送
// 请求的api之外还要了解下面两点：
// 1、axios使用的默认Content-Type,以及默认发送给后台的格式是什么。
// 2、如果不符合需要怎么处理，怎么使用api设置

// 进行请求前与请求后的拦截：请求前是：参数序列化(我不再请求前拦截之后参数序列化，
// 在二层封装里面我再对所有参数进行序列化，便于个别不需要序列化的请求，不至于删除拦截器
// 请求后是拦截错误
var loadingInstance;

service.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  error => {
    return error;
  }
)

// response interceptor
service.interceptors.response.use(
  /**
	 * 下面的注释为通过在response里，自定义code来标示请求状态
	 * 当code返回如下情况则说明权限有问题，登出并返回到登录页
	 * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
	 * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
	 */
  response => {
    const res = response.data;
    console.log(response);
    if (res.code == -1) {
      localStorage.setItem('user', null);
      // 请自行在引入 MessageBox
      // import { Message, MessageBox } from 'element-ui'
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        router.replace({
          path: '/login'
        })
      })
    } else if (res.code == 1) {
      Message({
        message: '添加失败',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code == 2) {
      Message({
        message: '查询失败',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code == 3) {
      Message({
        message: '修改失败',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code == 4) {
      Message({
        message: '删除失败',
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code == 5) {
      Message({
        message: '登录失败',
        type: 'error',
        duration: 5 * 1000
      })
    }
		   // 本来是想全局拦截一些错误，但是由于配置的loading需要在不管是错误码都做处理，所以需要返回
    else {
      return Promise.resolve(res);
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service;
