<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import { reactive } from 'vue'

import Title from '../components/base_UI/Title.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const userProfile = reactive({
  avatar: '../assets/avatar.png',
  name: 'Alex Lu',
  email: 'alexLu@gmail.com',
  bio: 'Frontend developer',

  stats: {
    followers: 68,
    following: 35
  },

  socialLinks: {
    github: 'https://github.com/alexlu',
    linkedin: 'https://linkedin.com/on/alexlu'
  }
})

const goToHome = () => {
  router.push('/')
}

const logout = () => {
  alert('Log Out')
  router.push('/login')
}

const handleAvatarError =(e: Event) => {
  const target = e.target as HTMLImageElement | null
  if (target) {
    target.src = "https://via.placeholder.com/100"
  }
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-header">
       <Title />
    </div>

    <div class="header-btns">
      <button class="back-btn" @click="goToHome"><-- Back to Home Page</button>
       <button class="logout-btn" @click="logout">Log Out</button>
    </div>

    <div class="profile-card">
    <div class="avatar-section">
      <img
        :src="userProfile.avatar"
        alt="user photo"
        class="avatar"
        @error="handleAvatarError"
        />
      <h2 class="username">{{ userProfile.name }}</h2>
      <p class="user-email">{{ userProfile.email}}</p>
    </div>

    <div class="bio-section">
      <h3 class="section-title">About me</h3>
      <p class="bio-text">{{ userProfile.bio }}</p>
    </div>

    <div class="stats-section">
      <div class="stat-item">
        <span class="stat-value">{{ userProfile.stats.followers }}</span>
        <span class="stat-label">fans</span>
      </div>
       <div class="stat-item">
        <span class="stat-value">{{ userProfile.stats.following }}</span>
        <span class="stat-label">follow</span>
      </div>
    </div>

    <div class="social-section">
      <h3 class="section-title">social link</h3>
      <div class="social-links">
        <a :href="userProfile.socialLinks.github" target="_blank" class="social-link">GitHub</a>
        <a :href="userProfile.socialLinks.linkedin" target="_blank" class="social-link">LinkedIn</a>
    </div>
  </div>

    <button class="edit-btn">Edit info</button>
    </div>
  </div>
</template>

<style scoped>

.profile-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5px;
  box-sizing: border-box;
}

.profile-header {
  width: 100%;
  max-width: 520px;
  text-align: center;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
}

.header-btns {
  width: 100%;
  max-width: 520px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 0;
}

.back-btn,.logout-btn {
  padding: 8px 16px;
  background: rgba(50,70,80,0.7);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.logout-btn{
  background: rgba(255, 90, 90, 0.7);
}

.profile-card{
  width: 100%;
  max-width: 520px;
  background-color: rgba(230, 230, 230, 0.85);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 24px;
  padding: 48px 40px;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 30px;

}

.avatar-section {
  text-align: center;
  margin-bottom: 28px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(100, 100, 100, 0.3);
  margin-bottom: 12px;
}

.username {
  font-size: 22px;
  color: #333;
  font-weight: 600;
  margin: 0 0 6px 0;
}

.user-email {
  font-size: 14px;
  color: #555;
  margin: 0;
}

.section-title {
  color: #333;
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 12px 0;
  text-align: left;
}

.bio-section {
  margin-bottom: 24px;
}

.bio-text {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.stats-section {
 display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-value {
  color: #222;
  font-size: 22px;
  font-weight: 600;
  display: block;
}

.stat-value {
  color: #666;
  font-size: 13px;
}

.stat-label {
  color: #333;
  font-size: 12px;
}

.social-section {
  margin-bottom: 28px;
}

.social-links {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.stat-label {
  color: #b0b0b0;
  font-size: 12px;
}

.social-section {
  margin-bottom: 28px;
}

.social-links {
  padding: 8px 16px;
  background: rgba(200, 200, 200, 0.5);
 color: #333;
  border-radius: 8px;
  font-size: 12px;
  flex: 1;
  text-align: center;
}

.edit-btn {
  width: 50%;
  padding: 8px;
  background: #999;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
</style>