<template>
  <div class="reservation-flow-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>全域订单流水纠查 (系统底座溯源)</span>
          <el-select v-model="statusFilter" placeholder="过滤订单状态" clearable style="width: 200px" @change="handleFilter">
            <el-option label="待签到 (活跃)" :value="0" />
            <el-option label="已正常签到 (活跃)" :value="1" />
            <el-option label="主动取消 (终止)" :value="2" />
            <el-option label="恶意违约漏签 (终止)" :value="3" />
            <el-option label="合规提前离开 (终止)" :value="4" />
          </el-select>
        </div>
      </template>

      <el-table :data="tableData" v-loading="loading" style="width: 100%" border>
        <el-table-column prop="id" label="订单哈希码" width="100" />
        <el-table-column label="系统归属" width="180">
          <template #default="scope">
            UID: {{ scope.row.userId }} <br/> [追查对象]
          </template>
        </el-table-column>
        <el-table-column label="资源锚点" width="180">
          <template #default="scope">
            房ID: {{ scope.row.roomId }} | 座ID: {{ scope.row.seatId }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="考勤公历" width="120" />
        <el-table-column label="占用时段锁定" width="180">
          <template #default="scope">
            <el-tag type="info" size="small">{{ scope.row.startTime }} - {{ scope.row.endTime }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最终裁定状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 0" type="primary">待签到待决</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="success">准时履约 (履约记录)</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="info">自然取消</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger" effect="dark">严重违约 (扣除10分)</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="warning">提前释放离场</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="物理签到快照" width="180">
          <template #default="scope">
            {{ scope.row.checkinAt ? scope.row.checkinAt.replace('T', ' ') : '-- 未触发 --' }}
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
</style>
