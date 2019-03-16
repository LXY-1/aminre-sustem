<template>
  <div class="serchMechanism">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
    <div class="main-body">
      <el-container style="height: 500px;">
        <el-aside>
          <div class="search">
            <el-input placeholder="输入关键字查询" prefix-icon="el-icon-search" v-model="searchVal"  @keyup.enter.native="searchVary">
            </el-input>
          </div>
          <div class="mechanism-container">
            <!--根据输入内容查询结果显示树形结构-->
            <h5>机构结构：</h5>
            <el-tree :data="MechanismList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </el-aside>
        <el-main>
          <div class="operatio">
            <h4>操作:</h4>
            <el-button title="编辑" type="warning" icon="el-icon-edit" circle :disabled="isSelect"></el-button>
            <el-button type="danger" icon="el-icon-delete" title="删除" circle :disabled="isSelect" @click="deleteMechanism"></el-button>
          </div>
          <div class="form-wrap clear-both" style="width:400px;" v-if="!isSelect">
              <el-form
              :model="ruleForm4"
              status-icon
              :rules="rules4"
              ref="ruleForm4"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="一级机构" prop="firstRegion" v-if="isShowLevel1">
                <el-select disabled class="change-select"
                  v-model="ruleForm4.firstRegion"
                  placeholder="请选择一级机构"

                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="二级机构" prop="secondRegion" v-if="isShowLevel2">
                <el-select disabled
                  v-model="ruleForm4.secondRegion"
                  placeholder="请选择二级机构"
                  class="change-select"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构名称" prop="mechanismName">
                <el-input type="text" v-model="ruleForm4.mechanismName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="机构层级" prop="level">
                <el-input v-model.number="ruleForm4.level"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm1('ruleForm4')">提交</el-button>
                <el-button @click="resetForm1('ruleForm4')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
  import {findAllMechanism,findMechanismByName} from '../../api/mechanism/searchMechanism';
  import {updateMechanism} from '../../api/mechanism/usdateMechanism';
  import {deleteteMechanism} from '../../api/mechanism/deleteMechanism';

export default {
  name: 'addMechanism',
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(`层级不能为空`));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error(`请输入数字值`));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入机构名称'));
      } else {
        callback();
      }
    };
    var checkSelect = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请选择一个机构'));
      } else {
        callback();
      }
    };
    return {
      currentContentNName: '查询机构', // 通过路由传参数实现
      searchVal: '',
      MechanismList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isSelect: true,
      ruleForm4: {
        // element-ui自定义表单验证的输入框的name属性
        mechanismName: '',
        level: '',
        firstRegion: '',
        secondRegion: '',
        id:''
      },
      rules4: {
        mechanismName: [{ validator: validatePass, trigger: 'blur' }],
        level: [{ validator: checkAge, trigger: 'blur' }]
      },
      isShowLevel1: false,
      isShowLevel2: false
    }
  },
  mounted(){
    this.findAll();
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.isSelect = false;
      [this.isShowLevel1, this.isShowLevel2] = this.getBol(data);
    },
    getBol(data) {
      if (data.level == 1) {
        this.ruleForm4.mechanismName = data.label;
        this.ruleForm4.level = data.level;
        this.ruleForm4.id = data.mechanismId
        return [false, false];
      } else if (data.level == 2) {
        this.ruleForm4.mechanismName = data.label;
        this.ruleForm4.level = data.level;
        this.ruleForm4.id = data.mechanismId
        return [true, false]
      } else if (data.level == 3) {
        this.ruleForm4.mechanismName = data.label;
        this.ruleForm4.level = data.level;
        this.ruleForm4.id = data.mechanismId
        return [true, true]
      }
    },
    deleteMechanism() {
      this.$confirm('是否确认删除该机构, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          let data = {
              id:this.ruleForm4.id
          }
        deleteteMechanism(data).then( response =>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.findAll();
        }).catch(response =>{
              console.log(error);
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         // 提交修改，目前只支持名字
          console.log(this.ruleForm4);
          var data = {
            mechanismId:this.ruleForm4.id,
            mechanismName:this.ruleForm4.mechanismName
          }
          updateMechanism(data).then( response =>{
               console.log(response);
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
    },
    // 输入框回车键
    searchVary(){
       if(this.searchVal ==''){
           this.findAll();
       }
       else{
           this.findByName(this.searchVal);
       }
    },
    //查询所有机构
    findAll(){
      let loadingInstance = this.$loading({});
      findAllMechanism().then( response =>{
        loadingInstance.close();
          console.log(response);
          // 处理数据的
          this.makedata(response)
      }).catch( error =>{
        loadingInstance.close();
          console.log(error);
      })
    },
    // 模糊查询机构
    findByName(val){
      var data = {
        keyWords:val
      }
      let loadingInstance = this.$loading({});
      findMechanismByName(data).then( response =>{
             loadingInstance.close();
            console.log(response);
            this.makedata(response);
      }).catch( error =>{
            loadingInstance.close();
           console.log(error);
      })
    },
    makedata(listData){

         let mechanismStrcct = [];//最终展示数组
         let secondLevelList = [];//暂存二级机构，减少一层遍历
         for(let i = 0; i< listData.length; i++ ){
                 listData[i].label = listData[i].mechanismName;
                 if(listData[i].parentId==0){
                     listData[i].children = [];
                     mechanismStrcct.push(listData[i]);
                 }
         }
         for(let i = 0; i< mechanismStrcct.length; i++){
           for(let j = 0; j< listData.length; j++){
                  if(mechanismStrcct[i].mechanismId == listData[j].parentId){
                       listData[j].children = [];
                       secondLevelList.push(listData[j]);
                  }
           }
         }
         for(let i = 0; i< secondLevelList.length; i++){
              for(let j = 0; j< listData.length; j++){
                    if(secondLevelList[i].mechanismId == listData[j].parentId){
                         listData[j].children = [];
                         secondLevelList[i].children.push(listData[j]);

                    }
              }
         }
      for(let i = 0; i< mechanismStrcct.length; i++){
        for(let j = 0; j< secondLevelList.length; j++){
          if(mechanismStrcct[i].mechanismId ==secondLevelList[j].parentId){
            mechanismStrcct[i].children.push(secondLevelList[i]);
          }
        }
      }

      this.MechanismList = mechanismStrcct;
    }
  }
}

</script>

<style scoped>
  .mg1 {
    margin-top: 0px !important;
  }

  .operatio {
    margin-top: -10px;
    margin-left: 65px;
  }

  .operatio h4 {
    margin-top: -5px;
    margin-left: 15px;
    float: left;
  }

  .operatio .el-button {
    margin-top: -35px !important;
    width: 35px;
    height: 35px;
    padding: 8px;
    margin-left: 10px;

  }
  .form-wrap{
    margin-left: -30px;
    margin-top: 10px;
  }
 .form-wrap .change-select{
   width: 100%;
 }
</style>
