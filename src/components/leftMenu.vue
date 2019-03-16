<template>
  <div class="leftMenu">
    <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="-1" disabled>
        <i class="el-icon-view"></i>
        <span slot="title">权限控制</span>
      </el-menu-item>
      <el-menu-item v-for="(item1,index1) in permissionMenu" :key="index1" :index="index1" v-if="item1.list.length==0">
        <i class="el-icon-view"></i>
        <span slot="title">{{item1.permissionName}}</span>
      </el-menu-item>
      <el-submenu v-if="item1.list.length>0" v-for="(item1,index1) in permissionMenu" :key="index1" :index="index1">
        <template slot="title"><i class="el-icon-view"></i><span>{{item1.permissionName}}</span></template>
        <el-menu-item v-if="item2.list.length==0" v-for="(item2,index2) in  item1.list" :key="index2" :index="index1 + '-' + index2">{{item2.permissionName}}</el-menu-item>
        <el-submenu v-if="item2.list.length>0" v-for="(item2,index2) in  item1.list" :key="index2" :index="index1 + '-' + index2">
          <template slot="title">{{item2.permissionName}}</template>
          <el-menu-item v-for="(item3,index3) in  item2.list" :key="index3" :index="index1 + '-' + index2 + '-' + index3 ">{{item3.permissionName}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'leftMenu',
  data() {
    return {
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
            routerUrl: '',
            level: 2,
            list: []

          },
          {
            permissionId: 4,
            permissionName: '职位设置',
            parentId: 2,
            routerUrl: '',
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
          list: [{
            permissionId: 6,
            permissionName: '设置薪酬项目',
            parentId: 5,
            routerUrl: '',
            level: 2,
            list: []
          }]
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
          routerUrl: '',
          level: 0,
          list: []

        },
        {
          permissionId: 8,
          permissionName: '人力资源档案登记复核',
          parentId: 0,
          routerUrl: '',
          level: 0,
          list: []

        },
        {
          permissionId: 8,
          permissionName: '人力资源档案查询',
          parentId: 0,
          routerUrl: '',
          level: 0,
          list: []

        },
        {
          permissionId: 8,
          permissionName: '人力资源档案登记',
          parentId: 0,
          routerUrl: '',
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
          routerUrl: '',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准登记复核',
          parentId: 0,
          routerUrl: '',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准查询',
          parentId: 0,
          routerUrl: '',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准发放登记',
          parentId: 0,
          routerUrl: '',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准发放登记复核',
          parentId: 0,
          routerUrl: '',
          level: 0,
          list: []
        },
        {
          permissionId: 8,
          permissionName: '薪酬标准发放查询', // 其实就是查询状态为已经复核的薪酬发放表
          parentId: 0,
          routerUrl: '',
          level: 0,
          list: []
        }
        ]

      }

      ] // 权限菜单，封装一个方法来获取与处理，导入需要的页面，这里面说一下权限菜单又后台根据不同的角色返回
    }
  },
	props: {
		'menuData':{
				
		}
	},
  methods: {

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
	watch: {
		menuData(newValue, oldValue) {
			   this.permissionMenu = newValue;
		}
	},
}

</script>

<style scoped>

</style>
