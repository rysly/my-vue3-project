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
        <view>{{ articleContent }}</view>
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
</style>
