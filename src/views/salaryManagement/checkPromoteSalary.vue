<template>
  <!--薪酬项目的特点是根据角色获取对应薪酬需要输入的项目-->
  <div class="checkPromoteSalary">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
    <div class="salary-wrap">
      <el-row>
        <el-col :span="24">
          <div class="float-right">
            <el-button type="success" plain :loading="isPromote" size="small" @click="submitForm('formLabelAlign')">复核通过</el-button>
            <el-button type="info" plain size="small" @click="back">返回</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="form-wrap">
        <el-form status-icon label-position="right" label-width="110px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign"
          class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="薪酬标准编号" prop="salarystandCode">
                <el-input v-model="formLabelAlign.salarystandCode" placeholder="请输入薪酬标准编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪酬标准职位" prop="jobName">
                <el-select v-model="formLabelAlign.jobName" placeholder="请选择薪酬标准职位" class="width-100">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="薪酬总额" prop="salaryMoney">
                <el-input v-model="formLabelAlign.salaryMoney" placeholder="根据薪酬项目计算薪酬总额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="制定人" prop="maker">
                <el-input v-model="formLabelAlign.maker" placeholder="请输入制定人名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记人" prop="register">
                <el-input v-model="formLabelAlign.register" placeholder="请输入登记人名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间" prop="registerTime">
                <el-input v-model="formLabelAlign.registerTime" placeholder="请输入登记时间"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="24">
              <el-form-item label="复核意见" prop="salaryRegisterSuggestion">
                <el-input type="textarea" v-model="formLabelAlign.salaryRegisterSuggestion" placeholder="请输入复核意见"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="order" label="序号" width="300">
                </el-table-column>
                <el-table-column prop="salaryName" label="薪酬项目名称">
                </el-table-column>
                <el-table-column prop="salaryMoney" label="金额" width="300">
                  <!--嵌入输入框-->
                  <template scope="scope">
                       <div>
                          <el-input size="small" v-model="scope.row.salaryMoney" placeholder="请输入项目金额"></el-input>
                       </div>
                  </template>
                </el-table-column>
              </el-table>

            </el-col>
          </el-row>

        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import {salaryStandVo, salaryStandRelue} from '../../utils/salaryStand.js';
import {backPage} from '../../utils/back.js';
console.log(backPage);

export default {
  name: 'checkPromoteSalary',
  data() {
    return {
      currentContentNName: '薪酬标准复核', // 通过路由传参数实现
      formLabelAlign: salaryStandVo,
      rules: salaryStandRelue,
      tableData: [{
        order: '2016-05-02',
        salaryName: '王小虎',
        salaryMoney: 2000
      }],
      isPromote: false
    }
  },
  methods: {
    submitForm(formName) {
      // vue里面的$refs对象里面可以获取界面dom元素是，vudom操作的一种方式
      this.isPromote = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断薪酬项目是否不为空
          if (this.isMoneyNull()) {
            alert('submite')
          } else {
            this.$message.error('薪酬项目金额输入不能为空');
          }
        }
        console.log('error submit!!');
        this.isPromote = false;
        return false;
      });
    },
    isMoneyNull() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.isNull(this.tableData[i].salaryMoney)) {
          return false
        }
      }
      return true;
    },
    back() {
      backPage(this);
    }
  }
}

</script>

<style scoped>
  .mg1 {
    margin-top: 0px !important;
    margin-bottom: 25px;
  }

  .form-wrap {
    padding: 0;
    margin: 0;
    margin-top: 10px;
  }

</style>
