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
  <div class="flex justify-between mt-40">
    <el-checkbox v-model="checkeAll" :indeterminate="checkeList.length > 0 && !checkeAll">
      <span class="text-gray-400 text-14">共{{ fileList.length }}项</span>
      <span class="text-gray-400 text-12 ml-10" style="color: #2b6bff" v-if="checkeList.length > 0">已选择{{ checkeList.length }}项</span>
    </el-checkbox>
    <div class="text-gray-400">
      <el-icon :size="18" class="mx-10 cursor-pointer">
        <Download />
      </el-icon>
      <el-icon :size="16" class="mx-10 cursor-pointer">
        <Delete />
      </el-icon>
    </div>
  </div>
  <el-row>
    <el-col :span="4" class="file-item" v-for="list in fileList" :key="list._id">
      <el-icon :size="50" color="#2b6bff">
        <Folder />
      </el-icon>
      <div class="truncate font-medium w-100 text-14 mt-14">logo.png</div>
      <div class="text-14 text-stone-400 mt-4 text-12">{{ list.createDate }}</div>
      <div class="item-operate">下载</div>
      <el-checkbox class="item-checkbox" @change="(val) => onCheckChange(val, list._id)" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { Delete, DocumentCopy, UploadFilled, Folder, Download } from '@element-plus/icons-vue'
import http from '../util/http'

const form = ref({
  content: ''
})
const checkeList = ref([])
// const checkeAll = ref(false)
const fileList = ref([])
const onSubmit = async () => {
  const { success, msg, data } = await http.get('/word/add', form.value)
  success && getList()
  ElMessage.success('添加成功')
}
const checkeAll = computed(() => checkeList.value.length > 0 && checkeList.value.length === fileList.value.length)

const getList = async () => {
  const res = await http.get('/word/query')
  fileList.value = res.data
}
const onCheckChange = (value, id) => {
  const sub = checkeList.value.findIndex((list) => list == id)
  if (value) {
    sub === -1 && checkeList.value.push(id)
  } else {
    sub > -1 && checkeList.value.splice(sub, 1)
  }
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
.el-upload {
  display: block;
}

.el-upload-dragger {
  width: 100%;
  background-color: #f4f4f460;
  border: none;
  box-shadow: 1px 3px 3px #eee;
}

.file-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 20px;
  padding: 40px 20px;
  padding-top: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.item-operate {
  position: absolute;
  bottom: 10px;
  display: none;
  color: #2b6bff;
  font-size: 13px;
}

.item-checkbox {
  position: absolute;
  top: 20px;
  left: 20px;
  display: none;
}

.file-item:hover {
  background-color: #f4f4f460;
  box-shadow: 1px 3px 3px #eee;
}

.file-item:hover .item-operate,
.file-item:hover .item-checkbox {
  display: block;
}

.item-checkbox.is-checked {
  display: block;
}

.file-item:has(+ label) {
  background-color: #f4f4f460;
}
</style>
