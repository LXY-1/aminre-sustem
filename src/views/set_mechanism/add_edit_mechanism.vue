<template>
  <div class="addEditMechanism">
    <h5 class="mg1">
      您当前做的业务是：
      <span>{{currentContentNName}}</span>
    </h5>
    <div class="main-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加一级机构" name="first">
          <h4 class="center mg2">输入机构信息</h4>
          <div class="container">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="机构名称" prop="mechanismName">
                <el-input type="text" v-model="ruleForm2.mechanismName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="机构层级" prop="level">
                <el-input v-model.number="ruleForm2.level"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="添加二级机构" name="second">
          <h4 class="center mg2">需先选择对应的一级机构</h4>
          <div class="container">
            <el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
              <el-form-item label="一级机构" prop="firstRegion">
                <el-select v-model="ruleForm3.firstRegion" placeholder="请选择一级机构" style="width:400px;">
                  <el-option v-for="(item,index) in firstMechanisms" :key="index" :label="item.mechanismName" :value="item.mechanismId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构名称" prop="mechanismName">
                <el-input type="text" v-model="ruleForm3.mechanismName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="机构层级" prop="level">
                <el-input v-model.number="ruleForm3.level"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm1('ruleForm3')">提交</el-button>
                <el-button @click="resetForm1('ruleForm3')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="添加三级机构" name="third">
          <div class="container">
            <el-form :model="ruleForm4" status-icon :rules="rules4" ref="ruleForm4" label-width="100px" class="demo-ruleForm">
              <el-form-item label="一级机构" prop="firstRegion">
                <el-select v-model="ruleForm4.firstRegion" placeholder="请选择一级机构" style="width:400px;" @change="getSecondMechanism">
                  <el-option v-for="(item,index) in firstMechanisms" :key="index" :label="item.mechanismName" :value="item.mechanismId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="二级机构" prop="secondRegion">
                <el-select v-model="ruleForm4.secondRegion" placeholder="请选择二级机构" style="width:400px;">
                  <el-option v-for="(item,index) in secondMechanisms" :key="index" :label="item.mechanismName" :value="item.mechanismId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构名称" prop="mechanismName">
                <el-input type="text" v-model="ruleForm4.mechanismName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="机构层级" prop="level">
                <el-input v-model.number="ruleForm4.level"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm2('ruleForm4')">提交</el-button>
                <el-button @click="resetForm2('ruleForm4')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

  import {addMechanism} from '../../api/mechanism/addMecjanism';
  import {findMechanism} from '../../api/mechanism/findMechanism';

export default {
  name: `addEditMechanism`,
  data() {
    // element-ui自定义表单验证规则，这里是可以封装的
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
      currentContentNName: '设置机构', // 通过路由传参数实现，包括增删改
      activeName: 'first',
      firstMechanisms:[],
      secondMechanisms:[],
      ruleForm2: {
        // element-ui自定义表单验证的输入框的name属性
        mechanismName: '',
        level: ''
      },
      rules2: {
        mechanismName: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        level: [{
          validator: checkAge,
          trigger: 'blur'
        }]
      },
      ruleForm3: {
        // element-ui自定义表单验证的输入框的name属性
        mechanismName: '',
        level: '',
        firstRegion: ''
      },
      rules3: {
        mechanismName: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        level: [{
          validator: checkAge,
          trigger: 'blur'
        }],
        firstRegion: [{
          validator: checkSelect,
          trigger: 'blur'
        }]
      },
      ruleForm4: {
        // element-ui自定义表单验证的输入框的name属性
        mechanismName: '',
        level: '',
        firstRegion: '',
        secondRegion: ''
      },
      rules4: {
        mechanismName: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        level: [{
          validator: checkAge,
          trigger: 'blur'
        }],
        firstRegion: [{
          validator: checkSelect,
          trigger: 'blur'
        }],
        secondRegion: [{
          validator: checkSelect,
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
       let tabOrde = tab.index;
       if(tabOrde!=0){
           // 再次获取
           this.getFirstMechainsm()
       }
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
    submitForm(formName) {
        //表单的检测也是异步的所以才会延迟出现加载提示，因为你是加载提示是放在表单验证成功之后

      this.$refs[formName].validate(valid => {
        if (valid) {
            //添加一级机构
          var data = {
            mechanismName:this.ruleForm2.mechanismName,
            level:this.ruleForm2.level,
            parentId:0
          }
          this.adds(data);

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
          console.log(this.ruleForm3);
          let data = {
            mechanismName:this.ruleForm3.mechanismName,
            level:this.ruleForm3.level,
            parentId:this.ruleForm3.firstRegion
          }
          this.adds(data);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm1(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            mechanismName:this.ruleForm4.mechanismName,
            level:this.ruleForm4.level,
            parentId:this.ruleForm4.secondRegion
          }
          this.adds(data);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm2(formName) {
      this.$refs[formName].resetFields();
    },
    adds(data){
      let loadingInstance = this.$loading({});
      addMechanism(data).then( response => {
        console.log(response);
        loadingInstance.close();
        this.$message({
          message: '添加机构成功',
          type: 'success'
        });

      }).catch( error => {
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
    }
  }
};

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
  el-select>.el-input {}

</style>
