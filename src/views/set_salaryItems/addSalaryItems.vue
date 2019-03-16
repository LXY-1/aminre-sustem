<template>
  <div class="addSalaryItems">
    <h5 class="mg1">
      您当前做的业务是：
      <span>{{currentContentNName}}</span>
    </h5>
    <div class="main-body">

      <div class="tab-wrap">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="添加薪酬项目" name="first">
            <el-row>
              <el-col :offset="6" :span="8">
                <el-input placeholder="请输入批量添加的项目个数" v-model.number="size" clearable>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-row class="pg2">
                  <el-button type="primary" size="small" :disabled="bol1" @click="addDomain">确定</el-button>
                  <el-button type="info" size="small" :disabled="bol1">重置</el-button>
                  <el-button type="success" size="small" :disabled="bol1" @click="submitForm('dynamicValidateForm')">提交</el-button>
                </el-row>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <el-col :offset="1" :span="7" v-for="(item, index) in dynamicValidateForm.mechanismItems" :key="index">
                  <span class="salaryItem-title">薪酬项目编号：{{index}}</span>
                  <el-form-item style="margin-top:15px;" :prop="'mechanismItems.' + index + '.name'" label="名称" :rules="{
      required: true, message: '名称不能为空', trigger: 'blur'
    }">
                    <el-input v-model="item.name"></el-input>
                  </el-form-item>
                  <el-form-item :prop="'mechanismItems.' + index + '.price'" label="项目金额" :rules="[
      { required: true, message: '金额不能为空', trigger: 'blur' },
      { type: 'number', message: '请输入数字', trigger: ['blur', 'change'] }
    ]">
                    <el-input v-model.number="item.price"></el-input>
                  </el-form-item>

                </el-col>

              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="设置新酬项目" name="second">
            <el-row>
              <el-col :span="7">
                <el-input placeholder="搜索薪酬项目" prefix-icon="el-icon-search" v-model="serchVary" @keyup.enter.native="searchVary">
                </el-input>
              </el-col>
              <el-col :offset="1" :span="8">
                <el-select v-model="value" placeholder="选择要设置薪酬项目的职位" class="width-100" @change="selectJob">
                  <el-option v-for="item in options" :key="item.jobId" :label="item.jobName" :value="item.jobId">
                  </el-option>
                </el-select>
              </el-col>
              <el-col  :offset="1" :span="2">
                <el-button type="success" @click="promote">确定</el-button>
               </el-col>
            </el-row>

            <!--薪酬项目搜索结果-->
            <el-row style="margin-top:20px;">
              <el-col :offset="2" :span="20">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedSalaryItems" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city.salaryItemId" :key="city.salaryItemId">{{city.salaryName}}({{city.salaryMoney}})</el-checkbox>
                </el-checkbox-group>

              </el-col>
            </el-row>

          </el-tab-pane>

        </el-tabs>
      </div>

    </div>
  </div>
</template>

<script>

  import {addSalaryItem} from '../../api/salaryItem/addSalaryItem';
  import {findAllSalaryItem} from '../../api/salaryItem/searchSalaryItems';
  import {findAllJob} from '../../api/job/searchJob';
  import {addJobSalaryItem} from '../../api/salaryItem/addJobSalaryItem';
var cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: `addSalaryItems`,
  data() {
    // element-ui自定义表单验证规则，这里是可以封装的
    return {
      currentContentNName: '设置薪酬项目', // 通过路由传参数实现，包括增删改
      activeName: 'first',
      serchVary: '',
      // 动态创建输入框也可以支持验证
      dynamicValidateForm: {
        mechanismItems: []
      },
      options: [],
      isIseJobId:'',//jobId
      value: '',
      size: '',
      // 薪酬项目选择相关数据属性
      checkAll: false,
      checkedSalaryItems: [],
      cities: [],
      isIndeterminate: true
    };
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
       if(tab.index ==1){
           this.findAllItems();
           this.findAllJobs()
       }
    },
    findAllItems(){
      findAllSalaryItem().then( response =>{
           console.log(response);
           this.cities = response;
      }).catch( error =>{
           console.log(error);
      })
    },
    findAllJobs(){
      findAllJob().then( response =>{
           console.log(response);
           this.options = response;

      }).catch( error =>{
            console.log(error);
      })
    },
    selectJob(val){
       console.log(val);
       this.isIseJobId = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
             this.addItems();
             console.log(this.dynamicValidateForm);


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addItems(){
      let loadingInstance = this.$loading({});
      var salaryItems = [];
      for(let i = 0; i< this.dynamicValidateForm.mechanismItems.length; i++){
        let json = {};
        json.salaryName = this.dynamicValidateForm.mechanismItems[i].name;
        json.salaryMoney = this.dynamicValidateForm.mechanismItems[i].price;
        salaryItems.push(json);
      }
      var data = "salaryItemsalaryItemList=" + JSON.stringify(salaryItems)
      console.log(data)
      addSalaryItem(data).then( response =>{
        loadingInstance.close();
        this.$message({
          message:'添加薪酬项目成功',
          type:'success'
        })
      }).catch( error=>{
        loadingInstance.close();
           console.log(error);
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.mechanismItems = [];
      for (var i = 0; i < this.size; i++) {
        this.dynamicValidateForm.mechanismItems.push({
          price: '',
          name: '',
          key: Date.now()
        });
      }
    },
    handleCheckAllChange(val) {
        console.log(val);
      this.checkedSalaryItems = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
        console.log(this.checkedSalaryItems)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
  searchVary(){
        //搜索薪酬项目
   },
    //给职位设置薪酬项目
    promote(){
         // 添加进薪酬项目关联表
         console.log(this.isIseJobId);
         console.log(this.checkedSalaryItems)
         let items = [];
         for( let i = 0; i<this.checkedSalaryItems.length ; i++ ){
                  let json = {};
                  json.jItemId = this.isIseJobId;
                  json.sItemId = this.checkedSalaryItems[i];
                  json.salaryMoney = this.cities[i].salaryMoney;
                  items.push(json)
         }
         console.log(items);
      var data = "jobSalaryItemList=" + JSON.stringify(items)
        addJobSalaryItem(data).then( response =>{
             console.log(response);
             this.$message({
               message:'薪酬项目设置成功',
               type:'success'
             })
        }).catch( error =>{
             console.log(error);
        })
    },
  },
  computed: {
    /*
                      利用计算属性来监听选择框以及数字输入框的变化
                      */
    bol1: function () {
      return (this.size == '')
    }

  }
};

</script>

<style scoped>
  .mg1 {
    margin-top: 0px !important;
  }

  .pg2 {
    margin-left: 10px;
    margin-top: 5px;
  }

  .demo-dynamic {
    margin-top: 20px;
  }

  .demo-dynamic .el-input {
    width: 150px !important;
  }

  .demo-dynamic .el-form-item {
    margin-left: -50px;
  }

  .salaryItem-title {
    color: rgb(255, 208, 75) !important
  }

</style>
