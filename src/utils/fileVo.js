/*
人力资源档案Vo,表单校验，用于登记、复核
*/
export var fileVo =  {
  firstMechanismName: "",
  secondMechanismName: "",
  thirdMechanismName: "",
  jobTypeName: '',
  jobName: '',
  jobCall: '',
  registerTime: '',
  name: '',
  sex: '',
  email: '',
  phone: '',
  qq: '',
  mobilePhone: '',
  address: '',
  zipCode: '',
  nationality: '',
  birthPlace: '',
  birthDay: '',
  nation: '',
  religiousBelief: '',
  politicalOutlook: '',
  idCard: '',
  socialSecurityCode: '',
  age: '',
  education: '',
  educationTime: '',
  major: '',
  salaryMoney: '',
  bankName: '',
  bankAccount: '',
  maker: '',
  registerTime: '',
  speciality: '',
  hoby: '',
  personalResume: '',
  familyShip: '',
  remark: ''
}
/*
自定义校验规则
*/
var checkPhone = function(rule, value, callback){
     var reg = /^1[34578]\d{9}$/;
     if(!reg.test(value)){
       callback(new Error('手机号格式有误'));
     }
     else{
       callback();
     }
}

export var fileRelue = {
  firstMechanismName: [{
    required: true,
    message: "请选择机构",
    trigger: "blur"
  }],
  secondMechanismName:[{
    required: true,
    message: "请选择机构",
    trigger: "blur"
  }],
  thirdMechanismName:[{
    required: true,
    message: "请选择机构",
    trigger: "blur"
  }],
  jobTypeName:[
      {
          required:true,
          message: "请选择职位类型",
          trigger: "blur"
      }
  ],
  jobName:[
      {
        required:true,
        message: "请选择职位",
        trigger: "blur"
      }
  ],
  registerTime:[
      {
        required:true,
        message: "请选择建党日期",
        trigger: "blur"
      }
  ],
  name:[{
    required:true,
    message: "请输入名字",
    trigger: "blur"
  }],
  email:[
      {
        required:true,
        message: "请输入邮箱",
        trigger: "blur"
      }
  ],
  sex:[{
    required:true,
    message: "请选择性别",
    trigger: "blur"
  }],
  mobilePhone:[
      {
        required:true,
        message: "请输入电话",
        trigger: "blur"
      },
      {
        validator:checkPhone,
        trigger: 'blur'
      }
  ],
  address:[
    {
      required:true,
      message:'请输入地址',
      // trigger:'blur' haidacpptuandui123
      trigger:'blur'
    }
  ],
  zipCode:[
    {
      required:true,
      message:'请输入邮编',
      trigger:'blur'
    }
  ],
  nation:[
    {
      required:true,
      message:'请输入国籍',
      trigger:'blur'
      
    }
  ],
  birthPlace:[
    {
      required:true,
      message:'请输入出生地',
      trigger:'blur'
    }
  ],
  birthDay:[
    {
      required:true,
      message:'请输入出生日',
      trigger:'blur'
    }
  ],
  nationality:[
    {
      required:true,
      message:'请输入民族',
      trigger:'blur'
    }
  ],
  religiousBelief:[
    {
      required:true,
      message:'请输入宗教信仰',
      trigger:'blur'
    }
  ],
  politicalOutlook:[
    {
      required:true,
      message:'请输入政治面貌',
      trigger:'blur'
    }
  ],
  qq:[
    {
      required:true,
      message:'请输入qq',
      trigger:'blur'
    }
  ],
  idCard:[
    {
      required:true,
      message:'请输入身份证号',
      trigger:'blur'
    }
  ],
  socialSecurityCode:[
    {
      required:true,
      message:'请输入社会保障号码',
      trigger:'blur'
    }
  ],
  age:[
    {
      required:true,
      message:'请输入年龄',
      trigger:'blur'
    }
  ],
  education:[
    {
      required:true,
      message:'请选择学历',
      trigger:'blur'
    }
  ],
  educationTime:[
    {
      required:true,
      message:'请选择教育年限',
      trigger:'blur'
    }
  ],
  major:[
    {
      required:true,
      message:'请选择学历专业',
      trigger:'blur'
    }
  ],
  salaryMoney:[
    {
      required:true,
      message:'请选择标准薪资',
      trigger:'blur'
    }
  ],
  bankName:[
    {
      required:true,
      message:'请输入开户行',
      trigger:'blur'
    }
  ],
  bankAccount:[
    {
      required:true,
      message:'请输入开户账号',
      trigger:'blur'
    }
  ],
  maker:[
    {
      required:true,
      message:'请输入登记人',
      trigger:'blur'
    }
  ],
  registerTime:[
    {
      
      required:true,
      message:'请选择建党时间',
      trigger:'blur'
    }
  ],
  speciality:[
    {
      required:true,
      message:'请输入特长',
      trigger:'blur'
    }
    
  ],
  hoby:[
    {
      required:true,
      message:'请输入爱好',
      trigger:'blur'
    }
    
  ],
  personalResume:[
    {
      required:true,
      message:'请输入个人履历',
      trigger:'blur'
    }
    
  ],
  familyShip:[
    {
      required:true,
      message:'请输入家庭关系',
      trigger:'blur'
    }
  ]
  
}

