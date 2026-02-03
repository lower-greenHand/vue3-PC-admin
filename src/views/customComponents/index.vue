<template>
  <div class="low_code_platform">
    <Row :gutter="24" type="flex" class="h-full">
      <Col flex="220px">
        <MenuFun />
      </Col>
      <Col flex="1" style="overflow-y: auto">
        <ComponentLayout />
      </Col>
    </Row>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Row, Col } from 'ant-design-vue';
import MenuFun from './components/MenuFun.vue';
import ComponentLayout from './components/ComponentLayout.vue';
export default defineComponent({
  components: {
    Row,
    Col,
    MenuFun,
    ComponentLayout,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.low_code_platform {
  width: 100%;
  height: 100vh;
  padding: 40px;
  overflow: hidden;

  // .common-layout {
  //   height: 100%;
  // }
}
</style>
