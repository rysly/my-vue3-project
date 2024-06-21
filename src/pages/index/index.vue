<template>
  <view class="content">
    <view @click="toJump('index')">light AI</view>
    <view @click="toJump('manage')">管理界面</view>
    <view @click="toJump('newArticle')">最新文章</view>
    <view @click="toJump('recommendedArticle')">推荐文章</view>
    <view @click="toJump('tool')">软件工具</view>
    <view @click="toJump('me')">个人用户</view>
  </view>
</template>

<script setup lang="ts">
  const toJump = (type) => {
    let toUrl
    switch (type) {
      case 'index':
        toUrl = '/pages/index/index'
        break 
      case 'manage':
        toUrl = '/pages/index/manage'
        break 
      case 'newArticle':
        toUrl = '/pages/index/newArticle'
        break 
      case 'recommendedArticle':
        toUrl = '/pages/index/recommendedArticle'
        break 
      case 'tool':
        toUrl = '/pages/index/tool'
        break 
      case 'me':
        toUrl = '/pages/index/me'
        break 
      default:
        toUrl = '/pages/index/index'
    }
    uni.redirectTo({ url: toUrl });
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
