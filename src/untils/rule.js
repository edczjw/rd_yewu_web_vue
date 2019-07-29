var mobile = (rule, value, callback) => {
  // debugger
  if (value === '') {
    callback(new Error('输入QQ号'))
  } else if (/^[1-9][0-9]{4,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('输入正确的QQ号'))
  }
}

// 类似金钱,首位不为0,最多2位小数
export function checkNumPot2(rule, value, callback) {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (!value) {
    return callback(new Error('请填写数字'))
  } else if (!reg.test(value)) {
    return callback(new Error('请填写数字,最多2位小数'))
  } else {
    callback()
  }
}

// 身份证
export function checkIdNum(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('证件号码不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码格式不正确'))
  } else {
    callback()
  }
}

//邮箱
export function emailValue(rule, value, callback) {
  let temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
  let tempOne = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
  if (!value) {
    return callback(new Error('请填写邮箱'))
  } else if (value && (!(temp).test(value))) {
    callback(new Error('邮箱格式不符合规范'))
  } else {
    callback()
  }
}

// 整数
export function checkInterNum(rule, value, callback) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    return callback(new Error('请填写整数'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

// 范围
export function checkrange(rule, value, callback) {
  if (value < 10000) {
    return callback(new Error('不得小于10000！'))
  } else if (value > 10000000) {
    return callback(new Error('不得大于10000000！'))
  } else {
    callback()
  }
}

// 范围
export function checkday(rule, value, callback) {
  if (value < 7) {
    return callback(new Error('不得小于7天！'))
  } else if (value > 180) {
    return callback(new Error('不得大于180天！'))
  } else {
    callback()
  }
}

export default {
  day: [{
    required: true,
    validator: checkday,
    trigger: 'blur'
  }],
  range: [{
    required: true,
    validator: checkrange,
    trigger: 'blur'
  }],
  enterpriseName: [{
    required: true,
    message: '此处不能为空，没有则填无。',
    trigger: 'blur'
  }],
  kong: [{
    required: true,
    message: '此处不能为空。',
    trigger: 'blur'
  }],
  number: [{
      required: true,
      message: '此处不能为空，没有则填0。',
      trigger: 'blur'
    },
    {
      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
      message: '请输入数字。',
      trigger: 'blur'
    },
  ],
  mobile: [{
    required: true,
    validator: mobile,
    trigger: 'blur'
  }],
  phone: [{
      required: true,
      message: '号码不能为空。',
      trigger: 'blur'
    },
    {
      max: 11,
      message: '长度 11 个字符。',
      trigger: 'blur'
    },
    {
      pattern: /^1[34578]\d{9}$/,
      message: '请输入正确格式的手机号码。',
      trigger: 'blur'
    }
  ],
  mail: [{
    required: true,
    validator: emailValue,
    trigger: 'blur'
  }],
  checkid: [{
    required: true,
    validator: checkIdNum,
    trigger: 'blur'
  }],
  InterNum: [{
    required: true,
    validator: checkInterNum,
    trigger: 'blur'
  }],
  name: [{
    required: true,
    message: "请输入姓名",
    trigger: "blur"
  }],
  pass: [{
    min: 8,
    message: '密码最少8位。',
    trigger: 'blur'
  }, {
    required: true,
    message: "请输入密码",
    trigger: "blur"
  }],

}
