<template>
  <div class="salarySerch">
    <h5 class="mg1">您当前做的业务是： <span>{{currentContentNName}}</span></h5>
    <div class="serch-wrap">
      <el-row  style="margin-bottom:15px;">
        <el-col :span="24">
          <div class="float-right">
<el-button type="success" plain :loading="isPromote" size="small" @click="search">查询</el-button>
          <el-button type="info" plain size="small" @click="deleteIt">清除条件</el-button>
          </div>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择I级机构">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择II级机构">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择III级机构">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
<el-col :span="4">
          <el-select v-model="value" placeholder="请选择职位分类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择职位名称">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-date-picker
          style="width:100%;"
      v-model="rangeTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        </el-col>
      </el-row>

      <div class="result-wrap">
             <h5>当前查询结果总数是：<span>{{totalNum}}</span></h5>
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
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="changeIt(scope.row)">修改</el-button>
        <el-button type="text" size="small" @click="deleteIt(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'salarySerch',
  data() {
    return {
      currentContentNName: '薪酬标准查询', // 通过路由传参数实现
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      rangeTime: '',
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
      ],
      totalNum: 0,
      isPromote: false
    }
  },
  methods: {
    
    search() {

    },
    changeIt(row) {
      console.log(row);
      // 跳转到审核页面，传递详情id
      this.$router.push({name: 'salaryEdit', params: {id: row.id}});
    },
    deleteIt(row) {
      console.log(0);

      this.$confirm('是否确认清除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
    }

  }
}

</script>

<style scoped>
  .mg1 {
    margin-top: 0px !important;
    margin-bottom: 35px;
  }

</style>
