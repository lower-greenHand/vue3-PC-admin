export const widgetsTypeList = [
  {
    key: 'text',
    widgetType: 'text',
    type: 'text',
    label: 'Text',
    icon: 'text',
    size: 16,
  },
  {
    key: 'btn',
    widgetType: 'button',
    type: 'primary',
    label: '按钮',
    icon: 'btn',
    size: 32,
  },
  {
    key: 'input',
    widgetType: 'input',
    type: 'input',
    label: 'Input',
    icon: 'input',
    size: 26,
  },
  {
    key: 'upload',
    widgetType: 'upload',
    type: 'upload',
    label: 'Upload',
    icon: 'upload',
    size: 22,
  },
];

export const widgetsDragList = {
  text: {
    minw: 30,
    minh: 32,
    w: 90,
    h: 32,
    sticks: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
    label: '文本',
    type: '',
    fontColor: '#141414',
    fontSize: 14,
    bgColor: '#ffffff',
  },
  btn: {
    minw: 30,
    minh: 32,
    w: 180,
    h: 32,
    sticks: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
    label: '按钮',
    type: 'primary',
    fontColor: '#141414',
    fontSize: 14,
    bgColor: '#ffffff',
  },
  input: {
    minw: 50,
    minh: 32,
    w: 180,
    h: 32,
    sticks: ['ml', 'mr'], // 左右
    label: '输入框',
    type: '',
    fontColor: '#141414',
    fontSize: 14,
    bgColor: '#ffffff',
  },
  upload: {
    minw: 50,
    minh: 50,
    w: 100,
    h: 100,
    sticks: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'], // 八个方向
    label: '上传',
    type: '',
    fontColor: '#141414',
    fontSize: 14,
    bgColor: '#ffffff',
  },
};

export const btnTypeList = [
  {
    label: 'primary',
    value: 'primary',
  },
  {
    label: 'default',
    value: 'default',
  },
  {
    label: 'link',
    value: 'link',
  },
];
