import {
  Input,
  Textarea,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Upload,
} from 'ant-design-vue';
export const menuFunList = [
  {
    id: '1',
    name: '文本输入框',
    label: '标签',
    field: 'textField',
    icon: 'text-input-icon',
    component: 'Input',
    modelProp: 'value',
    componentProps: {
      placeholder: '请输入内容',
    },
  },
  {
    id: '2',
    name: '多行输入框',
    label: '标签',
    field: 'textareaField',
    icon: 'more-line-input-icon',
    component: 'Textarea',
    modelProp: 'value',
    componentProps: {
      placeholder: '请输入内容',
    },
  },
  {
    id: '3',
    name: '数字输入框',
    label: '标签',
    field: 'numberInput',
    icon: 'number-input-icon',
    component: 'InputNumber',
    modelProp: 'value',
    componentProps: {
      placeholder: '请输入内容',
    },
  },
  {
    id: '4',
    name: '下拉框',
    label: '标签',
    field: 'selectField',
    icon: 'select-icon',
    component: 'Select',
    modelProp: 'value',
    componentProps: {
      placeholder: '请选择',
    },
  },
  {
    id: '5',
    name: '日期选择框',
    label: '标签',
    field: 'dataPickerField',
    icon: 'data-select-icon',
    component: 'DatePicker',
    modelProp: 'value',
    componentProps: {
      placeholder: '请选择',
      options: [],
    },
  },
  {
    id: '6',
    name: '开关',
    label: '标签',
    field: 'switchField',
    icon: 'switch-icon',
    component: 'Switch',
    modelProp: 'checked',
    componentProps: {
      width: 'auto',
    },
  },
  {
    id: '7',
    name: '上传',
    label: '标签',
    field: 'uploadField',
    icon: 'upload-icon',
    isSlots: true,
    component: 'Upload',
    modelProp: 'value',
    componentProps: {
      width: 'auto',
    },
  },
];

const componentMap = {
  Input: Input,
  InputNumber: InputNumber,
  Select: Select,
  DatePicker: DatePicker,
  Textarea: Textarea,
  Switch: Switch,
  Upload: Upload,
  // ...
};
export const getComponents = (component) => {
  if (!component) return Input;
  return componentMap[component];
};
