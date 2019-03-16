<template>
  <div class="searchJobVary">
    <div class="serchVary">
      <div class="search-input-wrap">
       <el-row>
          <el-col :span="12">
            <el-input placeholder="关键词搜索" prefix-icon="el-icon-search" v-model="searchContent" class="change-input"
              @keyup.enter.native="searchVary">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="table-wrap">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="date" label="日期" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="500">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick1(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchJobVary',
  data() {
    return {
      searchContent: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '广东省',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '广东省',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '广东省',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '广东省',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    searchVary() {
      console.log(this.searchContent);
    },
    handleClick1(row) {
      console.log(row);
    }
  }
}

</script>

<style scoped>
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
