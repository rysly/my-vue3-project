<template>
  <view class="content">




    <!-- <text>Current Count: {{ counter.count }}</text> -->




    <text class="text-3xl font-bold underline">ruijing</text>


    

    <uv-icon name="photo" size="30" color="#909399"></uv-icon>
    <uv-icon name="woman"></uv-icon>
		<uv-form :model="formUv" :rules="rules1" ref="formRef">
			<uv-form-item label="电话" prop="mobile">
				<uv-input v-model="formUv.mobile" placeholder="请输入电话" />
			</uv-form-item>
		</uv-form>
		<uv-button @click="submit">提交</uv-button>



  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
// import { useCounterStore } from '@/stores/counter';

// const counter = useCounterStore();
// counter.count++
// counter.$patch({ count: counter.count + 1 })
// counter.increment()

const formRef = ref()

const formUv = reactive({
	mobile: '',
})

const rules1 = reactive({
  'mobile': [
    {
      required: true,
      message: '此为必填字段',
      trigger: ['blur', 'change']
    },
    {
      validator: (rule, value, callback) => {
        return true;
      },
      message: '电话号码格式错误',
      trigger: ['blur']
    }]
})

const submit = () => {
  formRef.value.validate().then(() => {
    uni.showToast({
      icon: 'success',
      title: '校验通过'
    })
  }).catch(() => {
    uni.showToast({
      icon: 'error',
      title: '校验失败'
    })
  })
}

</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
</style>
