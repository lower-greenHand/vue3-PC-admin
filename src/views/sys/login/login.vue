<template>
  <div class="admin-login">
    <LoginBg />
    <SysTitle />
    <div class="admin-login-form">
      <LoginForm v-if="loginStatus == 0" @change-status="changeStatus" />
      <ForgetPassword
        v-else-if="loginStatus == 1"
        @change-status="changeStatus"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import LoginBg from './component/LoginBg.vue';
import SysTitle from './component/SysTitle.vue';
import LoginForm from './component/LoginForm.vue';
import ForgetPassword from './component/ForgetPassword.vue';
export default defineComponent({
  components: { LoginBg, SysTitle, LoginForm, ForgetPassword },
  setup() {
    const loginStatus = ref(0);

    const changeStatus = (index) => {
      loginStatus.value = index;
    };
    return { loginStatus, changeStatus };
  },
});
</script>

<style lang="less">
@import './index.less';
</style>
