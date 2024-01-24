<template>
  <div>
    table列表
    <div style="width: 500px; margin: 30px 0">
      <Input
        placeholder="请输入"
        v-model:value="inputContent"
        style="width: 100%"
        allow-clear
      />
      <Input
        placeholder="请输入"
        v-model:value="inputContent2"
        style="width: 100%; margin-top: 20px"
        allow-clear
      />
    </div>
    <div style="width: 500px">
      <Button @click="getInput">点击获取</Button>
    </div>
    <div
      style="width: 500px; margin: 30px 0; padding: 16px 0"
      :style="{ border: inputContent2 ? '1px solid red' : '1px solid blue' }"
    >
      <div>{{ inputContent2 }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Input, Button } from 'ant-design-vue';
// import DOMPurify from 'dompurify';
// import he from 'he';
export default defineComponent({
  components: {
    Input,
    Button,
  },
  setup() {
    const inputContent = ref('');
    const inputContent2 = ref('');
    // 定义允许的 SQL 关键字和特殊字符
    const whitelist = [
      'SELECT',
      'INSERT',
      'UPDATE',
      'DELETE',
      'FROM',
      'WHERE',
      'AND',
      'OR',
      'LIMIT',
      'ORDER BY',
      'ASC',
      'DESC',
    ];
    const getInput = () => {
      // const div = document.createElement('div');
      // div.innerHTML = inputContent.value;
      // inputContent2.value = escapeHtml(inputContent.value);
      // inputContent2.value = DOMPurify.sanitize(inputContent.value);
      // inputContent2.value = he.encode(inputContent.value);
      inputContent2.value = testInput(inputContent.value);

      // console.log('inputContent===>>>', div.innerHTML);
    };

    function escapeHtml(unsafe) {
      return unsafe.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function testInput(unsafe) {
      return unsafe.replace(
        /[^\u4E00-\u9FA5a-zA-Z0-9,.?!'"();{}\[\]*，。？！’“ （）；【】]/g,
        ''
      );
    }

    function compileSQL(sql) {
      // 使用正则表达式过滤不被允许的关键字和特殊字符
      const regex = new RegExp(`\\b(${whitelist.join('|')})\\b`, 'gi');
      return sql.replace(regex, '');
    }

    return { inputContent, inputContent2, getInput };
  },
});
</script>

<style lang="less" scoped></style>
