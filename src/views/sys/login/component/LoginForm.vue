<template>
  <div class="form-list">
    <p class="title">Login</p>
    <Form
      :model="formState"
      autocomplete="on"
      :rules="getRules"
      @finish="handleFinish"
      @keypress.enter="handleFinish"
    >
      <FormItem name="usename">
        <Input
          v-model:value="formState.usename"
          placeholder="请输入账号"
          allow-clear
        >
          <template #prefix><UserOutlined style="color: #fff" /></template>
        </Input>
      </FormItem>
      <FormItem name="password">
        <InputPassword
          v-model:value="formState.password"
          type="password"
          allow-clear
          autocomplete="on"
          visibilityToggle
          placeholder="请输入密码"
        >
          <template #prefix><LockOutlined style="color: #fff" /></template>
        </InputPassword>
      </FormItem>
      <div class="forget-pwd">
        <label @click="handleForget">忘记密码</label>
      </div>
      <FormItem>
        <Button type="primary" html-type="submit" :loading="loading">
          登录
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Form, Input, Button } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { getRules } from '../data';
import useStoreOut from '/@/store/module/use.js';
export default defineComponent({
  components: {
    Form,
    FormItem: Form.Item,
    Input,
    Button,
    InputPassword: Input.Password,
    UserOutlined,
    LockOutlined,
  },
  emits: ['change-status'],
  setup(_, { emit }) {
    const useStore = useStoreOut();
    const formState = ref({
      usename: 'admin',
      password: 'admin@123',
    });
    const loading = ref(false);

    const handleFinish = async (values) => {
      if (!values) return;
      loading.value = true;
      try {
        await useStore.login(formState.value);
      } finally {
        loading.value = false;
      }
    };

    // 忘记密码
    const handleForget = () => {
      emit('change-status', 1);
    };
    return { formState, loading, getRules, handleFinish, handleForget };
  },
});
</script>

<style lang="less" scoped></style>
