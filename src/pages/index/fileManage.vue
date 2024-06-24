<template>
  <view class="file-manage mt-[200rpx]">
    <leftpop title="文章管理"></leftpop>
    <uv-notify ref="notify"></uv-notify>

    <view class="ml-[32rpx] flex items-center">
      <uv-button size="small" type="primary" :custom-style="{borderRadius:'80rpx', width:'120rpx'}" @click="newFile">新增</uv-button>
      <uv-search margin="0 0 0 32rpx" placeholder="请输入文章的类型" shape="round" :clearabled="true" @search="searchArticle" @custom="searchArticle" @clear="searchClearArticle"></uv-search>
    </view>

    <view class="mt-[32rpx]">
      <view class="file-list inline-flex items-center h-[90rpx] font-bold">
        <view class="inline-flex justify-center px-[12rpx] w-[140rpx]">#</view>
        <view class="file-artice inline-block">文件标题/文件类型</view>
        <view class="inline-flex justify-center w-[200rpx]">操作</view>
      </view>

      <view v-for="(item, index) in dataList" class="file-list inline-flex items-center py-[12rpx]" :key="index">
        <view class="inline-flex justify-center px-[12rpx] w-[140rpx]">{{ ((item.recommend)?'*':'')+ item.id }}</view>
        <view class="file-artice inline-block">
          <view class="text-[#3b4144] file-sub">{{ item.articleTitle }}</view>
          <view class="text-[#999999] text-xs file-sub">{{ item.articleType }}</view>
        </view>
        <view class="inline-flex text-[#3c9cff] w-[200rpx] text-sm">
          <view class="px-[12rpx]" @click="editArticleSub(item)">编辑</view>
          <view class="text-[#cccccc]">|</view>
          <view class="px-[12rpx]" @click="deleteArticleSub(item)">删除</view>
        </view>
      </view>

      <view v-if="dataList.length === 0" class="p-[32rpx] text-center no-data">
        <view>暂无数据</view>
      </view>

    </view>



    <!-- 新增/编辑 modal -->
    <uv-modal ref="newEditModal" :title="newEditModalTitle" :showCancelButton="true" :asyncClose="true" @confirm="newEditModalConfirm" @close="newEditModalClose">
      <view class="slot-content" style="width: 100%;">
        <uv-form ref="formRef" :model="formInfo" :rules="rulesInfo">

          <uv-form-item label="id" prop="id" v-if="false">
            <uv-input v-model="formInfo.id" placeholder="" customStyle="border-color: #333 !important" />
          </uv-form-item>

          <uv-form-item label="文章标题" prop="articleTitle">
            <uv-input v-model="formInfo.articleTitle" placeholder="请输入文件标题" customStyle="border-color: #333 !important" />
          </uv-form-item>

          <uv-form-item label="文件类型" prop="articleType">
            <uv-input v-model="formInfo.articleType" placeholder="请输入文件类型" customStyle="border-color: #333 !important" />
          </uv-form-item>

          <uv-form-item label="是否推荐" prop="recommend">
            <uv-switch v-model="formInfo.recommend"></uv-switch>
          </uv-form-item>


          <uv-form-item label="文件内容" prop="articleContent">
            <uv-textarea v-model="formInfo.articleContent" placeholder="请输入文件内容" count :maxlength="15000"></uv-textarea>
          </uv-form-item>
        </uv-form>
      </view>
    </uv-modal>


    <!-- 删除 modal -->
    <uv-modal ref="deleteModal" :title="'id为'+id+', 确定要删除此项吗？'" :showCancelButton="true" :asyncClose="true" @confirm="deleteModalConfirm"></uv-modal>

  </view>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import leftpop from '../../components/leftPop.vue'
  import { insertArticle, deleteArticle, updateArticle, queryArticle } from "@/api/fileManage";

  const notify = ref()

  const dataList = ref<dataList[]>([])
  interface dataList {
    id: number
    articleTitle: string
    articleType: string
    recommend: boolean
  }

  const formInfo = reactive({
    id: undefined,
    articleTitle: '',
    articleType: '',
    recommend: false,
    articleContent: ''
  })

  const rulesInfo = reactive({
    'articleTitle': [
      {
        required: true,
        message: '请输入文章标题',
        trigger: ['blur', 'change']
      },
      {
        max: 200,
        message: '长度限制在200以内'
      }
    ],
    'articleType': [
      {
        required: true,
        message: '请输入文章类型',
        trigger: ['blur', 'change']
      },
      {
        max: 100,
        message: '长度限制在100以内'
      }
    ],
    'articleContent': [
      {
        required: true,
        message: '请输入文章内容',
        trigger: ['blur', 'change']
      },
      {
        max: 15000,
        message: '长度限制在15000以内'
      }
    ]
  })

  const getList = (val:{}) => {
    queryArticle(val).then((res) => {
      if (res.data.code === 200) {
        dataList.value = res.data.data
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

  onMounted(() => {
    getList({})
  })

  // const dataList = ref([
  //   {
  //     id: 1,
  //     title: '有1哪些软件工具？',
  //     note: '软件工具',
  //     content: '11111aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
  //   },
  //   {
  //     id: 2,
  //     title: '有2哪些软件工具？有2哪些软件工具？有2哪些软件工具？',
  //     note: '软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具软件工具',
  //     content: '22222aahhieieueyuiojhfyguijhguiojhyguyiojkhguyiojhgyuyiojkbhvguijh'
  //   }
  // ])

  const newEditModal = ref()
  const deleteModal = ref()
  const id = ref()
  const newEditModalTitle = ref('新增')
  const formRef = ref()

  const newFile = () => {
    newEditModalTitle.value = '新增'
    newEditModal.value.open()
  }

  const newEditModalConfirm = () => {
    formRef.value.validate().then(() => {
      if(newEditModalTitle.value === '新增') {
        insertArticle(formInfo).then((res) => {
          if (res.data.code === 200) {
            getList({})
            newEditModal.value.close()
          } else {
            newEditModal.value.closeLoading()
            notify.value.show({
              type: 'error',
              message: res.data.msg,
              duration: 1000 * 3,
              safeAreaInsetTop: true
            })
          }
        }).finally(() => {
        });
      } else {
        updateArticle(formInfo).then((res) => {
          if (res.data.code === 200) {
            getList({})
            newEditModal.value.close()
          } else {
            newEditModal.value.closeLoading()
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
    }).catch(() => {
      newEditModal.value.closeLoading()
      // notify.value.error('校验失败');
    })
  }

  const newEditModalClose = () => {
    formInfo.id = undefined
    formInfo.articleTitle = ''
    formInfo.articleType = ''
    formInfo.recommend = false
    formInfo.articleContent = ''
  }

  const editArticleSub = (val:any) => {
    newEditModalTitle.value = val.id + ' 编辑'
    newEditModal.value.open()
    formInfo.id = val.id
    formInfo.articleTitle = val.articleTitle
    formInfo.articleType = val.articleType
    formInfo.recommend = val.recommend
    formInfo.articleContent = val.articleContent
  }

  const deleteArticleSub = (val:any) => {
    deleteModal.value.open()
    id.value = val.id
  }

  const deleteModalConfirm = () => {
    deleteArticle({id: id.value}).then((res) => {
      if (res.data.code === 200) {
        getList({})
        deleteModal.value.close()
      } else {
        deleteModal.value.closeLoading()
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

  const searchArticle = (val:string) => {
    if(val) {
      getList({articleType: val})
    } else {
      getList({})
    }
  }

  const searchClearArticle = () => {
    getList({})
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
    .no-data {
      border-top: 1px solid #999999;
    }
  }
</style>
