<template>
  <view class="newarticle">
    <leftpop title="最新文章"></leftpop>


    最新文章
  </view>
</template>

<script setup lang="ts">
  import leftpop from '../../components/leftPop.vue'

</script>

<style lang="scss" scoped>
.newarticle {
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
