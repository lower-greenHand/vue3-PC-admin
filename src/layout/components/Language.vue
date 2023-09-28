<template>
  <Dropdown
    destroyPopupOnHide
    :getPopupContainer="getPopupContainer"
    placement="bottom"
    trigger="['click']"
    class="language-menu"
  >
    <div class="language"><SvgIcon name="language" size="25" /></div>
    <template #overlay>
      <Menu @click="handleSelect" v-model:selectedKeys="selectedKeys">
        <MenuItem v-for="item in languageType" :key="item.key">
          <div>{{ item.title }}</div>
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { Dropdown, Menu } from 'ant-design-vue';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import { languageType } from '../data';
export default defineComponent({
  components: {
    Dropdown,
    SvgIcon,
    Menu,
    MenuItem: Menu.Item,
  },
  setup() {
    const selectedKeys = ref();
    const getPopupContainer = (trigger) => {
      return trigger.parentNode ?? document.body;
    };

    onMounted(() => {
      selectedKeys.value = [`${localStorage.getItem('lang') || 'zh_CN'}`];
    });

    // 选择语种
    const handleSelect = (item) => {
      selectedKeys.value = [`${item.key}`];
      localStorage.setItem('lang', item.key);
      window.location.reload();
    };
    return { languageType, selectedKeys, getPopupContainer, handleSelect };
  },
});
</script>

<style lang="less" scoped>
.language-menu {
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
}

::v-deep(.ant-dropdown-menu-item, ) {
  text-align: center;
}
</style>
