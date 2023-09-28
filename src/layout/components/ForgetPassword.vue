<template>
  <div class="forget-pwd">
    <Modal
      v-model:visible="visibleModal"
      :maskClosable="false"
      title="忘记密码"
      ok-text="确认"
      cancel-text="取消"
      @ok="submitForm"
    >
      <Form :label-col="labelCol" :wrapper-col="wrapperCol">
        <FormItem label="原密码" v-bind="validateInfos.oldPassword">
          <InputPassword
            v-model:value="formObject.oldPassword"
            @blur="validate('oldPassword')"
            @input="validate('oldPassword')"
            allow-clear
            autocomplete="off"
            :maxlength="12"
          />
        </FormItem>
        <FormItem label="新密码" v-bind="validateInfos.newPassword">
          <InputPassword
            v-model:value="formObject.newPassword"
            allow-clear
            @blur="validate('newPassword')"
            autocomplete="off"
            :maxlength="12"
          />
        </FormItem>
        <FormItem label="确认新密码" v-bind="validateInfos.confirmPassword">
          <InputPassword
            v-model:value="formObject.confirmPassword"
            allow-clear
            @blur="validate('confirmPassword')"
            autocomplete="off"
            :maxlength="12"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { Modal, Form, Input } from 'ant-design-vue';
const useForm = Form.useForm;
export default defineComponent({
  components: {
    Modal,
    Form,
    FormItem: Form.Item,
    InputPassword: Input.Password,
  },
  setup() {
    const visibleModal = ref(false);
    const newRegular = ref(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{6,12}$/);
    const message = ref(
      '密码必须至少包含一个数字、一个字母和一个符号，并且长度在6-12位'
    );
    const formObject = reactive({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    // 原密码校验
    const validateOldPwd = (_rule, value) => {
      if (value) {
        if (!newRegular.value.test(value)) {
          return Promise.reject(message.value);
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    };

    // 新密码校验
    const validateNewPwd = (_rule, value) => {
      if (value) {
        if (!newRegular.value.test(value)) {
          return Promise.reject(message.value);
        } else if (value == formObject.oldPassword) {
          return Promise.reject('新密码与原密码不能一致');
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    };
    const validateConifrmPwd = (_rule, value) => {
      if (value) {
        if (!newRegular.value.test(value)) {
          return Promise.reject(message.value);
        } else if (value !== formObject.newPassword) {
          return Promise.reject('确认新密码与新密码不一致');
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    };
    // 忘记密码规则
    const getRules = reactive({
      oldPassword: [
        {
          required: true,
          message: '请输入原密码',
          trigger: 'blur',
        },
        // { validator: validateOldPwd, trigger: 'blur' },
      ],
      newPassword: [
        {
          required: true,
          message: '请输入新密码',
          trigger: 'blur',
        },
        { validator: validateNewPwd, trigger: 'change' },
      ],
      confirmPassword: [
        {
          required: true,
          message: '请输入确认新密码',
          trigger: 'blur',
        },
        { required: true, validator: validateConifrmPwd, trigger: 'change' },
      ],
    });

    const { resetFields, validate, validateInfos } = useForm(
      formObject,
      getRules
    );

    const openModal = () => {
      visibleModal.value = true;
      resetFields();
    };

    const submitForm = async () => {
      const data = await validate();
    };
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
      visibleModal,
      formObject,
      validateInfos,
      validate,
      openModal,
      submitForm,
    };
  },
});
</script>

<style lang="less" scoped></style>
