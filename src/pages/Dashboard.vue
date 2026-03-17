<script setup lang="ts">

import NavSidebar from "../components/base_UI/NavSidebar.vue";
import Title from "../components/base_UI/Title.vue"
import Calendar from "../components/base_UI/dashboard/Calendar.vue";
import Category from "../components/base_UI/dashboard/Category.vue"
</script>

<template>
  <div class="dashboard">
      <Title />

      <div class="sidebar_positioner">
        <NavSidebar />

      <div class="calendar_container">
        <Calendar />
      </div>

        <div class="category_container">
        <Category />
      </div>
    </div>
  </div>
</template>

<style scoped>

:global(body) {
  margin: 0;
  padding: 0;
}

.dashboard {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


.sidebar_positioner{
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  top: 200px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.calendar_container{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 0;
}


</style>