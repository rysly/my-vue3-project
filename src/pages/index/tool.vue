<template>
  <view class="tool">
    <leftpop title="软件工具"></leftpop>
    <uv-notify ref="notify"></uv-notify>


    软件工具
  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import leftpop from '../../components/leftPop.vue'
  import { queryArticle } from "@/api/fileManage";

  const notify = ref()

  onMounted(() => {
    queryArticle({articleType: '软件工具'}).then((res) => {
      if (res.data.code === 200) {
        console.log(111111, res.data)
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

</script>

<style lang="scss" scoped>
.tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
