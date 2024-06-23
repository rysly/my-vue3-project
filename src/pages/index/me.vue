<template>
  <view class="me">
    <leftpop title="个人用户"></leftpop>

    <view @click="logOut">退出登陆</view>
  </view>
</template>

<script setup lang="ts">
  import leftpop from '../../components/leftPop.vue'

  const logOut = () => {
    uni.redirectTo({ url: '/pages/login/login' });
  }
</script>

<style lang="scss" scoped>
.me {
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
