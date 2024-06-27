<template>
  <view class="me mt-[182rpx] mx-[80rpx]">
    <leftpop title="个人用户"></leftpop>
    <uv-notify ref="notify"></uv-notify>

    <uv-form ref="formRef" :model="formInfo" :rules="rulesInfo" :labelWidth="60">
      <uv-form-item label="用户名" prop="name">
        <uv-input v-model="username" :disabled="true" placeholder="请输入姓名" customStyle="border-color: #333 !important" />
      </uv-form-item>
      <uv-form-item label="原密码" prop="oldPassword">
        <uv-input :password="true" v-model="formInfo.oldPassword" placeholder="请输入原密码" customStyle="border-color: #333 !important" />
      </uv-form-item>
      <uv-form-item label="新密码" prop="newPassword">
        <uv-input :password="true" v-model="formInfo.newPassword" placeholder="请输入新密码" customStyle="border-color: #333 !important" />
      </uv-form-item>
    </uv-form>
    <view class="mt-[32rpx]">
      <uv-button type="primary" :custom-style="{borderRadius: '80rpx'}" @click="updatePassword">修改密码</uv-button>
    </view>

  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import leftpop from '../../components/leftPop.vue'
import { userUpdatePassword } from "@/api/login"
import { userInfoStore } from '@/stores/user'


const notify = ref()
const username = ref()
const userInfo = userInfoStore()
username.value = userInfo.userList.name

const formRef = ref()

const formInfo = reactive({
  oldPassword: '',
  newPassword: ''
})

const rulesInfo = reactive({
  'oldPassword': [
    {
      required: true,
      message: '请输入原密码',
      trigger: ['blur', 'change']
    },
    {
			min: 6,
			max: 20,
			message: '长度在6-20个字符之间'
		}
  ],
  'newPassword': [
    {
      required: true,
      message: '请输入新密码',
      trigger: ['blur', 'change']
    },
    {
			min: 6,
			max: 20,
			message: '长度在6-20个字符之间'
		},
    {
      validator: (rule:any, value:any, callback:any) => {
        if(value === formInfo.oldPassword) {
          return false;
        } else {
          return true;
        }
      },
      message: '两次输入密码一样',
      trigger: ['blur']
    }
  ]
})

const updatePassword = () => {
  formRef.value.validate().then(() => {
    userUpdatePassword(formInfo).then((res) => {
      if (res.data.code === 200) {
        notify.value.show({
          type: 'success',
          message: '修改成功，请重新登录',
          duration: 1000 * 3,
          safeAreaInsetTop: true
        })
        setTimeout(() => {
          uni.redirectTo({ url: '/pages/login/login' });
        }, 3000);
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

  }).catch(() => {
    // notify.value.error('校验失败');
  })
}
</script>

<style lang="scss" scoped>
</style>
