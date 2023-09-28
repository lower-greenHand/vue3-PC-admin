<template>
  <Row type="flex" wrap :gutter="[16, 16]" class="mamb-card-ant">
    <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
      <Card title="浏览量">
        <div class="data-content">
          <div class="data-content__data">
            {{ Number('92839').toLocaleString() }}
          </div>
          <div class="data-content__image">
            <img src="../../../assets/images/databoard/browse.png" />
          </div>
        </div>
      </Card>
    </Col>
    <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
      <Card title="下载数">
        <div class="data-content">
          <div class="data-content__data">82,421</div>
          <div class="data-content__image">
            <img src="../../../assets/images/databoard/import.png" />
          </div>
        </div>
      </Card>
    </Col>
    <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
      <Card title="点赞量">
        <div class="data-content">
          <div class="data-content__data">1,032,839</div>
          <div class="data-content__image">
            <img src="../../../assets/images/databoard/like.png" />
          </div>
        </div>
      </Card>
    </Col>
    <Col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
      <Card title="更新幅度">
        <div class="data-content">
          <div class="data-content__data">890</div>
          <div class="data-content__image">
            <img src="../../../assets/images/databoard/update-amplitude.png" />
          </div>
        </div>
      </Card>
    </Col>
  </Row>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Card, Row, Col } from 'ant-design-vue';

export default defineComponent({
  name: 'CardListInfo',
  components: {
    Card,
    Row,
    Col,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.data-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__data {
    font-size: 18px;
    font-weight: bold;
  }
  &__image {
    width: 55px;
    height: 55px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
