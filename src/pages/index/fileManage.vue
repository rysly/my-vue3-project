<template>
  <view class="file-manage mt-[200rpx]">
    <leftpop title="文章管理"></leftpop>
    <uv-notify ref="notify"></uv-notify>

    <view class="ml-[32rpx] flex items-center">
      <uv-button size="small" type="primary" :custom-style="{borderRadius:'80rpx', width:'120rpx'}" @click="newFile">新增</uv-button>
      <uv-search margin="0 0 0 32rpx" placeholder="请输入文章的类型" shape="round" :clearabled="true"></uv-search>
    </view>

    <view class="mt-[32rpx]">
      <view class="file-list inline-flex items-center h-[90rpx] bg-[#bed2db] font-bold">
        <view class="inline-flex justify-center px-[12rpx] w-[140rpx]">#</view>
        <view class="file-artice inline-block">文件标题/文件类型</view>
        <view class="inline-flex justify-center w-[200rpx]">操作</view>
      </view>

      <view v-for="item in dataList" class="file-list inline-flex items-center py-[12rpx]">
        <view class="inline-flex justify-center px-[12rpx] w-[140rpx]">{{ item.id }}</view>
        <view class="file-artice inline-block">
          <view class="text-[#3b4144] file-sub">{{ item.title }}</view>
          <view class="text-[#999999] text-xs file-sub">{{ item.note }}</view>
        </view>
        <view class="inline-flex text-[#3c9cff] w-[200rpx] text-sm">
          <view class="px-[12rpx]">编辑</view>
          <view class="text-[#cccccc]">|</view>
          <view class="px-[12rpx]">删除</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import leftpop from '../../components/leftPop.vue'
  import { insertArticle, deleteArticle, updateArticle, queryArticle } from "@/api/fileManage";

  const notify = ref()

  onMounted(() => {
    queryArticle({}).then((res) => {
      if (res.data.code === 200) {
        console.log(111111, res.data)
      } else {
        notify.value.error(res.data.msg);
      }
    }).finally(() => {
    });
  })


  // const dataList = ref<dataList[]>([])
  // interface dataList {
  //   id: number
  //   title: string
  //   note: string
  // }

  const dataList = ref([
    {
      id: 1,
      title: '有1哪些软件工具？',
      note: '软件工具',
      content: '11111aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    },
    {
      id: 2,
      title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
      note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
      content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
    }
  ])

  const newFile = () => {
    console.log(1111)
  }


</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
  .file-manage {
    .file-list {
      width: 100%;
      border-top: 1px solid #999999;
      .file-artice {
        width: calc( 100% - 340rpx );
        .file-sub {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .file-list:last-child {
      border-bottom: 1px solid #999999;
    }
  }
</style>
