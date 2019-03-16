<template>
    <div class="addMechanism">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
     <div class="main-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加职位类型" name="first">
          <h4 class="center mg2">输入职位类型信息</h4>
          <div class="container">
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
            >
            <el-form-item label="一级机构" prop="firstRegion">
                <el-select @change="getSecondMechanism"
                  v-model="ruleForm2.firstRegion"
                  placeholder="请选择一级机构"
                  style="width:400px;"
                >
                  <el-option v-for="(item,index) in firstMechanisms" :key="index" :label="item.mechanismName" :value="item.mechanismId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="二级机构" prop="secondRegion">
                <el-select @change="getSecondMechanism1"
                  v-model="ruleForm2.secondRegion"
                  placeholder="请选择二级机构"
                  style="width:400px;"
                >
                  <el-option v-for="(item,index) in secondMechanisms" :key="index" :label="item.mechanismName" :value="item.mechanismId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="三级机构" prop="thirdRegion">
                <el-select @change="selectThirdMechanism"
                  v-model="ruleForm2.thirdRegion"
                  placeholder="请选择三级机构"
                  style="width:400px;"
                >
                  <el-option v-for="(item,index) in thirdMechanisms" :key="index" :label="item.mechanismName" :value="item.mechanismId"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item label="职位类型名称" prop="mechanismName">
                <el-input type="text" v-model="ruleForm2.mechanismName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="添加职位" name="second">
          <h4 class="center mg2">需先选择对应的职位类型</h4>
          <div class="container">
            <el-form
              :model="ruleForm3"
              status-icon
              :rules="rules3"
              ref="ruleForm3"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="职位类型" prop="jobTyp">
                <el-select
                  v-model="ruleForm3.jobTyp"
                  placeholder="请选择职位类型"
                  style="width:400px;"
                >
                  <el-option v-for="(item,index) in jobTypes" :key="index" :label="item.jobTypeName" :value="item.jobTypeId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位名称" prop="mechanismName">
                <el-input type="text" v-model="ruleForm3.mechanismName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职称" prop="jobCall">
                <el-input type="text" v-model="ruleForm3.jobCall" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm1('ruleForm3')">提交</el-button>
                <el-button @click="resetForm1('ruleForm3')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
    </div>
</template>

<script>
  import {findMechanism} from '../../api/mechanism/findMechanism';
  import {addJobType} from '../../api/job/addJobType';
  import {findAllJobType} from '../../api/job/searchJobtype';
  import {addJob} from '../../api/job/addJob';
export default {
  name: 'addMechanism',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入职位类型名称'));
      } else {
        callback();
      }
    };
    var checkSelect = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('选择不能为空'));
      } else {
        callback();
      }
    };
    return {
      thirdMechanismId:'',
      currentContentNName: '添加职位', // 通过路由传参数实现，包括增删改
      activeName: 'first',
      firstMechanisms:[],
      secondMechanisms:[],
      thirdMechanisms:[],
      jobTypes:[],
      ruleForm2: {
        // element-ui自定义表单验证的输入框的name属性
        mechanismName: '',
        firstRegion: '',
        secondRegion: '',
        thirdRegion: ''
      },
      rules2: {
        mechanismName: [{ validator: validatePass, trigger: 'blur' }],
        firstRegion: [{ validator: checkSelect, trigger: 'blur' }],
        secondRegion: [{ validator: checkSelect, trigger: 'blur' }],
        thirdRegion: [{ validator: checkSelect, trigger: 'blur' }]

      },
      ruleForm3: {
        // element-ui自定义表单验证的输入框的name属性
        mechanismName: '',
        jobTyp: '',
        jobCall:''
      },
      rules3: {
        mechanismName: [{ validator: validatePass, trigger: 'blur' }],
        jobTyp: [{ validator: checkSelect, trigger: 'blur' }]
      }
    };
  },
  mounted(){
    this.getFirstMechainsm();
  },
  methods: {
    handleClick(tab, event) {
      if(tab.index == 1){
           //获取职业类型
          this.getJobType();
      }
    },
    getJobType(){
      findAllJobType().then( response =>{
          console.log(response);
          this.jobTypes = response;
      }).catch( error =>{
            console.log(error);
      })
    },
    //获取一级机构
    getFirstMechainsm(){
      let loadingInstance = this.$loading({});
      var data = {
        parentId:0
      }
      findMechanism(data).then( response =>{
        loadingInstance.close();
        console.log(response);
        this.firstMechanisms = response;
      }).catch( error =>{
        loadingInstance.close();
      })
    },
    getSecondMechanism(val){
      console.log(val)
      this.getSecondMechainsm(val);
    },
    //获取二级机构
    getSecondMechainsm(parentId){
      let loadingInstance = this.$loading({});
      var data = {
        parentId:parentId
      }
      findMechanism(data).then( response =>{
        loadingInstance.close();
        console.log(response);
        this.secondMechanisms = response;
      }).catch( error =>{
        loadingInstance.close();
      })
    },
    getSecondMechanism1(val){
      console.log(val)
      this.getThirdMechainsm(val);
    },
    //获取三级机构
    getThirdMechainsm(parentId){
      let loadingInstance = this.$loading({});
      var data = {
        parentId:parentId
      }
      findMechanism(data).then( response =>{
        loadingInstance.close();
        console.log(response);
        this.thirdMechanisms = response;
      }).catch( error =>{
        loadingInstance.close();
      })
    },
    selectThirdMechanism(val){
        //三级机构id
      this.thirdMechanismId = val;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm2);
          var data = {
            jobTypeName:this.ruleForm2.mechanismName,
            ThirdMechanismId:this.ruleForm2.thirdRegion
          }
          addJobType(data).then( response =>{
              console.log(response);
            this.$message({
              message: '添加职位类型成功',
              type: 'success'
            });
          }).catch( error =>{
               console.log(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            console.log(this[formName]);
            var data ={
              jobName:this[formName].mechanismName,
              jobCall:this[formName].jobCall,
              jobTypeId:this[formName].jobTyp,
            }
            addJob(data).then( response =>{
                 console.log(response);
                 this.$message({
                message:'添加职位成功',
                type:'success'
              })
            }).catch( error =>{
                 console.log(error);
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm1(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.mg1 {
  margin-top: 0px !important;
}
.container {
  width: 500px;
  margin: 0 auto;
  text-align: center;
}
.mg2 {
  margin-top: 0px;
}
/*改变选择框的宽度还有位置*/
el-select > .el-input {
}
</style>
