<template>
  <view class="recommendedarticle">
    <leftpop title="推荐文章"></leftpop>
    <uv-notify ref="notify"></uv-notify>


    推荐文章
  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import leftpop from '../../components/leftPop.vue'
  import { queryRecommendArticle } from "@/api/recommendedArticle";

  const notify = ref()

  onMounted(() => {
    queryRecommendArticle({}).then((res) => {
      if (res.data.code === 200) {
        console.log(111111, res.data)
      } else {
        notify.value.error(res.data.msg);
      }
    }).finally(() => {
    });
  })
</script>

<style lang="scss" scoped>
.recommendedarticle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
