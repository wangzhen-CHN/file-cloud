<template>
  <el-form :model="form" class="demo-form-inline">
    <el-form-item label="">
      <el-input v-model="form.content" :rows="4" type="textarea" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button type="default" @click="getList">刷新</el-button>
    </el-form-item>
  </el-form>

  <el-row class="border-solid border-t text-left">
    <el-col class="flex justify-between items-center border-solid border-b py-20" v-for="list in wordList" :key="list._id">
      <div class="truncate w-1/3 font-medium">
        {{ list.content }}
      </div>
      <div class="text-14 text-stone-500">{{ list.createDate }}</div>
      <div class="flex">
        <el-button class="font-semibold" type="primary" text :icon="DocumentCopy">复制</el-button>
        <el-button class="font-semibold" type="danger" text :icon="Delete">删除</el-button>
      </div>
    </el-col>
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
  const { success, msg, data } = await http.get('/word/add', { ...form.value })
  success && getList()
}

const getList = async () => {
  const res = await http.get('/word/query')
  console.log('🏳️‍🌈 <输出> res', res)
  wordList.value = res.data
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
