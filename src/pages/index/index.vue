<template>
  <view class="content">


    <!-- <text>Current Count: {{ counter.count }}</text> -->


    <!-- <text class="text-3xl font-bold underline">ruijing</text> -->


		<uv-form ref="formRef" :model="formInfo" :rules="rulesInfo">
      <uv-form-item label="姓名" prop="username">
				<uv-input v-model="formInfo.username" placeholder="请输入姓名" />
			</uv-form-item>
      <uv-form-item label="密码" prop="password">
				<uv-input v-model="formInfo.password" placeholder="请输入密码" />
			</uv-form-item>
		</uv-form>
		<uv-button type="primary" @click="loginBtn">登陆</uv-button>

  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
// import { useCounterStore } from '@/stores/counter';

// const counter = useCounterStore();
// counter.count++
// counter.$patch({ count: counter.count + 1 })
// counter.increment()

const formRef = ref()

const formInfo = reactive({
	username: '',
  password: ''
})

const rulesInfo = reactive({
  'username': [
    {
      required: true,
      message: '请输入姓名',
      trigger: ['blur', 'change']
    }
  ],
  'password': [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change']
    },
    {
      validator: () => { // rule, value, callback
        return true;
      },
      message: '电话号码格式错误',
      trigger: ['blur']
    }
  ]
})

const loginBtn = () => {
  formRef.value.validate().then(() => {
    console.log(11111, formInfo);
    uni.showToast({ icon: 'success', title: '校验通过'})
  }).catch(() => {
    uni.showToast({ icon: 'error', title: '校验失败'})
  })
}

</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
