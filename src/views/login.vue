<template>
  <div class="login">
    <div class="log">
	<div class="content1">
		<h2>LXY 人力资源管理系统</h2>
			<h3 class="color-font">欢迎管理员登录</h3>
		<form action="#123">
			<input type="text" name="username" v-model="user.userName" value="USERNAME" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请输入用户名';}">
			<input type="password" name="psw" v-model="user.password" value="PASSWORD" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = '请输入密码';}">
			<div class="button-row">
				<input type="button" class="sign-in" :value="info" :disabled="info=='登陆中...'" @click="promote">
				<input type="reset" class="reset" value="重置" @click="reset">
				<div class="clear"></div>
			</div>
		</form>
	</div>
	<!-- <div class="content2">
		<h2>Sign Up Form</h2>
		<form>
			<input type="text" name="userid" value="USERNAME" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'NAME AND SURNAME';}">
			<input type="tel" name="usrtel" value="PHONE" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'PHONE';}">
			<input type="email" name="email" value="EMAIL ADDRESS" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'EMAIL ADDRESS';}">
			<input type="password" name="psw" value="PASSWORD" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'PASSWORD';}">
			<input type="submit" class="register" value="Register">
		</form>
	</div> -->
	<div class="clear"></div>
</div>
<div class="footer">
	<p>COPYRIGHT  &copy; 1 2018 – 2018 TENCENT. ALL RIGHTS RESERVED. <a href="#123"  title="lxy">LXY事务所</a> - Collect from <a href="#123" title="lxy">LXY版权所有</a></p>
</div>
  </div>
</template>

<script>

	import {userLogin} from '../api/login/login.js';
	console.log(userLogin);

export default {
  name: 'login',
  data() {
    return {
      user: {
        userName: 'USERNAME',
        password: 'PASSWORD'
      },
			info:'登录'

    }
  },
  methods: {
    promote() {
				 console.log(this.user);
				 if (this.user.userName == 'USERNAME' || this.user.userName == '请输入用户名') {
        this.$message.error('用户不能为空！');
        return false;
				 } else if (this.user.password == 'PASSWORD' || this.user.password == '请输入密码') {
					   this.$message.error('用户不能为空！');
        return false;
				 }
         //提交
				 var data = {
					 userName:this.user.userName,
					 password:this.user.password
				 }
				 // 通过一层全局的封装：过滤错误码，全局提示，以及登录失效，一层：各个功能的封装，比如登录模块请求封装
				 // 最后在页面层只需关注请求成功后的数据业务逻辑的处理
				 // 通过封装达到真正的每一个地方只需关注业务逻辑，其他的东西尽可能已经全局或者是其他封装处理好了
				 // 以提高代码效率
				 this.info = '登陆中...'
         let loadingInstance = this.$loading({});

				 userLogin(data).then(respone => {
           loadingInstance.close();
					console.log(respone.code);
					this.info = '登陆'
					console.log(this.info);

					if(respone.code == 0){
						  // 跳转传递参数roleId
							 this.$message({
          message: '欢迎登录',
          type: 'success'
        });
							this.$router.push({name: 'home', params: {roleId: respone.roleId}});
							localStorage.setItem("user",JSON.stringify(respone));
					}
				}).catch(error => {
           loadingInstance.close();
					  this.info = '登陆'
				})


    },
		reset(){
			this.user.userName = "";
			this.user.password = "";
		}
  }
}

</script>

<style scoped>

@import '../styles/loginStyle.css';
.login{
      width: 100vw;
      height: 100vh;
      background-image: url(../../static/banner.jpg);
      background-size: 100% 100%;
      background-repeat: no-repeat;
}
.color-font{
	 color: #ffffff;
   margin-top: 10px;
}
.content1{
		 margin-left: 25%!important;
		 margin-top: 10%;
}
</style>
