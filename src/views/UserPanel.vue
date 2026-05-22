<template>
  <div class="user-panel-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>学生信用管理</span>
          <el-input
            v-model="searchQuery"
            placeholder="搜索昵称/学号"
            class="search-input"
            clearable
            @keyup.enter="handleSearch"
            @clear="handleSearch"
          >
            <template #append>
              <el-button icon="Search" @click="handleSearch" />
            </template>
          </el-input>
        </div>
      </template>
      
      <el-table :data="tableData" v-loading="loading" style="width: 100%" border stripe>
        <el-table-column prop="id" label="用户ID" width="80" />
        <el-table-column prop="studentId" label="绑定学号" width="150">
          <template #default="scope">
            {{ scope.row.studentId || '未绑定' }}
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="学生昵称" width="150" />
        <el-table-column prop="realName" label="姓名" width="100">
          <template #default="scope">
            {{ scope.row.realName || '未填写' }}
          </template>
        </el-table-column>
        <el-table-column prop="college" label="学院" width="150" show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.college || '未填写' }}
          </template>
        </el-table-column>
        <el-table-column prop="className" label="班级" width="120">
          <template #default="scope">
            {{ scope.row.className || '未填写' }}
          </template>
        </el-table-column>
        <el-table-column label="信用积分" width="150" align="center">
          <template #default="scope">
            <el-tag
              :type="scope.row.creditScore >= 60 ? 'success' : 'danger'"
              effect="dark"
            >
              {{ scope.row.creditScore }} 分
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="账号状态" width="100" align="center">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === 0 ? 'danger' : 'success'"
              effect="dark"
            >
              {{ scope.row.status === 0 ? '封禁中' : '正常' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="注册时间" width="175" />
        <el-table-column label="操作" width="280" fixed="right" align="center">
          <template #default="scope">
            <el-button type="info" size="small" @click="openRecordsDrawer(scope.row)">
              查看记录
            </el-button>
            <el-button type="primary" size="small" @click="openEditDialog(scope.row)">
              调分
            </el-button>
            <el-button
              :type="scope.row.status === 0 ? 'success' : 'danger'"
              size="small"
              @click="toggleStatus(scope.row)"
            >
              {{ scope.row.status === 0 ? '解封' : '封禁' }}
            </el-button>
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

    <!-- 调分弹窗 -->
    <el-dialog v-model="dialogVisible" title="调整信用分" width="30%">
      <el-form label-width="120px">
        <el-form-item label="学生昵称">
          <el-input v-model="currentUser.nickname" disabled />
        </el-form-item>
        <el-form-item label="最新积分">
          <el-input-number v-model="newScore" :min="0" :max="100" />
        </el-form-item>
        <div class="note-text">
          * 提示：当分数调整至 ≥60分 以上时，小程序的占座冻结限制将立即解除。
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitScoreChange" :loading="submitLoading">提交生效</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 信用记录抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      :title="`${drawerUser.nickname || '用户'} 的信用记录`"
      size="700px"
      direction="rtl"
    >
      <div v-loading="drawerLoading" class="drawer-body">

        <!-- 信用分摘要 -->
        <div class="credit-summary">
          <div class="summary-item">
            <span class="summary-label">当前信用分</span>
            <el-tag :type="drawerUser.creditScore >= 60 ? 'success' : 'danger'" effect="dark" size="large">
              {{ drawerUser.creditScore }} / 100 分
            </el-tag>
          </div>
          <div class="summary-item">
            <span class="summary-label">历史申诉</span>
            <span class="summary-val">{{ drawerAppeals.length }} 次</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">预约总计</span>
            <span class="summary-val">{{ drawerReservations.length }} 条</span>
          </div>
        </div>

        <!-- 预约流水 -->
        <div class="section-title">
          <el-icon><List /></el-icon> 预约流水（含扣分记录）
        </div>
        <el-table :data="drawerReservations" size="small" border max-height="320">
          <el-table-column prop="date" label="日期" width="100" />
          <el-table-column label="时间" width="120">
            <template #default="scope">
              {{ fmtTime(scope.row.startTime) }} ~ {{ fmtTime(scope.row.endTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="roomName" label="自习室" show-overflow-tooltip />
          <el-table-column prop="seatNumber" label="座位" width="70" align="center" />
          <el-table-column label="结果" width="150" align="center">
            <template #default="scope">
              <el-tag :type="statusTagType(scope.row.status)" size="small">
                {{ statusLabel(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>

        <!-- 申诉记录 -->
        <div class="section-title" style="margin-top: 24px;">
          <el-icon><WarningFilled /></el-icon> 申诉记录
        </div>
        <el-empty v-if="drawerAppeals.length === 0" description="暂无申诉记录" :image-size="60" />
        <div v-else class="appeal-list">
          <div
            v-for="appeal in drawerAppeals"
            :key="appeal.id"
            class="appeal-card"
            :class="'appeal-' + appeal.status"
          >
            <div class="appeal-header">
              <span class="appeal-time">{{ fmtDateTime(appeal.createdAt) }}</span>
              <el-tag :type="appealTagType(appeal.status)" size="small" effect="light">
                {{ appealLabel(appeal.status) }}
              </el-tag>
            </div>
            <div class="appeal-info">
              <span class="ai-label">关联订单：</span>
              <span>{{ appeal.roomName || '—' }} {{ appeal.seatNumber || '' }} · {{ appeal.date || '' }}</span>
            </div>
            <div class="appeal-info">
              <span class="ai-label">申诉理由：</span>
              <span class="ai-reason">{{ appeal.reason }}</span>
            </div>
            <div class="appeal-info" v-if="appeal.adminRemark">
              <span class="ai-label">管理员备注：</span>
              <span class="ai-remark">{{ appeal.adminRemark }}</span>
            </div>
          </div>
        </div>

        <!-- 打卡记录 -->
        <div class="section-title" style="margin-top: 24px;">
          <el-icon><Calendar /></el-icon> 每日打卡记录
        </div>
        <el-table :data="drawerCheckins" size="small" border max-height="250" style="margin-bottom: 24px;">
          <el-table-column prop="checkinDate" label="打卡日期" />
          <el-table-column label="打卡时间">
            <template #default="scope">
              {{ fmtDateTime(scope.row.createdAt) }}
            </template>
          </el-table-column>
          <el-table-column label="信用分变动" width="100" align="center">
            <template #default>
              <el-tag type="success" size="small">+1 分</el-tag>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { List, WarningFilled, Calendar } from '@element-plus/icons-vue'

const loading = ref(false)
const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const searchQuery = ref('')

const dialogVisible = ref(false)
const submitLoading = ref(false)
const currentUser = ref<any>({})
const newScore = ref(100)

// 抽屉相关
const drawerVisible = ref(false)
const drawerLoading = ref(false)
const drawerUser = ref<any>({})
const drawerReservations = ref<any[]>([])
const drawerAppeals = ref<any[]>([])
const drawerCheckins = ref<any[]>([])

const fetchData = async () => {
  loading.value = true
  try {
    const res: any = await request.get('/admin/users', {
      params: {
        current: currentPage.value,
        size: pageSize.value,
        keyword: searchQuery.value
      }
    })
    tableData.value = res.data.records
    total.value = res.data.total
  } catch (err) {
    ElMessage.error('拉取用户列表失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchData()
}
const handleSizeChange = (val: number) => { pageSize.value = val; fetchData() }
const handleCurrentChange = (val: number) => { currentPage.value = val; fetchData() }

const openEditDialog = (row: any) => {
  currentUser.value = row
  newScore.value = row.creditScore
  dialogVisible.value = true
}

const submitScoreChange = async () => {
  submitLoading.value = true
  try {
    await request.put(`/admin/users/${currentUser.value.id}/credit`, { score: newScore.value })
    ElMessage.success('信用分已更新')
    dialogVisible.value = false
    fetchData()
  } catch (err) {
    ElMessage.error('调控失败')
  } finally {
    submitLoading.value = false
  }
}

const toggleStatus = async (row: any) => {
  const newStatus = row.status === 0 ? 1 : 0
  const actionName = newStatus === 0 ? '封禁' : '解封'
  if (newStatus === 0) {
    try {
      await ElMessageBox.confirm(
        `确定要封禁学生 [${row.nickname || row.id}] 的账号吗？封禁期间该学生将直接失去所有座位预约权限并强制踢下线。`,
        '高危操作警告',
        { type: 'error', confirmButtonText: '确定封禁', cancelButtonText: '取消' }
      )
    } catch { return }
  }
  try {
    await request.put(`/admin/users/${row.id}/status`, { status: newStatus })
    ElMessage.success(`${actionName}成功`)
    fetchData()
  } catch (err) {
    ElMessage.error(`${actionName}失败，请重试`)
  }
}

// 打开记录抽屉
const openRecordsDrawer = async (row: any) => {
  drawerUser.value = row
  drawerReservations.value = []
  drawerAppeals.value = []
  drawerCheckins.value = []
  drawerVisible.value = true
  drawerLoading.value = true
  try {
    const res: any = await request.get(`/admin/reservations/users/${row.id}/credit-records`)
    drawerReservations.value = res.data.reservations || []
    drawerAppeals.value = res.data.appeals || []
    drawerCheckins.value = res.data.checkins || []
  } catch (err) {
    ElMessage.error('加载记录失败')
  } finally {
    drawerLoading.value = false
  }
}

// 工具函数
const fmtTime = (t: string) => t ? t.substring(0, 5) : ''
const fmtDateTime = (dt: string) => {
  if (!dt) return ''
  const d = new Date(dt)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

const STATUS_MAP: Record<number, [string, string]> = {
  0: ['待签到', 'info'],
  1: ['正常签到 +2分', 'success'],
  2: ['正常取消', ''],
  3: ['违约 -10分', 'danger'],
  4: ['早退 -3分', 'warning'],
  5: ['迟取消 -5分', 'warning'],
}
const statusLabel = (s: number) => STATUS_MAP[s]?.[0] ?? '未知'
const statusTagType = (s: number) => STATUS_MAP[s]?.[1] ?? ''

const APPEAL_MAP: Record<string, [string, string]> = {
  PENDING: ['审核中', 'warning'],
  APPROVED: ['已通过', 'success'],
  REJECTED: ['已驳回', 'danger'],
}
const appealLabel = (s: string) => APPEAL_MAP[s]?.[0] ?? s
const appealTagType = (s: string) => APPEAL_MAP[s]?.[1] ?? ''

onMounted(() => { fetchData() })
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-input { width: 280px; }
.pagination-block {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.note-text {
  font-size: 12px;
  color: #8a94a6;
  margin-top: 10px;
  margin-left: 120px;
}

/* 抽屉内容 */
.drawer-body { padding: 0 4px; }

.credit-summary {
  display: flex;
  gap: 32px;
  background: #f8f9fc;
  border-radius: 10px;
  padding: 16px 24px;
  margin-bottom: 20px;
  align-items: center;
}
.summary-item { display: flex; flex-direction: column; gap: 6px; align-items: center; }
.summary-label { font-size: 12px; color: #8a94a6; }
.summary-val { font-size: 20px; font-weight: 700; color: #1a1f36; }

.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1f36;
  margin-bottom: 12px;
}

.appeal-list { display: flex; flex-direction: column; gap: 12px; }
.appeal-card {
  border-radius: 10px;
  padding: 14px 18px;
  border: 1px solid #e8ecf0;
  background: #fff;
}
.appeal-APPROVED { border-left: 4px solid #67c23a; }
.appeal-REJECTED { border-left: 4px solid #f56c6c; }
.appeal-PENDING  { border-left: 4px solid #e6a23c; }

.appeal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.appeal-time { font-size: 12px; color: #8a94a6; }
.appeal-info { font-size: 13px; color: #4a5568; line-height: 1.8; }
.ai-label { color: #94a3b8; margin-right: 4px; }
.ai-reason { color: #334155; }
.ai-remark { color: #b45309; font-weight: 500; }

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
:deep(.el-table) { margin-top: 0; }
:deep(.el-table th) { background: #f8f9fc !important; color: #5a6272; font-weight: 600; font-size: 13px; }
:deep(.el-table td) { color: #1a1f36; }
:deep(.el-button--small) { border-radius: 6px; }
:deep(.el-drawer__header) { font-weight: 600; font-size: 15px; color: #1a1f36; margin-bottom: 0; padding: 18px 24px; border-bottom: 1px solid #f0f2f5; }
:deep(.el-drawer__body) { padding: 20px 24px; overflow-y: auto; }
</style>
