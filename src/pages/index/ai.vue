<template>
  <view class="mt-[160rpx]">
    <leftpop title="lighting AI" @getImg="getAIImg"></leftpop>
    <uv-notify ref="notify"></uv-notify>

    <scroll-view style="position: absolute;overflow: auto;height: calc( 100vh - 332rpx );" :style="{bottom: (inputBottom+52)+'px'}" :scroll-y="true" scroll-with-animation :scroll-into-view="toWhichItem">
      <view v-for="(item, index) in dataList" :style="{'text-align': (item.type === 'keyInput')?'right':'left'}" :key="index" :id="`item-${index}`">
        <view v-if="item.type === 'keyInput'" class="inline-flex justify-end bg-[#bed2db] px-[24rpx] py-[12rpx] mr-[48rpx] mt-[48rpx] rounded-[24rpx]">
          <view class="leading-[52rpx]">{{ item.content }}</view>
        </view>

        <view  v-if="item.type === 'AIreply'" class="inline-flex items-start ml-[48rpx] mt-[48rpx]">
          <uv-image width="48rpx" height="48rpx" :src="linkImg || srcImg" shape="circle"></uv-image>
          <view class="inline-flex justify-start bg-[#dddddd] px-[24rpx] py-[12rpx] ml-[12rpx] mr-[48rpx] rounded-[24rpx]">
            <view class="leading-[52rpx] article-content">{{ item.content }}</view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- <view class="fixed bottom-[32rpx] px-[32rpx] ai-input"> -->
    <view class="mt-[32rpx] px-[32rpx] ai-input" :style="{bottom: inputBottom+'px'}">
      <uv-input
        placeholder="请输入"
        border="surround"
        shape="circle"
        v-model="valueAI"
        customStyle="border-color: #333 !important"
        :adjustPosition="false"
        @confirm="confirmAI"
      ></uv-input>
    </view>

    <uv-loading-page loadingMode="spinner" :loading="isLoading" icon-size="80rpx" bgColor="rgba(0,0,0,0.3)"></uv-loading-page>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, watch, nextTick, onMounted, onUnmounted } from 'vue'
  import leftpop from '../../components/leftPop.vue'
  import { aiSubmit } from "@/api/ai";
  import srcImg from '@/static/logo.png';

  const valueAI = ref()
  // const scrollHeight = ref()

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
      isLoading.value = true
      aiSubmit({content: val}).then((res) => {
        if (res.data.code === 200) {
          if (Array.isArray(dataList.value)) {
            dataList.value.push({
              type: 'AIreply',
              content: res.data.msg.replace(/\\n/g, '\n')
            })
          }
        } else {
          notify.value.show({
            type: 'error',
            message: res.data.msg,
            duration: 1000 * 3,
            safeAreaInsetTop: true
          })
          if(res.data.code === 401) {
            uni.redirectTo({ url: '/pages/login/login' });
          }
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


  // 键盘弹起的处理
  // 需求拆解：当输入框聚焦的时候获取键盘的高度以及获取底部安全距离，获取键盘的高度设置输入框距离底部的高度，那么scroll-view的高度就等于屏幕的高度-键盘的高度-底部安全距离，再让消息自动滚动到底部就可以了。当输入框失去焦点的时候，还原scroll-view的高度即可
  const keyboardHeight = ref(0)
  const inputBottom = ref(16)

  onMounted(() => {
    uni.onKeyboardHeightChange((res) => {
      keyboardHeight.value = res.height
      // scrollHeight.value = 'calc( 100vh - '+(keyboardHeight.value*2+450)+'rpx )'
      console.log(555555, keyboardHeight.value)
      if(res.height) {
        // scrollHeight.value = 'calc( 100vh - '+(keyboardHeight.value*2+410)+'rpx )' // 366px 860rpx (keyboardHeight.value*2+410)
        inputBottom.value = keyboardHeight.value+16
      } else {
        // scrollHeight.value = 'calc( 100vh - 332rpx )' // 141px 332rpx
        inputBottom.value = keyboardHeight.value+16
      }
    });
  })

  onUnmounted(() => {
    uni.offKeyboardHeightChange() // 页面销毁时移除监听
    console.log(666666, keyboardHeight.value)
  })

</script>

<style lang="scss" scoped>
.ai-input {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
}
.article-content {
  white-space: pre-wrap; /* 保留空格和换行，同时允许自动换行 */
  word-wrap: break-word; /* 当单词长度超过容器宽度时，自动断词 */
}
</style>
