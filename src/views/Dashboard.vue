<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="stat-grid">
      <div class="stat-card" v-for="card in statCards" :key="card.key">
        <div class="stat-icon-wrap" :style="{ background: card.gradient }">
          <el-icon :size="22"><component :is="card.icon" /></el-icon>
        </div>
        <div class="stat-body">
          <div class="stat-label">{{ card.label }}</div>
          <div class="stat-value" :class="{ 'value-danger': card.key === 'breach' && stats.todayBreaches > 0 }">
            {{ statValue(card.key) }}
          </div>
        </div>
        <div class="stat-decor" :style="{ background: card.gradient }"></div>
      </div>
    </div>

    <!-- 系统状态 -->
    <div class="status-card">
      <div class="status-header">
        <div class="status-dot"></div>
        <span class="status-title">系统运行状态</span>
        <el-tag type="success" size="small" effect="light" style="margin-left: auto">运行正常</el-tag>
      </div>
      <div class="status-items">
        <div class="status-item" v-for="item in statusItems" :key="item.text">
          <el-icon class="status-icon"><component :is="item.icon" /></el-icon>
          <span class="status-text">{{ item.text }}</span>
        </div>
      </div>
    </div>

    <!-- 数据图表区域 (纯CSS实现) -->
    <div class="chart-grid">
      <!-- 扇形图：今日预约状态 -->
      <div class="chart-card">
        <div class="chart-title">今日预约状态占比</div>
        <div class="chart-body pie-chart-body">
          <div class="pie-chart" :style="{ background: pieGradient }"></div>
          <div class="pie-legend">
            <div class="legend-item" v-for="(item, index) in stats.statusDistribution" :key="item.name">
              <span class="legend-dot" :style="{ background: pieColors[index] }"></span>
              <span class="legend-name">{{ item.name }}</span>
              <span class="legend-val">{{ item.value }}</span>
            </div>
            <div class="empty-hint" v-if="!hasPieData">暂无预约数据</div>
          </div>
        </div>
      </div>

      <!-- 条形图：自习室容量分布 -->
      <div class="chart-card">
        <div class="chart-title">自习室容量分布 (TOP 3)</div>
        <div class="chart-body bar-chart-body">
          <div class="bar-item" v-for="item in stats.buildingDistribution" :key="item.name">
            <div class="bar-info">
              <span class="bar-name">{{ item.name }}</span>
              <span class="bar-val">{{ item.value }} 座</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: (item.value / maxBuildingValue * 100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

const stats = ref({ 
  totalUsers: 0, totalRooms: 0, todayReservations: 0, todayBreaches: 0,
  statusDistribution: [] as any[],
  buildingDistribution: [] as any[]
})

const statCards = [
  { key: 'users',       label: '注册学生',   icon: 'User',     gradient: 'linear-gradient(135deg,#4080ff,#6eb5ff)' },
  { key: 'rooms',       label: '自习室总数',  icon: 'House',    gradient: 'linear-gradient(135deg,#36b87f,#5de0a5)' },
  { key: 'today',       label: '今日预约',   icon: 'Calendar', gradient: 'linear-gradient(135deg,#f5a623,#f7c76b)' },
  { key: 'breach',      label: '今日违约',   icon: 'Warning',  gradient: 'linear-gradient(135deg,#f45b5b,#ff8f8f)' },
]

const statValue = (key: string) => {
  const map: Record<string, number> = {
    users: stats.value.totalUsers,
    rooms: stats.value.totalRooms,
    today: stats.value.todayReservations,
    breach: stats.value.todayBreaches,
  }
  return map[key] ?? 0
}

const statusItems = [
  { icon: 'CircleCheck', text: '座位防超卖机制（数据库行级锁）运行正常' },
  { icon: 'CircleCheck', text: '自动违约巡检定时任务（每分钟）运行正常' },
  { icon: 'CircleCheck', text: '信用分惩罚策略自动执行中' },
  { icon: 'CircleCheck', text: '协同过滤推荐算法服务就绪' },
]

const loadStats = async () => {
  try {
    const res: any = await request.get('/admin/dashboard/stats')
    stats.value = res.data
  } catch {
    ElMessage.error('读取数据失败')
  }
}

// ===== 图表计算逻辑 =====
const pieColors = ['#f5a623', '#36b87f', '#a0aabf', '#f45b5b'] // 待签到黄, 已完成绿, 已取消灰, 已违约红

const hasPieData = computed(() => {
  const dist = stats.value.statusDistribution || []
  return dist.reduce((sum, item) => sum + item.value, 0) > 0
})

const pieGradient = computed(() => {
  const dist = stats.value.statusDistribution || []
  const total = dist.reduce((sum, item) => sum + item.value, 0)
  
  if (total === 0) return 'conic-gradient(#f0f2f5 0% 100%)' // 无数据显示灰色圆

  let currentAngle = 0
  let gradientStr = ''
  
  dist.forEach((item, index) => {
    if (item.value > 0) {
      const percentage = (item.value / total) * 100
      gradientStr += `${pieColors[index]} ${currentAngle}% ${currentAngle + percentage}%, `
      currentAngle += percentage
    }
  })
  return `conic-gradient(${gradientStr.slice(0, -2)})`
})

const maxBuildingValue = computed(() => {
   const dist = stats.value.buildingDistribution || []
   if (dist.length === 0) return 1
   return Math.max(...dist.map(i => i.value))
})

onMounted(loadStats)
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 20px; }

/* ===== 统计卡片 ===== */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: #fff;
  border-radius: 14px;
  padding: 22px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

.stat-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.stat-body { flex: 1; z-index: 1; }
.stat-label { font-size: 13px; color: #8a94a6; margin-bottom: 6px; }
.stat-value { font-size: 28px; font-weight: 700; color: #1a1f36; }
.value-danger { color: #f45b5b; }

/* 装饰背景圆 */
.stat-decor {
  position: absolute;
  right: -18px; top: -18px;
  width: 80px; height: 80px;
  border-radius: 50%;
  opacity: 0.07;
}

/* ===== 系统状态卡片 ===== */
.status-card {
  background: #fff;
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.status-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.status-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #36b87f;
  box-shadow: 0 0 0 3px rgba(54,184,127,0.2);
}
.status-title { font-size: 15px; font-weight: 600; color: #1a1f36; }

.status-items { display: flex; flex-direction: column; gap: 12px; }
.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #5a6272;
}
.status-icon { color: #36b87f; font-size: 16px; flex-shrink: 0; }

/* ===== 图表卡片 ===== */
.chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 4px;
}
.chart-card {
  background: #fff;
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.chart-title {
  font-size: 15px; font-weight: 600; color: #1a1f36;
  margin-bottom: 24px;
}
.chart-body { min-height: 180px; }

/* 扇形图样式 */
.pie-chart-body {
  display: flex;
  align-items: center;
  gap: 40px;
}
.pie-chart {
  width: 140px; height: 140px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.3s ease;
  box-shadow: inset 0 0 0 20px #fff; /* 将饼图变成环形图 */
}
.pie-legend { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; }
.legend-name { color: #5a6272; flex: 1; }
.legend-val { font-weight: 600; color: #1a1f36; }
.empty-hint { font-size: 13px; color: #999; margin-top: 10px; }

/* 条形图样式 */
.bar-chart-body { display: flex; flex-direction: column; gap: 20px; justify-content: center; }
.bar-item { display: flex; flex-direction: column; gap: 8px; }
.bar-info { display: flex; justify-content: space-between; font-size: 13px; }
.bar-name { color: #5a6272; }
.bar-val { font-weight: 600; color: #1a1f36; }
.bar-track {
  height: 8px; background: #f0f2f5; border-radius: 4px; overflow: hidden;
}
.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4080ff, #6eb5ff);
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>
