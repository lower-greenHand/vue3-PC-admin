<template>
  <div class="project-detail">
    <div class="project-detail-title">
      <div>项目资料</div>
      <div class="more">更多</div>
    </div>
    <div class="project-detail-card">
      <Row wrap type="flex">
        <Col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="8"
          v-for="(item, index) in projectBasicList"
          :key="index"
        >
          <Card>
            <CardGrid class="card-item" @click="tabChange(item)">
              <div class="card-item-title">
                <SvgIcon
                  :name="item.icon"
                  :size="20"
                  v-show="item.icon.indexOf('https://') == -1"
                />
                <img
                  :src="item.icon"
                  width="20"
                  height="20"
                  v-show="item.icon.indexOf('https://') != -1"
                />
                <span style="margin-left: 8px">{{ item.title }}</span>
              </div>
              <div class="card-item-desc">{{ item.type }}</div>
              <div class="card-item-desc" :title="item.address">
                地址：{{ item.address }}
              </div>
              <div class="card-item-desc" style="color: rgb(255, 172, 47)">
                日期：{{ item.date }}
              </div>
            </CardGrid>
          </Card>
        </Col>
      </Row>
    </div>
    <div class="project-detail-notice">
      <div>动态通知</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Card, Row, Col } from 'ant-design-vue';
import SvgIcon from '/@/components/SvgIcon/index.vue';
import { projectBasicList } from '../data';
export default defineComponent({
  components: {
    Card,
    CardGrid: Card.Grid,
    SvgIcon,
    Row,
    Col,
  },
  setup() {
    const tabChange = (key) => {
      window.open(key.address, '_blank');
    };
    return { projectBasicList, tabChange };
  },
});
</script>

<style lang="less" scoped>
.project-detail {
  margin-top: 16px;
  width: 100%;
  margin-left: 0px;
  position: relative;
  ::v-deep(.ant-card) {
    width: 100%;
  }
  ::v-deep(.ant-card-body) {
    padding: 0;
  }
  ::v-deep(.ant-card-grid) {
    padding: 16px;
  }
  &-title {
    font-size: @font-common-size;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-card {
    margin-left: 1px;
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 2px 10px rgba(20, 20, 20, 0.1);
    .card-item {
      width: 100%;
      &:hover {
        cursor: pointer;
      }
      &-title {
        display: flex;
        align-items: center;
        font-size: @font-size-base;
        font-weight: bold;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: @font-size-base;
        margin: 4px 0;
        width: 100%;
        color: @text-color-secondary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  &-notice {
    margin-top: 16px;
    font-size: @font-common-size;

    font-weight: bold;
  }
  .more {
    font-size: @font-size-base;
    color: rgb(8, 160, 255);
    cursor: pointer;
  }
}
</style>
