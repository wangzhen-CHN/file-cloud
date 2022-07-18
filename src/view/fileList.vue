<template>
  <el-form :model="form" class="demo-form-inline">
    <el-form-item label="">
      <el-upload class="upload-demo w-full" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="text-zinc-400">拖拽文件到此处或点击上传</div>
        <template #tip> </template>
      </el-upload>
    </el-form-item>
  </el-form>
  <div v-if="fileList && fileList.length">
    <div class="text-left text-18 ml-16 font-bold">
      <span class="text-gray-400 path-item" v-for="path in pathList" @click="onClickPath(path.path)">/{{ path.name }}</span>
    </div>
    <div class="flex justify-between m-16 pb-16 px-8 border-b">
      <el-checkbox v-model="checkAll" :indeterminate="checkedList.length > 0 && !checkAll" @change="handleCheckAllChange">
        <span class="text-gray-400 text-14">共{{ fileList.length }}项</span>
        <span class="text-gray-400 text-12 ml-8" style="color: #2b6bff">已选择{{ checkedList.length }}项</span>
      </el-checkbox>
      <div class="text-gray-400">
        <el-button type="primary" :icon="Download" text bg />
        <el-button type="danger" :icon="Delete" text bg />
      </div>
    </div>

    <el-checkbox-group v-model="checkedList" @change="onCheckChange">
      <el-row>
        <el-col :span="4" class="file-item" v-for="file in fileList" :key="file.name" @click="onCheckFile(file)">
          <div class="item-checkbox">
            <el-checkbox :label="file" v-if="file.type === 'file'"> &nbsp;</el-checkbox>
          </div>
          <el-icon :size="50" color="#2b6bff">
            <Document v-if="file.type === 'file'" />
            <FolderOpened v-if="file.type === 'directory'" />
          </el-icon>
          <div class="truncate font-medium w-100 text-14 mt-14">{{ file.name }}</div>
          <div class="text-14 text-stone-400 mt-4 text-12">{{ dayjs(file.createDate).format('YYYY-MM-DD HH:mm:ss') }}</div>
          <div class="text-14 text-stone-400 mt-4 text-12">{{ file.size }}kb</div>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
  <div v-else class="mt-40 text-center text-stone-500">暂无数据</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import dayjs from 'dayjs'
import { Delete, DocumentCopy, UploadFilled, FolderOpened, Document, Download } from '@element-plus/icons-vue'
import http from '../util/http'

const form = ref({
  content: ''
})
const pathList = ref([{ name: '主目录', path: '/' }])
const checkedList = ref([])
// const checkAll = ref(false)
const fileList = ref([])
const onSubmit = async () => {
  const { success, msg, data } = await http.get('/word/add', form.value)
  success && getList()
  ElMessage.success('添加成功')
}
const checkAll = computed(() => checkedList.value.length > 0 && checkedList.value.length === fileList.value.length)

const getList = async (path) => {
  const res = await http.get('/file/query', { path })
  fileList.value = res.data
}

const onDelete = async (id) => {
  const { success } = await http.get('/word/delete', { id })
  success && ElMessage.success('删除成功')
  success && getList()
}

const handleCheckAllChange = async (value) => {
  checkedList.value = value ? fileList.value.map((list) => list.id) : []
}
const onCheckFile = (file) => {
  if (file.type === 'directory') {
    const _pathList = pathList.value
    const last = _pathList.length ? _pathList[_pathList.length - 1].path : ''
    const current = last + '/' + file.name
    pathList.value.push({ name: file.name, path: current })
    getList(current)
  }
}
const onClickPath = (path) => {
  getList(path)
  const index = pathList.value.findIndex((list) => list.path == path)
  pathList.value = pathList.value.slice(0, index + 1)
}

onMounted(() => {
  getList()
})
</script>
<style>
.el-checkbox-group {
  font-size: 14px;
  line-height: inherit;
}

.el-upload {
  display: block;
}

.el-upload-dragger {
  width: 100%;
  background-color: #f4f4f460;
  box-shadow: inset 1px 1px 5px 0px #a4a4a450;
}

.file-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 20px;
  padding: 20px;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.item-operate {
  /* position: absolute;
  bottom: 10px; */
  color: #2b6bff;
  font-size: 13px;
}

.item-checkbox {
  width: 100%;
  height: 15px;
  text-align: left;
}

.item-checkbox .el-checkbox {
  height: auto !important;
}

.file-item:hover {
  background-color: #f4f4f460;
  box-shadow: 1px 3px 3px #eee;
}

.operate-btn {
  visibility: hidden;
}

.file-item:hover .operate-btn {
  visibility: visible;
}

/* .item-checkbox.is-checked {
  display: block;
} */

.file-item:has(+ label) {
  background-color: #f4f4f460;
}

.path-item {
  cursor: pointer;
}

.path-item:hover {
  color: #2b6bff;
}

.path-item:last-child {
  color: #222;
}
</style>
