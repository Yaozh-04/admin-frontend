<template>
  <div class="login-container">
    <el-card class="login-box">
      <h2 class="title">自习室中枢控制系统</h2>
      <el-form :model="form" :rules="rules" ref="loginForm" @keyup.enter="handleLogin">
        <el-form-item prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="超级管理员账号" 
            prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="安全密码" 
            prefix-icon="Lock" 
            show-password />
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading">进入控制大厅</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const router = useRouter()
const loginForm = ref()
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请提供管理员身份', trigger: 'blur' }],
  password: [{ required: true, message: '必须输入密钥', trigger: 'blur' }]
}

const handleLogin = () => {
  loginForm.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        const res: any = await request.post('/admin/auth/login', form)
        localStorage.setItem('adminToken', res.data.token)
        ElMessage.success('验证通过，正在载入环境...')
        router.push('/')
      } catch (err: any) {
        // request.ts 已有错误提示
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1f4037 0%, #99f2c8 100%);
}
.login-box {
  width: 400px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
}
.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-weight: 600;
  letter-spacing: 2px;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
