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
  },
  btn: {
    minw: 30,
    minh: 32,
    w: 180,
    h: 32,
    sticks: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
  },
  input: {
    minw: 50,
    minh: 32,
    w: 180,
    h: 32,
    sticks: ['ml', 'mr'], // 左右
  },
  upload: {
    minw: 50,
    minh: 50,
    w: 100,
    h: 100,
    sticks: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'], // 八个方向
  },
};
