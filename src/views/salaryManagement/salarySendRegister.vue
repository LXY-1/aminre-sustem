<template>
    <div class="salarySendCheck">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
      <div class="check-wrap">

           <h5>当前等待登记的薪酬发放记录总数是：<span>{{totalNum}}</span></h5>
          <div class="table-wrap">
       <el-table
    :data="tableData"
    border
    style="width:1200px">
    <el-table-column
      prop="salaryRegisterCode"
      label="薪酬发放单编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="firstMechanismName"
      label="I级机构"
      width="180">
    </el-table-column>
    <el-table-column
      prop="secondMechanismName"
      label="II级机构"
      width="180">
    </el-table-column>
     <el-table-column
      prop="thirdMechanismName"
      label="III级机构"
      width="180">
    </el-table-column>
    <el-table-column
      prop="nums"
      label="人数"
      width="150">
    </el-table-column>
    <el-table-column
      prop="totalMoney"
      label="基本薪酬总额"
      width="150">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="registerIt(scope.row)">登记</el-button>
      </template>
    </el-table-column>
  </el-table>
      </div>
     </div>
    </div>
</template>

<script>
export default {
  name: 'salarySendCheck',
  data() {
    return {
      currentContentNName: '薪酬标准发放登记', // 通过路由传参数实现
      totalNum: 7,
      tableData: [
        {
          salaryRegisterId: '04032',
          salaryRegisterCode: '',
          firstMechanismName: '',
          secondMechanismName: '',
          thirdMechanismName: '',
          nums: '',
          totalMoney: ''
        }
      ]
    }
  },
  methods: {
    registerIt(row) {
      console.log(row);
      // 跳转到审核页面，传递详情id
      this.$router.push({name: 'salarySendRegisterDetails', params: {id: row.salaryRegisterId}});
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