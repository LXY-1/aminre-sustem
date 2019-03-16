<template>
  <!--薪酬项目的特点是根据角色获取对应薪酬需要输入的项目-->
  <div class="registerSalary">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
    <div class="salary-wrap">
      <el-row>
        <el-col :span="24">
          <div class="float-right">
            <el-button type="success" plain :loading="isPromote" size="small" @click="submitForm('formLabelAlign')">提交</el-button>
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
                <el-select v-model="formLabelAlign.jobName" placeholder="请选择薪酬标准职位" class="width-100" @change="selectJob">
                  <el-option v-for="item in options" :key="item.jobId" :label="item.jobName" :value="item.jobId"></el-option>
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
                <el-date-picker type="date" value-format="yyyy-MM-dd"   format="yyyy-MM-dd"  placeholder="选择日期" v-model="formLabelAlign.registerTime" style="width: 100%;"></el-date-picker>
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
import {findAllJob} from '../../api/job/searchJob';
import {findSalaryItemsByJob} from '../../api/salaryItem/searchSalaryItems';
import {addSalaryStand} from '../../api/salaryStandard/addSalaryStand';
import {findSalaryStandByCode} from '../../api/salaryStandard/findSalaryStandByCode';
import {addSalaryStandardItem} from '../../api/salaryStandard/addSalaryStandardItem';
export default {
  name: 'registerSalary',
  data() {
    return {
      currentContentNName: '薪酬标准登记', // 通过路由传参数实现
      formLabelAlign: salaryStandVo,
      rules: salaryStandRelue,
      tableData: [],
      options:[],
      isPromote: false
    }
  },
  mounted(){
    this.findAllJobs();
  },
  methods: {
    findAllJobs(){
      findAllJob().then( response =>{
        console.log(response);
        this.options = response;

      }).catch( error =>{
        console.log(error);
      })
    },
    selectJob(val){
        //选择职位查询薪酬项目
        console.log(val);
        var data = {
            jobId:val
        }
      findSalaryItemsByJob(data).then( response =>{
              console.log(response);
              if(response.length == 0){
                this.$message({
                  message:"该职位无对应的薪酬项目，前前往薪酬设置添加",
                  type:'warning'
                })
                this.tableData = [];
              }
              else {
                let datas = [];
                for( let i = 0; i<response.length; i++){
                        var json =  {};
                        json.order = i;
                        json.salaryName = response[i].salaryName;
                        json.salaryMoney = response[i].salaryMoney;
                        datas.push(json);
                }
                this.tableData = datas;
              }

      }).catch( error =>{
            console.log(error);
      })
    },
    submitForm(formName) {
      // vue里面的$refs对象里面可以获取界面dom元素是，vudom操作的一种方式
      this.isPromote = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
            // 判断是否存在薪酬项目
            if(this.tableData.length == 0){
              this.$message.warning('当前无任何薪酬项目，无法进行登记');

            }

          // 判断薪酬项目是否不为空
         else if (this.isMoneyNull()) {


              //添加薪酬标准
              this[formName].jobId = this[formName].jobName;
              this[formName].state = 0;
              var data = this[formName];
              console.log(this[formName]);
              addSalaryStand(data).then( response =>{
                      console.log(response);
                    // 开始查询这个薪酬标准的id查好了之后可以再添加薪酬标准-项目关联表
                    this.findSalaryStandardByCode(this[formName].salarystandCode)
              })


          } else {
            this.$message.error('薪酬项目金额输入不能为空');
          }
        }

        this.isPromote = false;
        return false;
      });
    },
    findSalaryStandardByCode(code){
        var data = {
            code : code
        }
        findSalaryStandByCode(data).then( response =>{
               console.log(response);
               this.addSalaryStandardItems(response.salaryStandId);
        }).catch( error =>{
            console.log(error)
        })
    },
    addSalaryStandardItems(salaryStandId){
         //添加薪酬标准--薪酬项目关联表tableData
         var datas = [];
         for (let i =0; i< this.tableData.length; i++){
               let json = {};
               json.salaryStandId = salaryStandId;
               json.salaryItemMoney = this.tableData[i].salaryMoney;
               json.salaryItemName = this.tableData[i].salaryName;
               datas.push(json);
         }
         let data = "salaryStandardItemList=" + JSON.stringify(datas);
         addSalaryStandardItem(data).then( response =>{
               console.log(response);
               this.$message({
                 message:'登记成功',
                 type:'success'
               })
         }).catch( error =>{
              console.log(error);
         })


    },
    isMoneyNull() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.isNull(this.tableData[i].salaryMoney)) {
          return false
        }
      }
      return true;
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
