import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'
import header from '@/components/header'
import leftMenu from '@/components/leftMenu'
import welcome from '@/views/welcome/welcome'
import setMechanism from '@/views/set_mechanism/add_edit_mechanism'
import serchMechanism from '@/views/set_mechanism/serch_mechanism'
import addJob from '@/views/set_job/addJob'
import serchJob from '@/views/set_job/serchJob'
import addSalaryItems from '@/views/set_salaryItems/addSalaryItems'
import fileRegister from '@/views/file_management/fileRegister'
import checkFiles from '@/views/file_management/checkFiles'
import checkPromoteFile from '@/views/file_management/checkPromoteFile'
import serchFile from '@/views/file_management/serchFile'
import watchOrEditFile from '@/views/file_management/watchOrEditFile'
import registerSalary from '@/views/salaryManagement/registerSalary'
import salaryCheck from '@/views/salaryManagement/salaryCheck'
import checkPromoteSalary from '@/views/salaryManagement/checkPromoteSalary'
import salarySerch from '@/views/salaryManagement/salarySerch'
import salaryEdit from '@/views/salaryManagement/salaryEdit'
import salarySendRegister from '@/views/salaryManagement/salarySendRegister'
import salarySendRegisterDetails from '@/views/salaryManagement/salarySendRegisterDetails'
import salarySendCheck from '@/views/salaryManagement/salarySendCheck'
import salarySendCheckDetails from '@/views/salaryManagement/salarySendCheckDetails'
import login from '@/views/login'

Vue.use(Router)
Vue.component('systemHeader', header);
Vue.component('leftMenu', leftMenu);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      // 配置二级路由：这里是各个功能模块的入口，动态的获取菜单渲染的不只是菜单，还有这里的路由，也就是后面想办法实现动态配置路由在这里。二级路由映射的地方是home页面main部分
      children: [
        {
          path: '/',
          component: welcome

        },
        {
          path: '/setMechanism',
          name: 'setMechanism',
          component: setMechanism
        },
        {
          path: '/serchMechanism',
          name: 'serchMechanism',
          component: serchMechanism
        },
        {
          path: '/addJob',
          name: 'addJob',
          component: addJob
        },
        {
          path: '/serchJob',
          name: 'serchJob',
          component: serchJob
        },

        {
          path: '/addSalaryItems',
          name: 'addSalaryItems',
          component: addSalaryItems
        },

        {
          path: '/fileRegister',
          name: 'fileRegister',
          component: fileRegister
        },

        {
          path: '/checkFiles',
          name: 'checkFiles',
          component: checkFiles
        }, // component: serchFile
        {
          path: '/serchFile',
          name: 'serchFile',
          component: serchFile
        },
        {
          path: '/registerSalary',
          name: 'registerSalary',
          component: registerSalary
        },
        {
          path: '/salaryCheck',
          name: 'salaryCheck',
          component: salaryCheck
        },
        {
          path: '/salarySendRegister',
          name: 'salarySendRegister',
          component: salarySendRegister
        },
        {
          path: '/salarySerch',
          name: 'salarySerch',
          component: salarySerch
        },
        {
          path: '/checkPromoteFile',
          name: 'checkPromoteFile',
          component: checkPromoteFile
        }, {
          path: '/watchOrEditFile',
          name: 'watchOrEditFile',
          component: watchOrEditFile
        },
        {
          path: '/checkPromoteSalary',
          name: 'checkPromoteSalary',
          component: checkPromoteSalary
        },
        {
          path: '/salaryEdit',
          name: 'salaryEdit',
          component: salaryEdit
        },
        {
          path: '/salarySendRegisterDetails',
          name: 'salarySendRegisterDetails',
          component: salarySendRegisterDetails
        },
        {
          path: '/salarySendCheck',
          name: 'salarySendCheck',
          component: salarySendCheck
        },
        {
          path: '/salarySendCheckDetails',
          name: 'salarySendCheckDetails',
          component: salarySendCheckDetails
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login

    }
  ]
})
