<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import Title from '../components/base_UI/Title.vue'

const router = useRouter()
  const goToLogin = () => {
    router.push('/login')
  }

const form = reactive ({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: ''
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

const validateConfirmPassword = () => {
  if(!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match'
  } else{
    errors.confirmPassword = ''
  }
}
const handleRegister = () => {
  validateEmail()
  validatePassword()
  validateConfirmPassword()
  if(!errors.email && !errors.password && !errors.confirmPassword) {
    console.log('Success', form)
  } else{
    console.log('Wrong')
  }
}

</script>

<template>
  <div class="register-page">
    <div class="register-title">
        <Title />
    </div>

    <div class="register-card">
        <h2 class="card-title">Get Started Now</h2>

        <form class="register-form" @submit.prevent="handleRegister">
      <div class="form-item">
        <label>Name</label>
        <input v-model="form.username" type="text" placeholder="Enter your name" />
      </div>

      <div class="form-item">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="Enter your email" />
      </div>

      <div class="form-item">
        <label>Password</label>
        <input v-model="form.password" type="password" placeholder="Enter your password" />
      </div>

      <div class="form-item">
        <label>ConfirmPassword</label>
        <input v-model="form.confirmPassword" type="password" placeholder="Confirm your password" />
      </div>

      <button type="submit" class="register-btn">Register</button>
      </form>

      <div class = 'form-link'>
        Have an account?
        <span @click="goToLogin" class="link-text">Sign in</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.register-page{
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

.register-title{
  color: #fff;
  top: 40px;
  }

.register-title :deep(h1){
  color: #fff;
}

.register-card{
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

.register-form{
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

.register-btn{
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

.form-link {
  font-size: 12px;
  color: #e0e0e0;
  text-align: center;
  margin-top: 16px;
}

.link-text {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;
}

</style>