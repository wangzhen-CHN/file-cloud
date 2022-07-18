<template>
  <el-form :model="form" class="demo-form-inline">
    <el-form-item label="">
      <el-input v-model="form.content" :rows="4" type="textarea" id="contentTextarea" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button type="default" @click="getList">刷新</el-button>
    </el-form-item>
  </el-form>

  <el-row class="border-solid border-t border-zinc-100 text-left">
    <el-col
      class="flex justify-between items-center border-solid border-b border-zinc-100 p-20 hover:bg-gray-50 rounded-xl"
      v-for="list in wordList"
      :key="list._id"
    >
      <div class="truncate w-1/3 font-medium">
        {{ list.content }}
      </div>
      <div class="text-14 text-stone-500">{{ list.createDate }}</div>
      <div class="flex">
        <el-button class="font-semibold" type="primary" text :icon="DocumentCopy" @click="onCopy(list.content)">复制</el-button>
        <el-button class="font-semibold" type="danger" text :icon="Delete" @click="onDelete(list._id)">删除</el-button>
      </div>
    </el-col>
    <el-col class="mt-40 text-center text-stone-500" v-if="!wordList.length"> 暂无数据 </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Delete, DocumentCopy } from '@element-plus/icons-vue'
import http from '../util/http'

const form = ref({
  content: ''
})
const wordList = ref([])
const onSubmit = async () => {
  const { success, msg, data } = await http.get('/word/add', form.value)
  success && getList()
  ElMessage.success('添加成功')
}

const getList = async () => {
  const res = await http.get('/word/query')
  wordList.value = res.data
}
const onCopy = (value) => {
  // 创建输入框
  var textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  // 隐藏此输入框
  textarea.style.position = 'absolute'
  textarea.style.clip = 'rect(0 0 0 0)'
  // 赋值
  textarea.value = value
  // 选中
  textarea.select()
  // 复制
  document.execCommand('copy', true)
  ElMessage.success('内容已复制')
}
const onDelete = async (id) => {
  const { success } = await http.get('/word/delete', { id })
  success && ElMessage.success('删除成功')
  success && getList()
}

onMounted(() => {
  getList()
})
</script>
<style>
.el-input__suffix-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
}

.user-title {
  margin-bottom: 10px;
  padding-left: 30px;
  color: #fff;
  text-align: left;
}
</style>
