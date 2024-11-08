<template>
  <!-- Filter And Add Button Layer -->
  <div class="flex justify-between mb-4 bg-white shadow-lg p-4 rounded-lg border border-gray-200">
    <!-- Filter Part -->
    <div class="flex items-center">
      <label for="statusFilter" class="mr-4 font-semibold text-gray-800">Filter by Status:</label>
      <select
        id="statusFilter"
        v-model="statusFilter"
        @change="applyStatusFilter"
        class="px-4 py-2 text-gray-800 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 ease-in-out hover:shadow-lg hover:bg-white"
      >
        <option v-for="option in statusOptions" :value="option.value" :class="option.class" :key="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <!-- Add Button Part -->
    <button
      title="Add Task"
      @click="openAddModal"
      class="relative flex items-center justify-center bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-500"
      :class="{ 'w-32': isHovered, 'w-10 h-10': !isHovered }"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <i class="fas fa-plus text-2xl transition-all duration-300 ease-in-out"></i>
      <span v-if="isHovered" class="ml-3 whitespace-nowrap transition-opacity duration-300 ease-in-out">
        Add Task
      </span>
    </button>
  </div>
  <!-- List Of Tasks Part -->
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
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
        <tr v-for="(item, index) in filteredItems" :key="index" class="hover:bg-gray-50 transition duration-200">
          <td class="text-center px-6 py-4 border-b border-gray-300">{{ item.title }}</td>
          <td class="text-center px-6 py-4 border-b border-gray-300">{{ item.description }}</td>
          <td class="text-center px-6 py-4 border-b border-gray-300">
            <span
              :class="[ 
                'inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full',
                item.status === 'to_do' ? 'bg-red-100 text-red-700' :
                item.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                item.status === 'done' ? 'bg-green-100 text-green-700' : ''
              ]"
            >
              <span
                :class="[ 
                  'w-2 h-2 mr-2 rounded-full',
                  item.status === 'to_do' ? 'bg-red-500' :
                  item.status === 'in_progress' ? 'bg-blue-500' :
                  item.status === 'done' ? 'bg-green-500' : ''
                ]"
              ></span>
              {{ statusText[item.status] }}
            </span>
          </td>
          <td class="text-center px-6 py-4 border-b border-gray-300">
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
    <!-- Modal Of Adding & Editing Part -->
    <EditModal
      :visible="isModalVisible"
      :item="selectedItem"
      @update:visible="isModalVisible = $event"
      @save="saveEdit"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchTasks, patchTask, addTask, deleteTask } from '../services/taskService'
import EditModal from './EditModal.vue'

const items = ref([])
const statusFilter = ref('')
const isModalVisible = ref(false)
const selectedItem = ref({})
const isHovered = ref(false)

// For Converting Status To Text 
const statusText = {
  to_do: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

// Status Options For Filtering
const statusOptions = [
  { label: 'All', value: '' },
  { label: 'To Do', value: 'to_do', class: 'bg-red-100 text-red-700 font-semibold' },
  { label: 'In Progress', value: 'in_progress', class: 'bg-blue-100 text-blue-700 font-semibold' },
  { label: 'Done', value: 'done', class: 'bg-green-100 text-green-700 font-semibold' }
];

async function fetchTaches() {
  try {
    items.value = await fetchTasks()
  } catch (error) {
    console.error('Failed to load tasks:', error)
  }
}

// Conditionally Add or Edit Task
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

function openAddModal() {
  selectedItem.value = { title: '', description: '', status: 'to_do' }
  isModalVisible.value = true
}

function openEditModal(item) {
  selectedItem.value = { ...item }
  isModalVisible.value = true
}

async function deleteTache(id) {
  try {
    await deleteTask(id)
    items.value = items.value.filter(item => item.id !== id)
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

// Apply Filter By Status
const filteredItems = computed(() => {
  return statusFilter.value
    ? items.value.filter(item => item.status === statusFilter.value)
    : items.value
})

onMounted(() => {
  fetchTaches()
})
</script>

<style scoped>
</style>
