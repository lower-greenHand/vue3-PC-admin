// 标签列表
export const tagsList = [
  {
    label: '标签1',
    btnTitle: '',
    field: 'tag',
    value: '1',
  },
  {
    label: '标签2',
    btnTitle: '',
    field: 'tag',
    value: '2',
  },
  {
    label: '标签3',
    btnTitle: '点击',
    field: 'tag-btn',
    value: '3',
  },
  {
    label: '《文件》',
    btnTitle: '点击下载',
    field: 'tag-btn',
    value: '4',
  },
  {
    label: '标签4',
    btnTitle: '自定义按钮',
    field: 'tag-btn',
    value: '5',
  },
];

// 用于统计字符串中文本字符的长度规则
export const patterns = [
  '标签1✕',
  '标签2✕',
  '《文件》点击下载✕',
  '标签3点击✕',
  '标签4自定义按钮✕',
];

// 用于提取输入的内容中固定的模块tag规则
export const regexPatterns =
  /(标签1✕|标签2✕|《文件》点击下载✕|标签3点击✕|标签4自定义按钮✕)/g;

// 默认数据设置
export const defaultSetList = [
  {
    label: '',
    field: 'text',
    btnTitle: '',
    default: '你好啊',
  },
  {
    label: '标签1',
    btnTitle: '',
    field: 'tag',
    value: '1',
  },
  {
    label: '',
    field: 'text',
    btnTitle: '',
    default: '这是一个好系统；',
  },
  {
    label: '标签3',
    btnTitle: '点击',
    field: 'tag-btn',
    value: '3',
  },
  {
    label: '',
    field: 'text',
    btnTitle: '',
    default: '谢谢啦',
  },
];
