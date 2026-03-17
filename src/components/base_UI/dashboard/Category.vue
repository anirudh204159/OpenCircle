<script setup lang="ts">
import { ref, computed} from 'vue'

const categories = ref([
  {
    id: 'biking',
    label: 'Biking',
    icon: '🚴',
    image: 'https://picsum.photos/id/1058/800/400'
  },
  {
    id: 'basketball',
    label: 'Basketball',
    icon: '🏀',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'party',
    label: 'Party',
    icon: '🎉',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'hiking',
    label: 'Hiking',
    icon: '🥾',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80'
  },

])

const activeIndex = ref(0)

const nextCategory = () => {
  activeIndex.value = (activeIndex.value + 1) % categories.value.length
}

const prevCategory = () => {
  activeIndex.value = (activeIndex.value - 1 + categories.value.length) % categories.value.length
}

const goToCategory = (index: number) => {
  activeIndex.value = index
}

const imageTransform = computed(() => {
  return `translateX(-${activeIndex.value * 100}%)`
})
</script>

<template>
  <div class="categories-container">
    <h2 class="title">Categories</h2>

    <div class="tabs-wrapper">
      <button class="arrow-btn left" @click="prevCategory">◀</button>

      <div class="tabs">
        <button
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="tab-item"
          :class="{ active: index === activeIndex }"
          @click="goToCategory(index)"
        >
          <span class="icon">{{ cat.icon }}</span>
          <span class="label">{{ cat.label }}</span>
        </button>
      </div>
      <button class="arrow-btn right" @click="nextCategory">▶</button>
    </div>

    <div class="images-container">
      <div class="images-track" :style="{ transform: imageTransform }">
        <div
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="image-card"
          :class="{ active: index === activeIndex }"
        >
          <img :src="cat.image" :alt="cat.label" />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.categories-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 16px;
  font-family: system-ui, -apple-system, sans-serif;
}

.title {
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #555555;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
  position: relative;
}

.tabs {
  display: flex;
  gap: 1.8rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0.5rem;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 300;
  color: #666;
  cursor: pointer;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-item.active {
  color: #222;
  font-weight: 500;
  border-bottom-color: #222;
}

.icon {
  font-size: 1.2rem;
}

.arrow-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #222;
  cursor: pointer;
  padding: 0.5rem;
}

.images-container {
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
}

.images-track {
  display: flex;
  transition: transform 0.4s ease;
}

.image-card {
  min-width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 16px;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>