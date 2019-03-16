<template>
  <div class="addMechanism">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
    <div class="main-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--做成组件切换-->
        <el-tab-pane label="查询职位类型" name="first">
          <keep-alive>
            <component :is="currentView">
              <!-- 非活动组件将被缓存！ -->
            </component>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="查询职位" name="second">
           <keep-alive>
            <component :is="currentView">
              <!-- 非活动组件将被缓存！ -->
            </component>
          </keep-alive>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
// 依赖组件
import searchJobVary from './comment/searchJobVary';
import searchJob from './comment/searchJob';
export default {
  name: 'addMechanism',
  data() {
    return {
      currentContentNName: '查询职位', // 通过路由传参数实现
      activeName: 'first',
      currentView: searchJobVary
    }
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 0) {
        this.currentView = searchJobVary;
      } else if (tab.index == 1) {
        this.currentView = searchJob;
      }
    }
  },
  components: {
    searchJobVary,
    searchJob
  }
}

</script>

<style scoped>
  .mg1 {
    margin-top: 0px !important;
  }

  .serchVary {
    width: 800px;
  }

  .change-input {
    width: 42% !important;
  }

  .search-input-wrap {
    margin-bottom: 10px;
  }

</style>
