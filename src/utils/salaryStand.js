/*
薪酬标准表单Vo,表单校验，用于登记、复核
*/
export var salaryStandVo = {
  salarystandCode: '',
  jobName: '',
  salaryMoney: '',
  maker: '',
  register: '',
  registerTime: '',
  salaryRegisterSuggestion: ''
}
/*
  自定义校验规则
  */
var checkNumber = function(rule, value, callback) {
  var val = +value;
  if (val != val) {
    callback(new Error('只能输入数字'));
  } else {
    callback();
  }
}

export var salaryStandRelue = {
  salarystandCode: [{
    required: true,
    message: '请输入薪酬标准编号',
    trigger: 'blur'
  }],
  jobName: [{
    required: true,
    message: '请输入薪酬标准职位',
    trigger: 'blur'
  }],
  salaryMoney: [{
    required: true,
    message: '请输入薪酬总额',
    trigger: 'blur'
  }, {
    validator: checkNumber,
    trigger: 'blur'
  }],
  maker: [
    {
      required: true,
      message: '请输入薪酬标准制定人',
      trigger: 'blur'
    }
  ],
  register: [
    {
      required: true,
      message: '请输入薪酬标准登记人',
      trigger: 'blur'
    }
  ],
  registerTime: [
    {
      required: true,
      message: '请选择登记时间',
      trigger: 'blur'
    }
  ]
}
