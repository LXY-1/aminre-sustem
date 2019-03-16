<template>
    <div class="checkFiles">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
      <div class="check-wrap">

           <h5>当前等待复核的人力资源档案总数是：<span>{{totalNum}}</span></h5>
          <div class="table-wrap">
       <el-table
    :data="tableData"
    border
    style="width:1098px">
    <el-table-column
      fixed
      prop="date"
      label="档案编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="性别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="一级机构"
      width="150">
    </el-table-column>
    <el-table-column
      prop="address"
      label="二级机构"
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="三级机构"
      width="150">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="职位名称"
      width="150">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">复核</el-button>
      </template>
    </el-table-column>
  </el-table>
      </div>
     </div>
    </div>
</template>

<script>
export default {
  name: 'checkFiles',
  data() {
    return {
      currentContentNName: '人力资源档案复核', // 通过路由传参数实现
      totalNum: 7,
      tableData: [
        {
          id: '04032',
          fileId: '20121170101',
          name: '张三',
          sex: '男',
          firstMechaina: '一级机构',
          secondMecha: '二级机构',
          thirdMechaina: '三级机构',
          jobName: '职位名称'
        }
      ]
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
      // 跳转到审核页面，传递详情id
      this.$router.push({name: 'checkPromoteFile', params: {id: row.id}});
    }
  }
}
</script>

<style scoped>
.mg1{
     margin-top:0px!important;
 }

 .check-wrap{
   margin-top:50px;
 }
</style>