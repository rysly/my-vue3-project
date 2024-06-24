<template>
  <view>
    <uv-notify ref="notify"></uv-notify>

		<uv-navbar :title="title" @leftClick="showLeftPop">
      <template v-slot:left>
				<view>
					<uv-icon name="list" size="20"></uv-icon>
				</view>
			</template>
		</uv-navbar>


		<uv-popup ref="popup">
			<view class="pt-[80rpx] w-[500rpx]">
        <view class="p-[32rpx]" @click="toJump('ai')">lighting AI</view>
        <view class="p-[32rpx]" @click="toJump('fileManage')">文章管理</view>
        <uv-collapse :value="collapseVal">
          <uv-collapse-item title="文章与教程" name="a">
            <view class="p-[32rpx]" @click="toJump('newArticle')">最新文章</view>
            <view class="p-[32rpx]" @click="toJump('recommendedArticle')">推荐文章</view>
          </uv-collapse-item>
        </uv-collapse>
        <view class="p-[32rpx]" @click="toJump('tool')">软件工具</view>
        <view class="p-[32rpx] absolute bottom-[32rpx]" @click="toJump('me')">个人用户: {{ username }}</view>
			</view>
		</uv-popup>


  </view>
</template>

<script setup lang="ts">
  import { ref, toRefs, onMounted } from 'vue';
import { commonInfo } from "@/api/common";
import { userInfoStore } from '@/stores/user';

  const toJump = (type:string) => {
    let toUrl = ''
    switch (type) {
      case 'ai':
        toUrl = '/pages/index/ai'
        break
      case 'fileManage':
        toUrl = '/pages/index/fileManage'
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
    }
    uni.redirectTo({ url: toUrl })
  }

  let popup = ref()
  let collapseVal = ref()

  const showLeftPop = () => {
    popup.value.open('left')
    collapseVal.value = ['a']
  }

  const props = defineProps<{
    title: String
  }>()
  const { title } = toRefs(props)

  const notify = ref()
  const username = ref()

  const emits = defineEmits(['getImg'])

  const userInfo = userInfoStore()

  onMounted(() => {
    if(userInfo.userList.name) {
      username.value = userInfo.userList.name
      emits('getImg', userInfo.userList.paramValue)
    } else {
      commonInfo({}).then((res) => {
        if (res.data.code === 200) {
          userInfo.userList.name = res.data.data.name
          userInfo.userList.paramValue = res.data.data.paramValue

          username.value = res.data.data.name
          emits('getImg', res.data.data.paramValue)
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
    }
  })


</script>

<style lang="scss" scoped>
</style>
