<template>
  <view class="content">
    <uv-notify ref="notify"></uv-notify>

    <view>
      <view class="text-2xl font-bold pb-[32rpx] text-center">知识库小程序</view>
      <uv-form ref="formRef" :model="formInfo" :rules="rulesInfo">
        <uv-form-item label="" prop="name">
          <uv-input v-model="formInfo.name" placeholder="请输入姓名" customStyle="border-color: #333 !important" />
        </uv-form-item>
        <uv-form-item label="" prop="password">
          <uv-input v-model="formInfo.password" placeholder="请输入密码" customStyle="border-color: #333 !important" />
        </uv-form-item>
        <uv-form-item label="" prop="repassword" v-if="isRegister">
          <uv-input v-model="formInfo.repassword" placeholder="请再次输入密码" customStyle="border-color: #333 !important" />
        </uv-form-item>
      </uv-form>
      <view class="mt-[32rpx]">
        <uv-button type="primary" :custom-style="{borderRadius: '80rpx'}" @click="loginBtn">{{ isRegister?'注册':'登陆' }}</uv-button>
      </view>
      <view class="mt-[24rpx] float-right text-[#3c9cff] text-[28rpx]" @click="loginChangeRegister">
        {{ isRegister?'登陆账号':'注册新账号' }}
      </view>
    </view>

    <!-- <text>Current Count: {{ counter.count }}</text> -->
    <!-- <uv-button type="primary" @click="linkOther">外链</uv-button> -->
    <!-- <web-view v-if="isShowWebView" :src="linkVal"></web-view> -->
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { onReady } from '@dcloudio/uni-app'
import { userLogin, userRegister } from "@/api/login";
// import { useCounterStore } from '@/stores/counter';

// const counter = useCounterStore();
// counter.count++
// counter.$patch({ count: counter.count + 1 })
// counter.increment()

const formRef = ref()

const formInfo = reactive({
	name: '',
  password: '',
  repassword: undefined
})

const rulesInfo = reactive({
  'name': [
    {
      required: true,
      message: '请输入姓名',
      trigger: ['blur', 'change']
    },
    {
			pattern: /^[a-zA-Z]{5,9}$/,
			transform(value:any) {
				return String(value);
			},
			message: '只能包含5-9位字母'
		}
  ],
  'password': [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change']
    },
    {
			min: 6,
			max: 20,
			message: '长度在6-20个字符之间'
		}
  ],
  'repassword': [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['blur', 'change']
    },
    {
			min: 6,
			max: 20,
			message: '长度在6-20个字符之间'
		},
    {
      validator: (rule:any, value:any, callback:any) => {
        if(value === formInfo.password) {
          return true;
        } else {
          return false;
        }
      },
      message: '两次输入密码不一致',
      trigger: ['blur']
    }
  ]
})

const notify = ref()

const loginBtn = () => {
  uni.redirectTo({ url: '/pages/index/ai' });
  // formRef.value.validate().then(() => {
  //   if(!isRegister.value) {
  //     userLogin(formInfo).then((res) => {
  //       if (res.data.code === 200) {
  //         uni.redirectTo({ url: '/pages/index/ai' });
  //       } else {
  //         notify.value.error(res.data.msg);
  //       }
  //     }).finally(() => {
  //     });
  //   } else {
  //     userRegister(formInfo).then((res) => {
  //       if (res.data.code === 200) {
  //         uni.redirectTo({ url: '/pages/index/ai' });
  //       } else {
  //         notify.value.error(res.data.msg);
  //       }
  //     }).finally(() => {
  //     });
  //   }
  // }).catch(() => {
  //   // notify.value.error('校验失败');
  // })
}

const isRegister = ref(false)
const loginChangeRegister = () => {
  isRegister.value = !isRegister.value
  formInfo.repassword = undefined
}

// const isShowWebView = ref(false)
// const linkVal = ref("")
// const linkOther = () => {
//   isShowWebView.value = true
//   linkVal.value = "https://www.baidu.com/"
// }




</script>

<style lang="scss">
  .uv-form-item__body__right__message {
    margin-left: 0 !important;
  }
</style>

<style lang="scss" scoped>
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
  // margin-top: 0;
  // margin-bottom: 0;
}
.uv-button button {
  border-radius: 80rpx;
}
</style>
