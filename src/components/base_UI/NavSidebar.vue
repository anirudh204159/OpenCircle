<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
interface Nav{
    key: string;
    label: string;
}

const navList = ref<Nav[]>([
  {key:'home', label:'Home'},
  {key: 'user', label:'User'},
  {key: 'chat', label:'Chat'},
  {key: 'add', label:'Add'},
  {key: 'auth', label:'Login'},
])

const activeKey = ref('home')

const isLogin = ref(false)
const handleClick = (key: string) => {
  activeKey.value = key
  console.log('Currently selected navigation feature:', key)

  if (key == 'user'){
    router.push('/profile')
  }
  else if (key == 'chat') {
    router.push('/chat')
  }
  else if (key == 'home'){
    router.push('/')
  }
  else if (key === 'auth') {
    if (isLogin.value) {
      isLogin.value = false
      console.log('Logout success')
      router.push('/login')
    } else {
      isLogin.value = true
      console.log('Go to Login')
      router.push('/login')
    }
  }
}
</script>

<template>
  <div class="nav-sidebar">
    <div class ='nav-list'>
      <div
        class="nav-item"
        v-for="item in navList"
        :key="item.key"
        :class="{active: activeKey === item.key}"
        @click="handleClick(item.key)"
        >
        <div class="nav-icon">
          <!-- HOME -->
          <svg v-if="item.key === 'home'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>

          <!-- USER -->
          <svg v-else-if="item.key === 'user'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>

           <!-- CHAT -->
          <svg v-else-if="item.key === 'chat'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4-6.95 8.38 8.38 0 0 1 3.8-.9h1a8.38 8.38 0 0 1 3.8.9 8.5 8.5 0 0 1 4 6.95z"></path>
          </svg>

          <!-- ADD -->
          <svg v-else-if="item.key === 'add'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M19 8v6"></path>
            <path d="M22 11h-6"></path>
          </svg>

          <!-- LOGIN / LOGOUT SVG -->
          <svg v-else-if="item.key === 'auth'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          </div>

        <div class="nav-label">
          {{ item.key === 'auth' ? (isLogin ? 'Logout' : 'Login') : item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-sidebar {
  width: 80px;
  height: 500px;
  border-radius: 35px;
  background-color: #F3F3F3;
  padding: 20px 0;
  font-size: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
}
.nav-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #505050;
  transition: all 0.2s ease;
  padding: 5px 0;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
.nav-item.active{
  color: #000;
  background-color: #b0b0b0;
}
.nav-item:hover {
  color: #000;
}
.nav-icon {
  font-size: 24px;
}
</style>