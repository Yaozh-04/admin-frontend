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
        <el-table-column label="操作" width="220" fixed="right" align="center">
          <template #default="scope">
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

    <!-- 弹窗 -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'

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

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchData()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchData()
}

const openEditDialog = (row: any) => {
  currentUser.value = row
  newScore.value = row.creditScore
  dialogVisible.value = true
}

const submitScoreChange = async () => {
  submitLoading.value = true
  try {
    await request.put(`/admin/users/${currentUser.value.id}/credit`, {
      score: newScore.value
    })
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
      await ElMessageBox.confirm(`确定要封禁学生 [${row.nickname || row.id}] 的账号吗？封禁期间该学生将直接失去所有座位预约权限并强制踢下线。`, '高危操作警告', { 
        type: 'error', 
        confirmButtonText: '确定封禁', 
        cancelButtonText: '取消' 
      })
    } catch {
      return
    }
  }

  try {
    await request.put(`/admin/users/${row.id}/status`, { status: newStatus })
    ElMessage.success(`${actionName}成功`)
    fetchData()
  } catch (err) {
    ElMessage.error(`${actionName}失败，请重试`)
  }
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
.search-input { width: 280px; }
.pagination-block {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.user-cell { line-height: 1.7; }
.user-name { font-weight: 500; color: #1a1f36; font-size: 14px; }
.user-sub  { font-size: 12px; color: #8a94a6; }
.note-text {
  font-size: 12px;
  color: #8a94a6;
  margin-top: 10px;
  margin-left: 120px;
}
/* 卡片全局层级覆盖 */
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
</style>
