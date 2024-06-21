<template>
  <view class="content">
    <view @click="goback">Back</view>

    管理
  </view>
</template>

<script setup lang="ts">
  const goback = () => {
    uni.redirectTo({ url: '/pages/index/index' });
  }
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: -200px;
  margin-bottom: 0;
}
</style>
