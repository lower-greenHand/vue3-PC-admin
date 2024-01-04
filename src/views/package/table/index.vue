<template>
  <div style="width: 100%; height: 100%; border: 1px solid red">
    <div>31237129798<LeftCircleOutlined /></div>
    <Row wrap type="flex" :gutter="{ xs: 24, sm: 24, md: 24, lg: 24 }">
      <Col :xl="16">
        <Carousel arrows draggable>
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 10">
              <LeftCircleOutlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
      </Col>
    </Row>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Row, Col } from 'ant-design-vue';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    Carousel,
    Row,
    Col,
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
::v-deep(.slick-slide) {
  width: 100%;
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
  border-radius: 8px;
}
.custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 10;
}

::v-deep(.ant-carousel .slick-dots-bottom) {
  bottom: 2px;
}
::v-deep(.ant-carousel .slick-prev) {
  font-size: 25px;
  color: #fff;
}
::v-deep(.ant-carousel .slick-next) {
  font-size: 25px;
  color: #fff;
}
.custom-slick-arrow:before {
  display: none;
}
.custom-slick-arrow:hover {
  opacity: 0.5;
  // background: red;
}
</style>
