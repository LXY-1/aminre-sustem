<template>
    <div class="welcome">
            <h5 class="mg1" v-if="isLogin">欢迎 <span class="color-userName">{{userName}}管理员</span> 进入本系统,你可以阅读 <a href="http://element-cn.eleme.io/#/zh-CN/component/typography">使用指南</a> </h5>
						<h5 class="mg1" v-if="!isLogin">欢迎使用本系统,你可以阅读 <a href="http://element-cn.eleme.io/#/zh-CN/component/typography">使用指南。</a> 或者是<a href="#12" @click="loginMe">登录本系统</a></h5>

    </div>
</template>

<script>
export default {
  name: 'welcome',
	data() {
		return {
			userName:'',
			isLogin:false
		}
	},
	mounted() {
		

		 if(this.isNull(localStorage.getItem("user"))){
			        this.isLogin = false;
		 }
		 else{
			         this.isLogin = true;
							 this.userName = JSON.parse(localStorage.getItem("user")).userName;
		 }
		 
		 
	},
	methods: {
		loginMe() {
			
			   this.$router.push({name:'login'});
		},
		issitllLogin(){
			
		}
	},
	 
}
</script>

<style scoped>
 .mg1{
     margin-top:0px!important;
 }
 .color-userName{
	   color:  rgb(17, 85, 204);
 }
 

</style>