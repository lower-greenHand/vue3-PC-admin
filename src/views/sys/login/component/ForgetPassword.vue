<template>
  <div class="form-list">
    <p class="title">重置密码</p>
    <Form
      ref="formRef"
      autocomplete="on"
      :model="formState"
      :rules="getFormRules"
    >
      <FormItem name="phone">
        <Input
          v-model:value="formState.phone"
          placeholder="请输入手机号"
          allow-clear
        >
        </Input>
      </FormItem>
      <FormItem name="validCode">
        <Row align="middle" justify="space-between">
          <Col span="16">
            <Input
              v-model:value="formState.validCode"
              :maxlength="6"
              placeholder="请输入验证码"
              allow-clear
            >
            </Input
          ></Col>
          <Col span="6" class="form-code"
            ><Button @click="sendValidCode">发送验证码</Button></Col
          >
        </Row>
      </FormItem>
      <FormItem>
        <Row align="middle" justify="space-between">
          <Col span="11">
            <Button @click="handleBackLogin">返回</Button>
          </Col>
          <Col span="11">
            <Button type="primary" html-type="submit" @click="resetPassword"
              >重置</Button
            >
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Form, Input, Button, Row, Col } from 'ant-design-vue';
import { getFormRules } from '../data';
export default defineComponent({
  components: {
    Form,
    FormItem: Form.Item,
    Input,
    Button,
    Row,
    Col,
  },
  emits: ['change-status'],
  setup(_, { emit }) {
    const formRef = ref(null);
    const formState = ref({
      phone: '',
      validCode: '',
    });
    const resetPassword = () => {
      console.log('312', formRef.value.validate());
    };
    const handleBackLogin = () => {
      emit('change-status', 0);
    };

    const sendValidCode = () => {
      formRef.value.validateField('inputField');
    };
    return {
      formRef,
      getFormRules,
      formState,
      resetPassword,
      handleBackLogin,
      sendValidCode,
    };
  },
});
</script>

<style lang="less" scoped>
.form-code {
  ::v-deep(.ant-btn) {
    margin-top: 0 !important;
  }
}
</style>
