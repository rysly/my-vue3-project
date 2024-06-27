<template>
  <view class="recommendedarticle mt-[182rpx]">
    <leftpop title="推荐文章"></leftpop>
    <uv-notify ref="notify"></uv-notify>

    <view style="width: 100%;">
      <uv-list>
        <uv-list-item
          :show-extra-icon="true"
          :extra-icon="{icon:'file-text',color:''}"
          :title="item.articleTitle"
          :clickable="true"
          v-for="(item, index) in dataList"
          :key="index"
          @click="articleDetail(item)"
        >
      </uv-list-item>
      </uv-list>
    </view>

		<uv-popup ref="popup" :closeable="true" closeIconPos="top-left" custom-style="width: 100vw; height: 100vh; margin-top: 100rpx; overflow: auto;">
			<view class="px-[32rpx] py-[32rpx]">
        <view class="font-bold text-center text-lg mt-[60rpx]">{{ articleTitle }}</view>
        <!-- <view style="height: calc( 100vh - 320rpx );overflow: auto;">{{ articleContent }}</view> -->
        <view class="article-content">{{ articleContent }}</view>
      </view>
		</uv-popup>

  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import leftpop from '../../components/leftPop.vue'
  import { queryRecommendArticle } from "@/api/recommendedArticle";

  const notify = ref()
  let popup = ref()
  let articleTitle = ref('')
  let articleContent = ref('')

  onMounted(() => {
    queryRecommendArticle({}).then((res) => {
      if (res.data.code === 200) {
        dataList.value = res.data.data
      } else {
        notify.value.show({
          type: 'error',
          message: res.data.msg,
          duration: 1000 * 3,
          safeAreaInsetTop: true
        })
        if(res.data.code === 401) {
          setTimeout(() => {
            uni.redirectTo({ url: '/pages/login/login' });
          }, 3000);
        }
      }
    }).finally(() => {
    });
  })

  const dataList = ref<dataList[]>([])
  interface dataList {
    id: number
    articleTitle: string
    articleType: string
    recommend: boolean
  }

  const articleDetail = (val:any) => {
    popup.value.open('right')
    articleTitle.value = val.articleTitle
    articleContent.value = val.articleContent
  }
</script>

<style lang="scss" scoped>
.article-content {
  white-space: pre-wrap; /* 保留空格和换行，同时允许自动换行 */
  word-wrap: break-word; /* 当单词长度超过容器宽度时，自动断词 */
}
</style>
