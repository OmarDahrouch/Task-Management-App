<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="flex justify-end p-4">
      <button
        @click="openAddModal"
        class="relative flex items-center justify-center w-10 h-10 bg-orange-600 text-white rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-white-500"
      >
        <i class="fas fa-plus text-2xl"></i>
        <span class="absolute left-full ml-2 opacity-0 transition-opacity duration-300 ease-in-out transform translate-x-1 hover:opacity-100 hover:translate-x-0">Add Task</span>
      </button>
    </div>
    <table class="min-w-full bg-white">
      <thead class="bg-orange-100">
        <tr>
          <th class="text-center px-6 py-3 border-b border-gray-300">Title</th>
          <th class="text-center px-6 py-3 border-b border-gray-300">Description</th>
          <th class="text-center px-6 py-3 border-b border-gray-300">Status</th>
          <th class="text-center px-6 py-3 border-b border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50 transition duration-200">
          <td class="text-center px-6 py-4 border-b border-gray-300">{{ item.title }}</td>
          <td class="text-center px-6 py-4 border-b border-gray-300">{{ item.description }}</td>
          <td class="text-center px-6 py-4 border-b border-gray-300">
            <span
              :class="[ 
                'inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full',
                item.status === 'To Do' ? 'bg-red-100 text-red-700' :
                item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                item.status === 'Done' ? 'bg-green-100 text-green-700' : ''
              ]"
            >
              <span
                :class="[ 
                  'w-2 h-2 mr-2 rounded-full',
                  item.status === 'To Do' ? 'bg-red-500' :
                  item.status === 'In Progress' ? 'bg-blue-500' :
                  item.status === 'Done' ? 'bg-green-500' : ''
                ]"
              ></span>
              {{ item.status }}
            </span>
          </td>
          <td class="item-center px-6 py-4 border-b border-gray-300">
            <div class="flex justify-center space-x-2">
              <button @click="openEditModal(item)" class="flex items-center text-black-500 hover:text-blue-700">
                <i class="fas fa-edit mr-1"></i>
              </button>
              <button @click="deleteTache(item.id)" class="flex items-center text-orange-500 hover:text-red-700">
                <i class="fas fa-trash mr-1"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <EditModal
      :visible="isModalVisible"
      :item="selectedItem"
      @update:visible="isModalVisible = $event"
      @save="saveEdit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { fetchTasks, patchTask, addTask, deleteTask } from '../services/taskService'
import EditModal from './EditModal.vue'

const items = ref([])
const isModalVisible = ref(false)
const selectedItem = ref({})

async function fetchTaches() {
  try {
    items.value = await fetchTasks()
  } catch (error) {
    console.error('Failed to load tasks:', error)
  }
}

function openAddModal() {
  selectedItem.value = { title: '', description: '', status: 'To Do' }
  isModalVisible.value = true
}

function openEditModal(item) {
  selectedItem.value = { ...item }
  isModalVisible.value = true
}

async function saveEdit(editedData) {
  try {
    if (editedData.id) {
      const updatedItem = await patchTask(editedData.id, editedData)
      const index = items.value.findIndex((i) => i.id === updatedItem.id)
      if (index !== -1) items.value[index] = updatedItem
    } else {
      const newItem = await addTask(editedData)
      items.value.push(newItem)
    }
    isModalVisible.value = false
  } catch (error) {
    console.error('Failed to save task:', error)
  }
}

async function deleteTache(id) {
  try {
    await deleteTask(id)
    items.value = items.value.filter(item => item.id !== id)
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

onMounted(() => {
  fetchTaches()
})
</script>

<style scoped>
</style>
