<template>
  <div class="salarySendCheckDetails">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
    <div class="details-wrap">
      <el-row class="row-heigth">
        <el-col :span="6">
          <span>薪酬发放单编号：</span> <span prop="salarySendRegisterDetails.salaryRegisterCode">{{salarySendRegisterDetails.salaryRegisterCode}}</span>
        </el-col>
      </el-row>
      <el-row class="row-heigth">
        <el-col :span="6">
          <span>机构：</span> <span prop="salarySendRegisterDetails.mechanismName">{{salarySendRegisterDetails.mechanismName}}</span>
        </el-col>
      </el-row>
      <!--需表单验证区域的开始地方-->
      <el-form :model="salarySendRegisterDetails" :rules="rules" ref="salarySendRegisterDetails" label-width="100px" class="demo-ruleForm">
        <el-row class="row-heigth">
          <el-col :span="5">
            <span>总人数：</span> <span>{{salarySendRegisterDetails.nums}},</span>
            <span>基本薪酬总额:</span> <span>{{salarySendRegisterDetails.baseSalaryMoney}}</span>
          </el-col>
          <el-col :span="5">
            <el-form-item label="实发总额:" prop="realSalaryMoney" class="change-position">
              <el-input type="text" v-model="salarySendRegisterDetails.realSalaryMoney" placeholder="请输入实发总额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="登记人" prop="register" class="change-position1">
              <el-input v-model="salarySendRegisterDetails.register" placeholder="请输入登记人"></el-input>
            </el-form-item>

          </el-col>
          <el-col :offset="14" :span="5"><!--登记时间就是创建时间：salarySendRegisterDetails.registerTime-->
            <el-form-item label="登记日期" prop="registerTime" class="change-position1">
             <el-date-picker type="date" placeholder="选择登记日期" v-model="salarySendRegisterDetails.registerTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!--表单验证影响区域-->
      </el-form>
      <!--这个机构里面所有员工工资明细列表 ,其中这里面每一个员工的这个月的薪酬项目由后台查询相关表返回，下面的展示的项目暂时是固定那么多的，如果是null的就补个0-->
      <el-row>
        <el-col :span="24">
           <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="fileCode"
      label="档案编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="workerName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="baseMoney"
      label="基本工资"
      width="120">
    </el-table-column>
    <el-table-column
      prop="trafficSubsidy"
      label="交通补助"
      width="120">
    </el-table-column>
    <el-table-column
      prop="lunchSubsidy"
      label="午餐补助"
      width="120">
    </el-table-column>
    <el-table-column
      prop="communicationSubsidy"
      label="通信补助"
      width="120">
    </el-table-column>
     <el-table-column
      prop="endowmentInsurance"
      label="养老保险"
      width="120">
    </el-table-column>
     <el-table-column
      prop="unemploymentInsurance"
      label="失业保险"
      width="120">
    </el-table-column>
     <el-table-column
      prop="medicalInsurance"
      label="医疗保险"
      width="120">
    </el-table-column>
     <el-table-column
      prop="housingProvidentFund"
      label="住房公积金"
      width="120">
    </el-table-column>
     <el-table-column
      prop="incentiveMPF"
      label="奖励奖金"
      width="120">
    </el-table-column>
     <el-table-column
      prop="deductionMPF"
      label="应扣奖励金"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'salarySendCheckDetails',
  data() {
    return {
      currentContentNName: '薪酬发放复核明细', // 通过路由传参数实现
      salarySendRegisterDetails: {
        salaryRegisterCode: '00199',
        mechanismName: '公司/部门/测试组',
        nums: 9,
        baseSalaryMoney: 1500,
        realSalaryMoney: 1600,
        register: '',
        registerTime: ''

      },
      rules: {
        realSalaryMoney: [{
          required: true,
          message: '请输入实发金额',
          trigger: 'blur'
        }],
        register: [
          {
            required: true,
            message: '请输入登记人',
            trigger: 'blur'

          }
        ],
        registerTime: [
          {
            required: true,
            message: '请输入登记日期',
            trigger: 'blur'
          }
        ]
      },
      tableData: [{
        fileCode: '210120012',
        workerName: '王小虎',
        baseMoney: 5000,
        trafficSubsidy: 100,
        lunchSubsidy: 20,
        communicationSubsidy: 10,
        endowmentInsurance: 200,
        unemploymentInsurance: 100,
        medicalInsurance: 100,
        housingProvidentFund: 100,
        incentiveMPF: 10,
        deductionMPF: -10
      }]
    }
  }
}

</script>

<style scoped>
  .mg1 {
    margin-top: 0px !important;
    margin-bottom: 30px;
  }

  .row-heigth {
    margin-bottom: 20px;
  }

  .change-position {
    margin-top: -10px !important;
    margin-left: -10px;
  }

  .change-position1 {
    margin-left: -43px;
    margin-top: -20px;
  }

</style>
