<template>
  <el-menu :default-active="activeKey" class="el-menu-vertical-demo" active-text-color="#fff" router unique-opened>
    <template v-for="route in routes">
      <el-sub-menu v-if="route.children?.length" :key="route.path" :index="route.path">
        <template #title>
          <el-icon><component :is="route.icon"></component></el-icon>
          <span>{{ route.name }}</span>
        </template>
        <el-menu-item v-for="child in route.children" :key="child.path" :index="child.path">{{ child.name }}</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :key="route.path" :index="route.path">
        <el-icon><component :is="route.icon"></component></el-icon>
        <template #title>{{ route.name }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { routes } from '../routes'
import { Document, Setting } from '@element-plus/icons-vue'
console.log('🏳️‍🌈 <输出> Document', Document)
const activeKey = ref(window.location.pathname)
</script>

<style lang="less" scoped>
.el-menu {
  margin-top: 20px;
  border-right: none;
  --el-menu-item-height: 48px;

  .el-sub-menu {
    margin: 5px 10px;
    border-radius: 5px;
  }

  .el-menu-item {
    margin: 5px 10px;
    border-radius: 5px;

    &.is-active {
      background-color: @c_primary;
    }
  }
}
</style>
