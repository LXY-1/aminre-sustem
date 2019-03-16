<template>
  <!--首页：主题内容是：欢迎:xxxx,以及一张图片-->
  <!--main部分采用嵌套路由形式 <router-view/>-->
  <div class="home">
    <el-container>
      <el-header class="bg-dark">
        <!--头部组件，请求的菜单数据在父组件传递给头部、以及左侧导航菜单栏组件-->
        <system-header :userName="user.userName" :menuData="menuLists" @toggleLeftMenu="changeLeftMenu"></system-header>
      </el-header>
      <el-container>
        <el-aside  class="left-menu-style" :style="{marginLeft:leftMargin+'px'}">
          <!--左侧菜单栏-->
         <left-menu :menuData="menuLists"></left-menu>
        </el-aside>
        <el-main>
          <!--主体内容部分,二级路由映射，不同权限功能菜单内容-->
          <router-view></router-view>
        </el-main>
      </el-container>
        <el-footer class="bg-dark height-change">
           <div class="footer-content color-w">
                <h6>COPYRIGHT © 1 2018 – 2018 TENCENT. ALL RIGHTS RESERVED.</h6>
                <h6>LXY公司 版权所有</h6>
           </div>
        </el-footer>
    </el-container>
  </div>
</template>

<script>

	import {getMenuList} from '../api/menu/permissionMenu.js';

export default {
  name: 'home',
  data() {
    return {
      leftMargin: 0,
      menuLists: [],
			user:{
				userName:'',
			}
    }
  },
  mounted() {
          ///todo:刷新一下页面，有个bug，二级菜单出不来


				 //每次刷新调用，判断是否登录有效（home.vue是其他功能页面的入口)
         this.issitllLogin();






  },
  methods: {

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeLeftMenu() {
      this.leftMargin = this.leftMargin == 0 ? -220 : 0;
    },
		issitllLogin(){

			if(this.isNull(localStorage.getItem("user"))){
						 this.$confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
							confirmButtonText: '重新登录',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$router.replace({
								path: '/login'
							})
						})
			}
			else{

							this.user.userName = JSON.parse(localStorage.getItem("user")).userName;
							//有效才调用获取菜单的接口
              //获取权限菜单
               this.getMenu();
			}

		},
		getMenu(){
        let loadingInstance = this.$loading({});
			  let data = {
					roleId:JSON.parse(localStorage.getItem("user")).roleId
				}
			  getMenuList(data).then( respone =>{
          loadingInstance.close();
					  console.log(respone);
						this.menuLists = respone;
				}).catch(error =>{
          loadingInstance.close();
					   console.log(error);
				})
		}
  }
}

</script>

<style scoped>
.el-aside{
   min-height:800px;
   padding-bottom:45px!important;
   background-color: rgb(84, 92, 100);

}
.footer-content{
   width: 100%;
   text-align: center;

}
.height-change{
   height:110px!important;

}
.left-menu-style{
  min-width: 200px;
  transition: all 1s;
}
</style>
