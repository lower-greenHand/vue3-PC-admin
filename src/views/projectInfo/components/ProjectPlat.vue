<template>
  <div class="right-palt">
    <div class="right-palt-navigation">
      <div>快捷导航</div>
      <Row wrap type="flex" class="nagiv-card">
        <Col :span="8" v-for="item in navigationMenuList" :key="item.key">
          <Card>
            <CardGrid class="card-item">
              <SvgIcon :name="item.icon" :color="item.color" />
              <div class="title">{{ item.value }}</div>
            </CardGrid>
          </Card>
        </Col>
      </Row>
    </div>
    <div class="two-title">功能预览</div>
    <div class="swiper-preview">
      <Carousel arrows draggable autoplay>
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
        <div
          v-for="item in swiperList"
          :key="item.key"
          style="width: 100%; height: auto; border: 1px solid red"
        >
          <img :src="item.imgUrl" alt="" />
        </div>
      </Carousel>
    </div>
    <div class="two-title">日历</div>
    <div class="calendar-preview">
      <Calendar :fullscreen="false" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Row, Col, Card, Carousel, Calendar } from 'ant-design-vue';
import { navigationMenuList, swiperList } from '../data';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    Row,
    Col,
    Card,
    CardGrid: Card.Grid,
    Carousel,
    SvgIcon,
    Calendar,
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  setup() {
    const getImgUrl = () => {};
    return { navigationMenuList, swiperList, getImgUrl };
  },
});
</script>

<style lang="less" scoped>
.right-palt {
  margin-left: 10px;
  margin-left: 0px;
  width: 100%;
  height: 100%;
  &-navigation {
    width: 100%;
    margin-top: 16px;
    font-size: @font-common-size;
    font-weight: bold;
    ::v-deep(.ant-card) {
      width: 100%;
    }
    ::v-deep(.ant-card-body) {
      padding: 0;
    }
    ::v-deep(.ant-card-grid) {
      padding: 16px;
    }
    .nagiv-card {
      margin-top: 16px;
      box-shadow: 0px 0px 5px 0px rgba(20, 20, 20, 0.1);
      .card-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #727272;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
        .title {
          margin-top: 6px;
        }
      }
    }
  }
  .two-title {
    margin: 16px 0;
    font-size: @font-common-size;
    font-weight: bold;
  }
  .swiper-preview {
    ::v-deep(.slick-slide) {
      width: 100%;
      height: auto;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      align-content: center;
      border-radius: 8px;
    }
    ::v-deep(.custom-slick-arrow) {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #1890ff;
      background-color: transparent;
      opacity: 0.5;
      z-index: 10000;
    }
    ::v-deep(.ant-carousel .slick-prev) {
      font-size: 25px;
      color: #1890ff;
    }
    ::v-deep(.ant-carousel .slick-next) {
      font-size: 25px;
      color: #1890ff;
    }

    ::v-deep(.custom-slick-arrow:before) {
      display: none;
    }
    ::v-deep(.custom-slick-arrow:hover) {
      opacity: 0.8;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .calendar-preview {
    width: 100%;
    height: 412px;
    ::v-deep(.ant-picker-cell) {
      padding: 14px 0;
    }
  }
}
</style>
