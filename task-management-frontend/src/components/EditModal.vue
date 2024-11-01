<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">{{ isEditMode ? 'Edit Task' : 'Add Task' }}</h2>
        <form @submit.prevent="handleOk">
          <div class="mb-4">
            <label class="block text-gray-700">Title</label>
            <input
              type="text"
              v-model="formData.title"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter title"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Description</label>
            <input
              type="text"
              v-model="formData.description"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter description"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Status</label>
            <select
              v-model="formData.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button @click="handleCancel" type="button" class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-blue-600">
              {{ isEditMode ? 'Save' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  const props = defineProps({
    visible: Boolean,
    item: Object
  })  
  
  const emit = defineEmits(['update:visible', 'save'])
  const formData = ref({ ...props.item })

  const isEditMode = computed(() => !!props.item.id)
  
  watch(
    () => props.item,
    (newItem) => {
      formData.value = { ...newItem }
    },
    { immediate: true }
  )
  
  function handleOk() {
    emit('save', formData.value)
    emit('update:visible', false)
  }
  
  function handleCancel() {
    emit('update:visible', false)
  }
  </script>
  
  <style scoped>
  </style>
  