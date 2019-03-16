<template>
    <div class="salaryCheck">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
      <div class="check-wrap">

           <h5>当前等待复核的薪酬标准登记总数是：<span>{{totalNum}}</span></h5>
          <div class="table-wrap">
       <el-table
    :data="tableData"
    border
    style="width:1098px">
    <el-table-column
      prop="salarystandCode"
      label="薪酬标准编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="jobName"
      label="薪酬标准职位名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="salaryMoney"
      label="薪酬标准总额"
      width="120">
    </el-table-column>
     <el-table-column
      prop="maker"
      label="登记人"
      width="150">
    </el-table-column>
    <el-table-column
      prop="register"
      label="制定人"
      width="150">
    </el-table-column>
    <el-table-column
      prop="registerTime"
      label="登记时间"
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
  name: 'salaryCheck',
  data() {
    return {
      currentContentNName: '薪酬标准登记复核', // 通过路由传参数实现
      totalNum: 7,
      tableData: [
        {
          id: '04032',
          salarystandCode: '',
          jobName: '',
          salaryMoney: '',
          maker: '',
          register: '',
          registerTime: ''
        }
      ]
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
      // 跳转到审核页面，传递详情id
      this.$router.push({name: 'checkPromoteSalary', params: {id: row.id}});
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