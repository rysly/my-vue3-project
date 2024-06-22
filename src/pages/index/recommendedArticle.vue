<template>
  <view class="recommendedarticle">
    <leftpop title="推荐文章"></leftpop>


    推荐文章
  </view>
</template>

<script setup lang="ts">
  import leftpop from '../../components/leftPop.vue'

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
