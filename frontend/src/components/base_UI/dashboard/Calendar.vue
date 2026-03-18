<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const tasksByDate = ref<Record<string, { title: string; time: string; color: string }[]>>({})

const activeDate = ref(new Date().getDate())
const currentDate = ref(new Date())

const currentMonth = computed(() => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return monthNames[currentDate.value.getMonth()]
})

const weekDays = ['M', 'T', 'W', "Th", 'F', 'Sat', 'Sun']

const generateCalendarDates = () => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const lastDayOfMonth = new Date(year, month + 1, 0).getDate()

  const prefixBlanks = Array(firstDayIndex).fill(null)

  const monthDates = Array.from({length: lastDayOfMonth}, (_, i) => i + 1)

  const allDates = [...prefixBlanks, ...monthDates]
  const totalCells = Math.ceil(allDates.length / 7) * 7
  const suffixBlanks = Array(totalCells - allDates.length).fill(null)

  return [...allDates, ...suffixBlanks]
}

const calendarDates = ref<(number | null)[]>([])

onMounted(() => {
  calendarDates.value = generateCalendarDates()
})

const changeMonth = (direction: -1 | 1) => {
  currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + direction,
      1
  )

  calendarDates.value = generateCalendarDates()

  activeDate.value = 1

}

const taskInput = ref('')

// Add tasks
const addTask = () => {
  if (!taskInput.value.trim()) return
  const key = activeDate.value.toString()

  if (!tasksByDate.value[key]) {
    tasksByDate.value[key] = []
  }

  tasksByDate.value[key].push({
    title: taskInput.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    color: '#4A90E2'
  })

  taskInput.value = ''
}

// Delete tasks
const deleteTask = (index: number) => {
  const key = activeDate.value.toString()
  if (!tasksByDate.value[key]) return
  tasksByDate.value[key].splice(index, 1)
}

const currentTasks = computed(() => {
  return tasksByDate.value[activeDate.value.toString()] || []
})
</script>

<template>

  <div class="calendar-wrapper">
    <div class="calendar-card">
      <div class="calendar-header">
        <span class="calendar-month">{{ currentMonth }}</span>
        <div class="calendar-actions">
            <button class="action-btn" @click="changeMonth(-1)">⬅</button>
            <button class="action-btn" @click="changeMonth(1)">➡</button>
        </div>
      </div>


      <div class="calendar-dates">

        <span
          v-for="day in weekDays"
          :key="day"
          class="calendar-day-label"
        >
          {{ day }}
        </span>

        <span
          v-for="(date, idx) in calendarDates"
          :key="idx"
          class="calendar-day"
          :class="{ active: date === activeDate,
                        disabled: date === null
          }"
          @click="date && (activeDate = date)"
        >
          {{ date || ''}}
        </span>
      </div>
    </div>

    <div class="event-card">

      <div class="task-input-group">
          <input v-model="taskInput" placeholder="Enter task..." class="task-input" />
          <button @click="addTask" class="add-btn">ADD</button>
        </div>

      <div class="calendar-events">
          <div v-for="(task, idx) in currentTasks" :key="idx" class="calendar-event">
            <div class="event-left">
              <div class="event-time">{{ task.time }}</div>
              <div class="event-title">{{ task.title }}</div>
            </div>
            <button class="del-btn" @click="deleteTask(idx)">✕</button>
          </div>
        </div>
    </div>
  </div>


</template>

<style scoped>

.calendar-wrapper {
  display: block;
  background: transparent;
  box-shadow: none;
  padding: 0;
  margin: 0;
  border: none;
  width: auto;
}

.calendar-card {
  width: 400px;
  background-color: #888888;
  border-radius: 20px;
  padding: 20px;
  font-family: system-ui, -apple-system, sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.calendar-month {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}
.calendar-actions {
  display: flex;
  gap: 12px;
}
.action-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #ffffff;
}

.calendar-dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px 4px;
  text-align: center;
  margin-bottom: 16px;
}
.calendar-day-label {
  font-size: 12px;
  color: #e8e8e8;
  margin-bottom: 4px;
}
.calendar-day {
  font-size: 14px;
  padding: 8px 0;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s;
}
.calendar-day.active {
  background-color: #d0d0d0;
  font-weight: 600;
  border-radius: 50%;
  color: #222;
}
.calendar-day.disabled {
  pointer-events: none;
}
.calendar-day:hover:not(.active) {
  border-radius: 50%;
  background-color: #e8e8e8;
}

.event-card {
  width: 400px;
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.task-input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 14px;
}
.add-btn {
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: #b0b0b0;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
}
.calendar-events {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.calendar-event {
  background-color: #e2e2e2;
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.event-left {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.event-time {
  font-size: 11px;
  color: #666;
}
.event-title {
  font-size: 14px;
  font-weight: 500;
  color: #222;
}
.del-btn {
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #888;
}

</style>