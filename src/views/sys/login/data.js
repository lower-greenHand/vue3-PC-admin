// 登录校验
export const getRules = {
  usename: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
};

// 重置密码校验
export const getFormRules = {
  phone: [{ required: true, message: '请输入手机号' }],
  validCode: [{ required: true, message: '请输入验证码' }],
};
