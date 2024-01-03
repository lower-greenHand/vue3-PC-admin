<template>
  <div class="person-info">
    <div class="person-info-title">当前用户信息</div>
    <div class="person-info-data">
      <div style="display: flex; align-items: center">
        <div class="person-info-data-avatar">
          <img :src="headerImg" alt="" />
        </div>
        <div class="person-info-data-detail">
          <div class="person-info-data-detail__name">
            你好！Mamba，开始你一天的工作吧
          </div>
          <div class="person-info-data-detail__profile">
            从哪里摔倒，那就从那里.............再摔倒一次
          </div>
        </div>
      </div>
      <div class="person-info-data-list">
        <div
          class="person-info-data-list__item"
          v-for="(item, index) in listItem"
          :key="index"
        >
          <div>{{ item.title }}</div>
          <div>{{ item.value }}</div>
        </div>
      </div>
    </div>
    <div class="person-info-mid">
      <Row wrap type="flex" :gutter="{ xs: 24, sm: 24, md: 24, lg: 24 }">
        <Col :xl="16"> <DetailList /></Col>
        <Col :xl="8"> <div>3123123</div></Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Button, Row, Col } from 'ant-design-vue';
import headerImg from '/@/assets/images/avatar.png';
import { listItem } from './data';
import DetailList from './components/DetailList.vue';
export default defineComponent({
  components: {
    DetailList,
    Button,
    Row,
    Col,
  },
  setup() {
    return { headerImg, listItem };
  },
});
</script>

<style lang="less" scoped>
.person-info {
  height: 100%;
  &-title {
    font-size: @font-common-size;
    font-weight: bold;
  }
  &-data {
    padding: 16px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 3px 5px 0px rgba(20, 20, 20, 0.1);
    &-avatar {
      width: 70px;
      height: 70px;
      img {
        border-radius: 100%;
        width: 100%;
        height: 100%;
        border: 1px solid #d0d0d0;
      }
    }
    &-detail {
      margin-left: 16px;
      color: #141414;
      &__name {
        font-size: 18px;
        font-weight: bold;
      }
      &__profile {
        margin-top: 2px;
        font-size: 14px;
        color: @text-color-secondary;
      }
    }
    &-list {
      display: flex;
      &__item {
        margin-right: 24px;
        div:nth-child(1) {
          font-size: 16px;
          color: rgb(8, 160, 255);
          text-align: right;
        }
        div:nth-child(2) {
          margin-top: 2px;
          color: rgb(8, 160, 255);
          text-align: right;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  &-mid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
