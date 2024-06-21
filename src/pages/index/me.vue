<template>
  <view class="content">
    个人用户

    
    <view @click="logOut">退出登陆</view>
  </view>
</template>

<script setup lang="ts">
  const logOut = () => {
    uni.redirectTo({ url: '/pages/login/login' });
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
