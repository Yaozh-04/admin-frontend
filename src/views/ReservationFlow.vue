<template>
  <div class="reservation-flow-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>全域订单流水查询</span>
          <el-select v-model="statusFilter" placeholder="过滤订单状态" clearable style="width: 200px" @change="handleFilter">
            <el-option label="待签到" :value="0" />
            <el-option label="已签到" :value="1" />
            <el-option label="已取消" :value="2" />
            <el-option label="违约" :value="3" />
            <el-option label="提前离开" :value="4" />
          </el-select>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
        <el-table-column prop="id" label="订单号" width="80" />
        <el-table-column label="预约学生" width="180">
          <template #default="scope">
            <div class="user-cell">
              <div class="user-name">{{ scope.row.nickname || '未知用户' }}</div>
              <div class="user-sub" v-if="scope.row.studentId">学号：{{ scope.row.studentId }}</div>
              <div class="user-sub" v-else>UID：{{ scope.row.userId }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="自习室 / 座位" width="200">
          <template #default="scope">
            <div>{{ scope.row.roomName || ('房间 #' + scope.row.roomId) }}</div>
            <div class="user-sub">座位：{{ scope.row.seatNumber || ('#' + scope.row.seatId) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="预约日期" width="120" />
        <el-table-column label="预约时段" width="160">
          <template #default="scope">
            <el-tag type="info" size="small">{{ scope.row.startTime }} - {{ scope.row.endTime }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="130">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 0" type="primary">待签到</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="success">已签到</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="info">已取消</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger" effect="dark">违约 (-10分)</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="warning">提前离开</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="签到时间" width="175">
          <template #default="scope">
            {{ scope.row.checkinAt ? scope.row.checkinAt.replace('T', ' ') : '—' }}
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const statusFilter = ref<number | undefined>(undefined)

const fetchData = async () => {
  loading.value = true
  try {
    const res: any = await request.get('/admin/reservations', {
      params: {
        current: currentPage.value,
        size: pageSize.value,
        status: statusFilter.value
      }
    })
    tableData.value = res.data.records
    total.value = res.data.total
  } catch (err) {
    ElMessage.error('获取监控流水失败')
  } finally {
    loading.value = false
  }
}

const handleFilter = () => {
  currentPage.value = 1
  fetchData()
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchData()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination-block {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.user-cell { line-height: 1.7; }
.user-name { font-weight: 500; color: #1a1f36; font-size: 14px; }
.user-sub  { font-size: 12px; color: #8a94a6; }

:deep(.el-card) {
  border-radius: 14px;
  border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
:deep(.el-card__header) {
  padding: 18px 24px;
  border-bottom: 1px solid #f0f2f5;
  font-size: 15px;
  font-weight: 600;
  color: #1a1f36;
}
:deep(.el-card__body) { padding: 0 24px 20px; }
:deep(.el-table th) { background: #f8f9fc !important; color: #5a6272; font-weight: 600; font-size: 13px; }
:deep(.el-table td) { color: #1a1f36; }
</style>

