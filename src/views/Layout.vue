<template>
  <el-container class="layout-container">
    <el-aside width="220px" class="aside">
      <div class="logo">黄淮学院自习室预约平台管理端</div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        router
      >
        <el-menu-item 
          v-for="route in adminRoutes" 
          :key="route.path" 
          :index="'/' + route.path"
        >
          <el-icon><component :is="route.meta?.icon" /></el-icon>
          <span>{{ route.meta?.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header class="header">
        <div class="header-left">当前大屏：{{ currentTitle }}</div>
        <div class="header-right">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              Admin (系统管理) <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出中枢</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 提取我们在路由中配的主业务
const adminRoutes = computed(() => {
  const root = router.options.routes.find(r => r.path === '/')
  return root?.children || []
})

const activeMenu = computed(() => route.path)
const currentTitle = computed(() => route.meta.title || '')

const handleCommand = (command: string) => {
  if (command === 'logout') {
    ElMessageBox.confirm('确定要退出自习室管理平台底座吗?', '防误触', {
      type: 'warning'
    }).then(() => {
      localStorage.removeItem('adminToken')
      router.push('/login')
    }).catch(() => {})
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.aside {
  background-color: #304156;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  z-index: 10;
}
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  background-color: #2b3643;
  letter-spacing: 2px;
}
.el-menu-vertical {
  border-right: none;
}
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 20px;
  z-index: 9;
}
.header-left {
  font-size: 16px;
  color: #606266;
  font-weight: 500;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  display: flex;
  align-items: center;
}
.main-content {
  background-color: #f0f2f5;
  padding: 20px;
}

/* 进出动效 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
