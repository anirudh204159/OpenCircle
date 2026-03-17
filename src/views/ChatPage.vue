<script setup lang="ts">
import { ref, computed } from 'vue'
import NavSidebar from "../components/base_UI/NavSidebar.vue";

const friends = ref([
  { id: 1, name: 'Bella', avatar: '👤', lastMessage: 'Hi, how are you' },
  { id: 2, name: 'Alice', avatar: '👤', lastMessage: 'Hey, long time no see! How have you been lately?' },
  { id: 3, name: 'Charlie', avatar: '👤', lastMessage: 'Same here, super busy with my new job...' }
])

const activeFriendId = ref(1)

const messages = ref<{ id: number; friendId: number; text: string; isMe: boolean }[]>([
  { id: 1, friendId: 1, text: 'Hi, how are you', isMe: false },
  { id: 2, friendId: 2, text: 'Hey, long time no see! How have you been lately?', isMe: false },
  { id: 3, friendId: 2, text: 'Oh hi! I\'m pretty good, thanks. Just been swamped with work and a little side project I started. How about you?', isMe: true },
  { id: 4, friendId: 2, text: 'Same here, super busy with my new job, but it\'s really interesting. Did you do anything fun last weekend?', isMe: false },
  { id: 5, friendId: 2, text: 'I went hiking with a few friends in the mountain park nearby.', isMe: true }
])

const inputText = ref('')

const activeMessages = computed(() => {
  return messages.value.filter(m => m.friendId === activeFriendId.value)
})

const sendMessage = () => {
  if (!inputText.value.trim()) return
  messages.value.push({
    id: Date.now(),
    friendId: activeFriendId.value,
    text: inputText.value,
    isMe: true
  })
  inputText.value = ''
}

const addNewFriend = () => {
  const newFriendId = Date.now()
  const newFriend = {
    id: newFriendId,
    name: `New Friend ${friends.value.length + 1}`,
    avatar: '👤',
    lastMessage: 'New conversation started'
  }
  friends.value.push(newFriend)
  activeFriendId.value = newFriendId
}


</script>

<template>
  <div class="chat-page-container">
    <div class="sidebar_positioner">
      <NavSidebar />
    </div>

  <div class="friend-list">
      <button class="add-friend-btn" @click="addNewFriend">
        ➕ Add New Friend
      </button>

      <div
        v-for="friend in friends"
        :key="friend.id"
        class="friend-item"
        :class="{ active: friend.id === activeFriendId }"
        @click="activeFriendId = friend.id"
      >
        <span class="avatar">{{ friend.avatar }}</span>
        <div class="info">
          <div class="name">{{ friend.name }}</div>
          <div class="last-message">{{ friend.lastMessage }}</div>
        </div>
      </div>
    </div>

    <div class="chat-area">
        <div class="messages">
          <div
            v-for="msg in activeMessages"
            :key="msg.id"
            class="message"
            :class="{ me: msg.isMe, other: !msg.isMe }"
          >
            <span v-if="!msg.isMe" class="avatar">👤</span>
            <div class="bubble" :class="{ me: msg.isMe }">
              {{ msg.text }}
            </div>
            <span v-if="msg.isMe" class="avatar">👤</span>
          </div>
        </div>

        <div class="input-area">
            <input
              v-model="inputText"
              placeholder="Type a message..."
              @keyup.enter="sendMessage"
            />
            <button @click="sendMessage">Send</button>
          </div>
        </div>
  </div>
</template>

<style scoped>

.sidebar_positioner {

  margin-top: 60px;
}

.chat-page-container {
  display: flex;
  align-items: flex-start;
  height: 100vh;
  background: #e8e8e8;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 10px;
  gap: 12px
}
.add-friend-btn {
  width: 100%;
  padding: 10px 12px;
  background: #b0b0b0;
  color: white;
  border: none;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 14px;
  transition: background 0.2s;
}
.add-friend-btn:hover {
  background: #444;
}

.friend-list {
  width: 320px;
  background: #f5f5f5;
  border-radius: 20px;
  padding: 10px;
  overflow-y: auto;
  align-items: flex-start;
  height: 97vh;
  box-sizing: border-box;
}

.friend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  background: #f0f0f0;
}

.friend-item.active {
  background: #e8e8e8;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.info {
  flex: 1;
}

.name {
  font-weight: 400;
  font-size: 14px;
  color: #333;
  text-align: left;
}

.last-message {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
  text-align: left;
}

.chat-area {
  width: 600px;
  background: #f9f9f9;
  border-radius: 20px;
  height: calc(100vh - 20px);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.message {
  display: flex;
  gap: 8px;
  max-width: 70%;
  align-items: flex-start;
}

.message.other {
  align-self: flex-start;
  text-align: left;
}

.message.me {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.bubble {
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.4;
}

.bubble.other {
  background: #888888;
  color: #b0b0b0;
  border-bottom-left-radius: 4px;
}

.bubble.me {
  background: #88c098;
  color: white;
  border-bottom-right-radius: 4px;
}

.input-area {
  display: flex;
  gap: 8px;
  margin-top: 18px;
}

.input-area input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  outline: none;
}

.input-area button {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: #88c098;
  color: white;
  cursor: pointer;
}

</style>