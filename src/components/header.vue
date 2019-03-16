<template>
  <!--顶部菜单：在父组件：父页面对菜单数据处理好结构，传给子组件，也就是这里将那些渲染-->
  <div class="header">
    <el-row>
      <el-col :span="1" class="color-w"><img src="../assets/img/brand.png" class="brand-style" title="收缩左侧菜单栏" alt="收缩左侧菜单栏" @click="toggleLeftMenu"></el-col>
      <el-col :span="4" class="color-w brand-font mg">人力资源管理系统</el-col>
      <el-col :span="15" class="color-w brand-font mg color-gray">
        <el-menu :default-active="activeIndex2" class="el-menu-demo el-menu-change" mode="horizontal" @select="handleSelect"
          text-color="#fff" background-color="#222" active-text-color="#ffd04b">
          <!--这个组件的下面所欲的展开层依赖的都是这里内联的背景颜色-->
          <el-menu-item index="-1" disabled="">权限控制</el-menu-item>
           <el-menu-item  v-for="(item1,index1) in permissionMenu" :key="index1" :index="index1" v-if="item1.list.length==0" @click="intoPage(item1.routerUrl)">{{item1.permissionName}}</el-menu-item>
          <el-submenu v-if="item1.list.length>0" v-for="(item1,index1) in permissionMenu" :key="index1" :index="index1">
            <template slot="title">{{item1.permissionName}}</template>
             <el-menu-item v-if="item2.list.length==0"  v-for="(item2,index2) in  item1.list" :key="index2" :index="index1 + '-' + index2" @click="intoPage(item2.routerUrl)">{{item2.permissionName}}</el-menu-item>
            <el-submenu v-if="item2.list.length>0" v-for="(item2,index2) in  item1.list" :key="index2" :index="index1 + '-' + index2">
              <template slot="title">{{item2.permissionName}}</template>
              <el-menu-item v-for="(item3,index3) in  item2.list" :key="index3"  :index="index1 + '-' + index2 + '-' + index3 " @click="intoPage(item3.routerUrl)">{{item3.permissionName}}</el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-menu>
      </el-col>
      <el-col :span="3" class="color-w brand-font mg mg1">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="fa fa-user-circle-o fa-2x color-w"></span> <span class="color-w">{{userNameVal}}</span><i class="el-icon-arrow-down el-icon--right color-w"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="loginOut" v-if="isLogin">退出</el-dropdown-item>
            <el-dropdown-item v-if="!isLogin">登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
			userNameVal:'admine',
			isLogin:false,
      activeIndex: '-1',
      activeIndex2: '-1',
      permissionMenu: [{
        permissionId: 1,
        permissionName: '系统设置',
        parentId: 0,
        routerUrl: '',
        level: 0,
        list: [{
          permissionId: 2,
          permissionName: '人力资源档案管理设置',
          parentId: 1,
          routerUrl: '',
          level: 1,
          list: [{
            permissionId: 3,
            permissionName: '机构设置',
            parentId: 2,
            routerUrl: 'setMechanism',
            level: 2,
            list: []

          },
          {
            permissionId: 3,
            permissionName: '机构查询',
            parentId: 2,
            routerUrl: 'serchMechanism',
            level: 2,
            list: []

          },
          {
            permissionId: 4,
            permissionName: '职位设置',
            parentId: 2,
            routerUrl: 'addJob',
            level: 2,
            list: []
          },
          {
            permissionId: 4,
            permissionName: '职位查询',
            parentId: 2,
            routerUrl: 'serchJob',
            level: 2,
            list: []
          }

          ]

        },
        {
          permissionId: 5,
          permissionName: '人力资源薪酬管理设置',
          parentId: 1,
          routerUrl: '',
          level: 1,
          list: [
            {
              permissionId: 6,
              permissionName: '设置薪酬项目',
              parentId: 5,
              routerUrl: 'addSalaryItems',
              level: 2,
              list: []
            }
          ]
        }

        ]
      },
      {
        permissionId: 7,
        permissionName: '人力资源档案管理',
        parentId: 0,
        routerUrl: '',
        level: 0,
        list: [{
          permissionId: 8,
          permissionName: '人力资源档案登记',
          parentId: 0,
          routerUrl: 'fileRegister',
          level: 0,
          list: []

        },
        {
          permissionId: 8,
          permissionName: '人力资源档案登记复核',
          parentId: 0,
          routerUrl: 'checkFiles',
          level: 0,
          list: []

        },
        {
          permissionId: 8,
          permissionName: '人力资源档案查询',
          parentId: 0,
          routerUrl: 'serchFile',
          level: 0,
          list: []

        }
        ]
      },
      {
        permissionId: 8,
        permissionName: '人力资源薪酬管理',
        parentId: 0,
        routerUrl: '',
        level: 0,
        list: [{
          permissionId: 8,
          permissionName: '薪酬标准登记',
          parentId: 0,
          routerUrl: 'registerSalary',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准登记复核',
          parentId: 0,
          routerUrl: 'salaryCheck',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准查询',
          parentId: 0,
          routerUrl: 'salarySerch',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准发放登记',
          parentId: 0,
          routerUrl: 'salarySendRegister',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准发放登记复核',
          parentId: 0,
          routerUrl: 'salarySendCheck',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准发放查询', // 其实就是查询状态为已经复核的薪酬发放表
          parentId: 0,
          routerUrl: '#',
          level: 0,
          list: []
        }
        ]

      }

      ] // 权限菜单，封装一个方法来获取与处理，导入需要的页面，这里面说一下权限菜单又后台根据不同的角色返回
    }
	},
	props: {
		'userName': {
			type: String,
		},
		'menuData':{
			  
		}
	},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleLeftMenu() {
      // 子组件传值控制父组件触发一个事件，需要通过触发事件
      this.$emit('toggleLeftMenu', 0);
    },
    intoPage(url) {
      console.log(url);
      this.$router.push({name: url});
    },
		loginOut(){
			 
			 console.log(0)
			 alert(0)
			 this.$router.replace({
			 	path: '/login'
			 })
		}
  },
	watch: {
		userName(newValue, oldValue) {
			   this.userNameVal = newValue;
    		 // 其他关于props属性数据的操作
				 this.isLogin = true;
		},
		menuData(newValue,oldValue){
			  this.permissionMenu = newValue; 
				console.log(this.permissionMenu);
		}
	},

}

</script>

<style scoped>
  .header {
    padding-top: 10px;
  }

  .brand-style {
    width: 40px;
    height: 40px;
    margin-top: -6px;
    cursor: pointer;
  }

  .mg {
    margin-left: 10px !important;
    margin-top: 5px;
  }

  .el-menu-change {
    margin-top: -21px;

  }

  .el-menu.el-menu--horizontal {
    border-bottom: solid 1px #222;
  }

  .mg3 {
    margin-top: -10px !important;

  }

</style>
