<template>
  <div class="checkPromoteFile">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
    <div class="opertaition-wrap">
      <el-row>
        <el-col :span="24">
          <div class="float-right">
            <el-button type="success" plain :loading="isPromote" size="small" @click="submitForm('formLabelAlign')">复核通过</el-button>
          <el-button type="info" plain size="small" @click="deleteIt">清除</el-button>
          <el-button type="info" plain size="small" @click="back">返回</el-button>
          </div>

        </el-col>
      </el-row>
    </div>
    <div class="form-wrap">
      <el-form status-icon label-position="right" label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="I级机构" prop="firstMechanismName">
              <el-select v-model="formLabelAlign.firstMechanismName" placeholder="请选择I级机构">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="II级机构" prop="secondMechanismName">
              <el-select v-model="formLabelAlign.secondMechanismName" placeholder="请选择II级机构" @click.native="check(1)">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="III级机构" prop="thirdMechanismName">
              <el-select v-model="formLabelAlign.thirdMechanismName" placeholder="请选择III级机构" @click.native="check(2)"
                class="change-selcet-width">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--图片上传区域-->
          <el-col :span="3" class="absoluet-wrap">
            <div class="absolute-ele">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="职位分类" prop="jobTypeName">
              <el-select v-model="formLabelAlign.jobTypeName" placeholder="请选择职位分类">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位名称" prop="jobName">
              <el-select v-model="formLabelAlign.jobName" placeholder="请选择职位名称" @click.native="check(3)">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="职称" prop="jobCall">
              <el-input v-model="formLabelAlign.jobCall" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formLabelAlign.name" placeholder="请输入此人姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="formLabelAlign.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formLabelAlign.email" placeholder="请输入此人邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="电话">
              <el-input v-model="formLabelAlign.phone" placeholder="请输入此人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="qq" prop="qq">
              <el-input v-model="formLabelAlign.qq" placeholder="请输入此人qq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" prop="mobilePhone">
              <el-input v-model="formLabelAlign.mobilePhone" placeholder="请输入此人手机"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input v-model="formLabelAlign.address" placeholder="请输入此人详细地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮编" prop="zipCode">
              <el-input v-model="formLabelAlign.zipCode" placeholder="请输入邮编"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="国籍" prop="nationality">
              <el-select v-model="formLabelAlign.nationality" placeholder="请选择国籍">
                <el-option label="中国" value="1"></el-option>
                <el-option label="其他" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生地" prop="birthPlace">
              <el-input v-model="formLabelAlign.birthPlace" placeholder="请输入出生地"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生日" prop="birthDay">
              <el-input v-model="formLabelAlign.birthDay" placeholder="请输入生日"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="民族" prop="nation">
              <el-select v-model="formLabelAlign.nation" placeholder="请选择名族">
                <el-option label="汉" value="1"></el-option>
                <el-option label="其他" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="宗教信仰" prop="religiousBelief">
              <el-select v-model="formLabelAlign.religiousBelief" placeholder="请选择宗教信仰">
                <el-option label="无" value="1"></el-option>
                <el-option label="基督教" value="基督教"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="政治面貌" prop="politicalOutlook">
              <el-select v-model="formLabelAlign.politicalOutlook" placeholder="请选择政治面貌">
                <el-option label="群众" value="群众"></el-option>
                <el-option label="共青团" value="共青团"></el-option>
                <el-option label="共产党" value="共产党"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model="formLabelAlign.idCard" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="社会保障" prop="socialSecurityCode">
              <el-input v-model="formLabelAlign.socialSecurityCode" placeholder="请输入社会保障号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="formLabelAlign.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学历" prop="education">
              <el-select v-model="formLabelAlign.education" placeholder="请选择学历">
                <el-option label="本科" value="本科"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="教育年限" prop="educationTime">
              <el-select v-model="formLabelAlign.educationTime" placeholder="请选择教育年限">
                <el-option label="12" value="12"></el-option>
                <el-option label="6" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学历专业" prop="major">
              <el-select v-model="formLabelAlign.major" placeholder="请选择学历专业">
                <el-option label="软件" value="软件"></el-option>
                <el-option label="计算机" value="计算机"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="标准薪资" prop="salaryMoney">
              <el-select v-model="formLabelAlign.salaryMoney" placeholder="请选择标准薪资">
                <el-option label="未定义/0" value="0"></el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户行" prop="bankName">
              <el-input v-model="formLabelAlign.bankName" placeholder="请输入开户行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户账号" prop="bankAccount">
              <el-input v-model="formLabelAlign.bankAccount" placeholder="请输入开户账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登记人" prop="maker">
              <el-input v-model="formLabelAlign.maker" placeholder="请输入登记人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="建党时间" prop="maker">
              <el-date-picker v-model="formLabelAlign.registerTime" type="datetime" placeholder="选择日期时间" style="width:180px;">
              </el-date-picker>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="特长" prop="speciality">
              <el-input v-model="formLabelAlign.speciality" placeholder="请输入特长"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="爱好">
              <el-input v-model="formLabelAlign.hoby" placeholder="请输入爱好"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="个人履历" prop="personalResume">
              <el-input type="textarea" v-model="formLabelAlign.personalResume"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="家庭关系" prop="familyShip">
              <el-input type="textarea" v-model="formLabelAlign.familyShip"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="formLabelAlign.remark"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  fileVo,
  fileRelue
} from '../../utils/fileVo.js';
import {backPage} from '../../utils/back.js';
console.log(backPage)
export default {
  name: 'checkPromoteFile',
  data() {
    return {
      currentContentNName: '人力资源档案登记复核', // 通过路由传参数实现
      isPromote: false,
      formLabelAlign: fileVo,
      rules: fileRelue,
      imageUrl: ''
    }
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  methods: {
    check(ind) {
      if (ind == 1 && this.isNull(this.formLabelAlign.firstMechanismName)) {
        this.$message({
          message: '请先选择一级机构',
          type: 'warning'
        });
      } else if (
        ind == 2 &&
          this.isNull(this.formLabelAlign.secondMechanismName)
      ) {
        this.$message({
          message: '请先选择二级机构',
          type: 'warning'
        });
      }
    },
    submitForm(formName) {
      // vue里面的$refs对象里面可以获取界面dom元素是，vudom操作的一种方式
      console.log(this.$refs);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 图片上模块
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 清除模块
    deleteIt() {
      this.$confirm('是否确认清除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let val in this.formLabelAlign) {
          this.formLabelAlign[val] = ''
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
  }

  .opertaition-wrap {
    overflow: hidden;
    margin-top: -15px;
  }

  .opertaition-wrap .float-right {
    float: right;
  }

  .form-wrap {
    padding: 0;
    margin: 0;
    margin-top: 10px;
  }

  .change-selcet-width {
    width: 100%;
  }
   /*图片上传样式模块*/
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  /*如pain上传元素父级*/
  .absolute-ele {
    position: absolute;
    cursor: pointer;
    width: 100px;
    height: 100px;
    left: 25px;
    right: 0px;
    border: solid #cccc 1px;
  }

</style>
