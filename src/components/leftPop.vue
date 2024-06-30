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
        <view v-if="aiOpen" class="px-[40rpx] py-[32rpx] text-[#303133]" @click="toJump('ai')">舞美知识库</view>
        <view v-else class="px-[40rpx] py-[32rpx] text-[#303133]">舞美知识库</view>

        <view class="px-[40rpx] py-[32rpx] text-[#303133]" v-if="role === 2" @click="toJump('fileManage')">文章管理</view>
        <uv-collapse :value="collapseVal">
          <uv-collapse-item title="文章与教程" name="a">
            <view class="px-[40rpx] py-[32rpx]" @click="toJump('newArticle')">最新文章</view>
            <view class="px-[40rpx] py-[32rpx]" @click="toJump('recommendedArticle')">推荐文章</view>
          </uv-collapse-item>
        </uv-collapse>
        <view class="px-[40rpx] py-[32rpx] text-[#303133]" @click="toJump('tool')">软件工具</view>
        <view class="px-[32rpx] py-[16rpx] absolute bottom-[108rpx] text-[#303133]" @click="toJump('me')">个人用户: {{ username }}</view>
        <view class="px-[32rpx] py-[16rpx] absolute bottom-[32rpx] text-[#303133]" @click="logOut">退出登陆</view>
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
  const role = ref() // 1是普通，2是管理员
  const aiOpen = ref(false) // true，false

  const emits = defineEmits(['getImg'])

  const userInfo = userInfoStore()

  const logOut = () => {
    userInfo.userList.token = ''
    userInfo.userList.name = ''
    userInfo.userList.role = 1
    userInfo.userList.aiOpen = false
    userInfo.userList.paramValue = ''
    uni.redirectTo({ url: '/pages/login/login' });
  }

  onMounted(() => {
    if(userInfo.userList.name) {
      username.value = userInfo.userList.name
      role.value = userInfo.userList.role
      aiOpen.value = userInfo.userList.aiOpen
      emits('getImg', userInfo.userList.paramValue)
    } else {
      commonInfo({}).then((res) => {
        if (res.data.code === 200) {
          userInfo.userList.name = res.data.data.name
          userInfo.userList.paramValue = res.data.data.paramValue
          userInfo.userList.role = res.data.data.role
          userInfo.userList.aiOpen = res.data.data.aiOpen

          username.value = res.data.data.name
          role.value = res.data.data.role
          aiOpen.value = res.data.data.aiOpen
          emits('getImg', res.data.data.paramValue)
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
    }
  })


</script>

<style lang="scss">
</style>
