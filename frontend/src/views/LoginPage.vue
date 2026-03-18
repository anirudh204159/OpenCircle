<script setup lang="ts">
import { reactive } from 'vue'

import Title from '../components/base_UI/Title.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive ({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const validateEmail = ( ) => {
  const re = /^[^\s@]+@[^\s@]+\/[^\s@]+$/
  if(!form.email){
    errors.email = 'Email is required'
  }else if(!re.test(form.email)){
    errors.email = "Invalid email format"
  }else{
    errors.email = ''
  }
}

const validatePassword = () => {
  const pw = form.password
  if(!pw){
    errors.password = 'Password is required'
  } else if (pw.length < 8){
    errors.password = 'At least 8 characters'
  } else if (!/[A-Z]/.test(pw)){
    errors.password = 'Need at least one uppercase letter'
  } else if (!/[a-z]/.test(pw)) {
    errors.password = 'Need at least one lowercase letter'
  } else if (!/[0-9]/.test(pw)) {
    errors.password = 'Need at least one number'
  } else if (!/[^A-Za-z0-9]/.test(pw)) {
     errors.password = 'Need at least one special character'
  } else {
    errors.password = ''
  }
}

const handleLogin = () => {
  validateEmail()
  validatePassword()
  if(!errors.email && !errors.password) {
    console.log('Success', form)
    router.push('/homepage')
  }
}

const goToRegister = () => {
  router.push('/register')
}

</script>

<template>
  <div class="login-page">
    <div class="login-title">
        <Title />
    </div>

    <div class="login-card">
        <h2 class="card-title">Log In</h2>

        <form class="login-form" @submit.prevent="handleLogin">

        <div class="form-item">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="Enter your email" />
        </div>

        <div class="form-item">
          <label>Password</label>
          <input v-model="form.password" type="password" placeholder="Enter your password" />
        </div>

        <button type="submit" class="login-btn">Login</button>
        </form>

      <div class="form-link">
          Don't have an account?
          <span @click="goToRegister" class="link-text">Sign up</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.login-page{
  width: 100vw;
  height: 100vh;
  background-image:url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.login-title{
  color: #fff;
  top: 40px;
  }

.login-title :deep(h1){
  color: #fff;
}

.login-card{
  width: 100%;
  max-width: 340px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 32px 28px;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  margin-top: 60px;
}

.card-title{
  font-size: 19px;
  color: #fff;
  margin-bottom: 22px;
  font-weight: 500;
  text-align: left;
}

.login-form{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item{
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-item label{
  font-size: 13px;
  color: #e0e0e0;
  font-weight: 500;
  text-align: left;
}

.form-item input{
  padding: 10px 14px;
  border: none;
  border-radius: 24px;
  background-color: #ffffff;
  color: #505050;
  font-size: 10px;
  outline: none;
}

.form-item input::placeholder{
  color: #b0b0b0;
}

.login-btn{
  padding: 11px;
  background-color: #4A5C6C;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 6px;
}

.form-link{
  font-size: 12px;
  color: #e0e0e0;
  text-align: center;
  margin-top: 16px;
}

.link-text{
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;
}

</style>