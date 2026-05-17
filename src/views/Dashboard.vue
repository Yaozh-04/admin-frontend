<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon users"><el-icon><User /></el-icon></div>
          <div class="stat-info">
            <div class="stat-title">总注册学生数</div>
            <div class="stat-value">{{ stats.totalUsers }}</div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon rooms"><el-icon><House /></el-icon></div>
          <div class="stat-info">
            <div class="stat-title">管控自习室总数</div>
            <div class="stat-value">{{ stats.totalRooms }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon res"><el-icon><Calendar /></el-icon></div>
          <div class="stat-info">
            <div class="stat-title">今日产生预约</div>
            <div class="stat-value">{{ stats.todayReservations }}</div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon breaches"><el-icon><Warning /></el-icon></div>
          <div class="stat-info">
            <div class="stat-title">今日巡检违约单</div>
            <div class="stat-value" :class="{'text-danger': stats.todayBreaches > 0}">{{ stats.todayBreaches }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Placeholder for Future Charts -->
    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>系统运行状态与公告栏</span>
            </div>
          </template>
          <el-empty description="当前运行正常，各项自动化任务（含防超卖、自动违约轮询）监控中..." />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

const stats = ref({
  totalUsers: 0,
  totalRooms: 0,
  todayReservations: 0,
  todayBreaches: 0
})

const loadStats = async () => {
  try {
    const res: any = await request.get('/admin/dashboard/stats')
    stats.value = res.data
  } catch (err) {
    ElMessage.error('读取大盘数据失败')
  }
}

onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.dashboard-container {
  padding: 10px;
}
.stat-card {
  display: flex;
  align-items: center;
  height: 108px;
}
:deep(.el-card__body) {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
}
.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
  margin-right: 20px;
}
.stat-icon.users { background: #40c9c6; }
.stat-icon.rooms { background: #36a3f7; }
.stat-icon.res { background: #34bfa3; }
.stat-icon.breaches { background: #f4516c; }

.stat-info {
  flex-grow: 1;
}
.stat-title {
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #666;
}
.text-danger {
  color: #f4516c;
}
</style>
