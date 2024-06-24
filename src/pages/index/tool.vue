<template>
  <view class="tool">
    <leftpop title="软件工具"></leftpop>
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


		<uv-popup ref="popup" :closeable="true" custom-style="width: 100vw; height: 100vh; margin-top: 10vh">
			<view class="px-[32rpx] py-[32rpx]">
        <view class="font-bold text-center text-lg">{{ articleTitle }}</view>
        <view>{{ articleContent }}</view>
      </view>
		</uv-popup>

  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import leftpop from '../../components/leftPop.vue'
  import { queryArticle } from "@/api/fileManage";

  const notify = ref()
  let popup = ref()
  let articleTitle = ref('')
  let articleContent = ref('')

  onMounted(() => {
    queryArticle({articleType: '软件工具'}).then((res) => {
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
.tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200rpx;
}
</style>
