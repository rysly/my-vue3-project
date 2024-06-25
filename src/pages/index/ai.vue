<template>
  <view class="mt-[160rpx] h-[1000rpx]">
    <leftpop title="lighting AI" @getImg="getAIImg"></leftpop>
    <uv-notify ref="notify"></uv-notify>






    <scroll-view style="height:calc( 100vh - 300rpx );overflow:auto;" :scroll-y="true" scroll-with-animation :scroll-into-view="toWhichItem">
      <view v-for="(item, index) in dataList" :style="{'text-align': (item.type === 'keyInput')?'right':'left'}" :key="index" :id="`item-${index}`">
        <view v-if="item.type === 'keyInput'" class="inline-flex justify-end bg-[#bed2db] px-[24rpx] py-[12rpx] mr-[48rpx] mt-[48rpx] rounded-[24rpx]">
          <view class="leading-[52rpx]">{{ item.content }}</view>
        </view>

        <view  v-if="item.type === 'AIreply'" class="inline-flex items-start ml-[48rpx] mt-[48rpx]">
          <uv-image width="48rpx" height="48rpx" :src="linkImg || srcImg" shape="circle"></uv-image>
          <view class="inline-flex justify-start bg-[#dddddd] px-[24rpx] py-[12rpx] ml-[12rpx] mr-[48rpx] rounded-[24rpx]">
            <view class="leading-[52rpx]">{{ item.content }}</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="fixed bottom-[32rpx] px-[32rpx] ai-input">
      <uv-input
        placeholder="请输入"
        border="surround"
        shape="circle"
        v-model="valueAI"
        customStyle="border-color: #333 !important"
        @confirm="confirmAI"
      ></uv-input>
    </view>







    <uv-loading-page loadingMode="spinner" :loading="isLoading" icon-size="80rpx" bgColor="rgba(0,0,0,0.3)"></uv-loading-page>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, nextTick } from 'vue'
  import leftpop from '../../components/leftPop.vue'
  import { aiSubmit } from "@/api/ai";
  import srcImg from '@/static/logo.png';

  const valueAI = ref()

  const dataList = ref<dataList[]>([])

  interface dataList {
    type: string
    content: string
  }

  const notify = ref()
  const isLoading = ref(false)

  // scroll-into-view指向的id值
  let toWhichItem = ref('')
  // 动态更新toWhichItem的值
  watch(dataList,(newval, oldval)=>{
    // 重新赋值toWhichItem,延迟到dom更新之后进行，否则没效果
    nextTick(()=>{
      toWhichItem.value = "item-" + (newval.length - 1)
    })
  },{
    deep:true, //深度监视
    immediate:true //初始化立即执行
  })

  const confirmAI = (val:any) => {
    if(val) {
      valueAI.value = ''
      if (Array.isArray(dataList.value)) {
        dataList.value.push({
          type: 'keyInput',
          content: val
        })
      }
      setTimeout(() => {
        isLoading.value = true
      }, 200);
      aiSubmit({content: val}).then((res) => {
        if (res.data.code === 200) {
          if (Array.isArray(dataList.value)) {
            dataList.value.push({
              type: 'AIreply',
              content: res.data.msg
            })
          }
        } else {
          notify.value.show({
            type: 'error',
            message: res.data.msg,
            duration: 1000 * 3,
            safeAreaInsetTop: true
          })
        }
        isLoading.value = false

      }).finally(() => {
      });
    }
  }
  const linkImg = ref()
  const getAIImg = (val:string) => {
    linkImg.value = val
  }

</script>

<style lang="scss" scoped>
.ai-input {
  width: 100%;
  box-sizing: border-box;
}
</style>
