// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 简单注册几个全局变量
Vue.prototype.isLogin = false; // 判断登录状态的，登录成功设置为true，但是介于刷新之后有重置了，比较麻烦，这里登录状态我使用html5的缓存实现

// 注册一个全局的判断是否为'',null,或者是undefined的方法
Vue.prototype.isNull = function(val) {
  if (val == '' || val == null || val == undefined || val == 'null') {
    return true;
  }

  return false;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
