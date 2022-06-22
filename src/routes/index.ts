import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { Document, Folder,User,Setting,Grape } from '@element-plus/icons-vue'

const routes = [
  { path: '/', name: '文档',icon:Document, component: () => import('../view/wordList.vue') },
  { path: '/file', name: '文件', icon:Folder,component: () => import('../view/fileList.vue') },
  { path: '/user', name: '用户列表', icon:User,component: () => import('../view/user.vue') },
  { path: '/tailwind', name: 'tailwind', icon:Grape,component: () => import('../view/tailwind.vue') },
  {
    path: '/test',
    name: '测试多级菜单',
    redirect: '/page1',
    icon:Setting,
    component: () => import('../layout/page.vue'),
    children: [
      { path: '/page1', name: '菜单1', component: () => import('../view/page.vue') },
      { path: '/page2', name: '菜单2', component: () => import('../view/page.vue') },
      { path: '/page3', name: '菜单3', component: () => import('../view/page.vue') }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export { router, routes }
