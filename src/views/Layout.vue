<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="240px" class="aside">
      <div class="logo-area">
        <div class="logo-icon">📚</div>
        <div class="logo-text">
          <div class="logo-title">自习室管理平台</div>
          <div class="logo-sub">黄淮学院</div>
        </div>
      </div>

      <el-menu
        :default-active="activeMenu"
        class="side-menu"
        background-color="transparent"
        text-color="rgba(255,255,255,0.65)"
        active-text-color="#ffffff"
        router
      >
        <el-menu-item
          v-for="route in adminRoutes"
          :key="route.path"
          :index="'/' + route.path"
          class="menu-item"
        >
          <el-icon><component :is="route.meta?.icon" /></el-icon>
          <span>{{ route.meta?.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部栏 -->
      <el-header class="header">
        <div class="header-left">
          <span class="breadcrumb-icon">◈</span>
          <span class="page-title">{{ currentTitle }}</span>
        </div>
        <div class="header-right">
          <div class="admin-info">
            <div class="admin-avatar">A</div>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="admin-name">
                管理员 <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">
                    <el-icon><SwitchButton /></el-icon> 退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <el-main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
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
import { ArrowDown, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()

const adminRoutes = computed(() => {
  const root = router.options.routes.find(r => r.path === '/')
  return root?.children || []
})

const activeMenu = computed(() => route.path)
const currentTitle = computed(() => route.meta.title || '')

const handleCommand = (command: string) => {
  if (command === 'logout') {
    ElMessageBox.confirm('确定要退出管理后台吗？', '提示', {
      type: 'warning',
      confirmButtonText: '退出',
      cancelButtonText: '取消'
    }).then(() => {
      localStorage.removeItem('adminToken')
      router.push('/login')
    }).catch(() => {})
  }
}
</script>

<style scoped>
.layout-container { height: 100vh; }

/* ===== 侧边栏 ===== */
.aside {
  background: linear-gradient(180deg, #1a2035 0%, #1e2d4a 60%, #1a2035 100%);
  box-shadow: 4px 0 20px rgba(0,0,0,0.15);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 8px;
}
.logo-icon { font-size: 26px; }
.logo-title { font-size: 15px; font-weight: 600; color: #fff; letter-spacing: 0.3px; }
.logo-sub { font-size: 11px; color: rgba(255,255,255,0.38); margin-top: 2px; }

.side-menu { border-right: none; padding: 0 12px; }

:deep(.menu-item) {
  border-radius: 10px !important;
  margin-bottom: 4px;
  height: 46px !important;
  line-height: 46px !important;
  transition: all 0.2s ease;
}
:deep(.menu-item:hover) {
  background: rgba(255,255,255,0.08) !important;
  color: #fff !important;
}
:deep(.menu-item.is-active) {
  background: linear-gradient(90deg, #4080ff, #6e9fff) !important;
  color: #fff !important;
  box-shadow: 0 4px 14px rgba(64,128,255,0.4);
}

/* ===== 顶部栏 ===== */
.header {
  height: 60px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 0 #eaecf0;
  padding: 0 28px;
}
.header-left { display: flex; align-items: center; gap: 10px; }
.breadcrumb-icon { color: #4080ff; font-size: 15px; }
.page-title { font-size: 15px; font-weight: 600; color: #1a1f36; }

.admin-info { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.admin-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4080ff, #6eb5ff);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.admin-name {
  font-size: 13px; color: #555;
  display: flex; align-items: center; gap: 4px;
}

/* ===== 主内容区 ===== */
.main-content {
  background: #f3f5f9;
  padding: 24px;
  overflow-y: auto;
}

/* ===== 切换动效 ===== */
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.18s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
