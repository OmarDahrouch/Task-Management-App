import axios from 'axios'

const PORT = import.meta.env.VITE_BACKEND_PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

export async function fetchTasks() {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
}

export async function addTask(newData) {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, newData)
    return response.data
  } catch (error) {
    console.error('Failed to add task:', error)
    throw error
  }
}

export async function patchTask(id, updatedData) {
  try {
    const response = await axios.patch(`${BASE_URL}/tasks/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Failed to update task:', error)
    throw error
  }
}

export async function deleteTask(id) {
  try {
    await axios.delete(`${BASE_URL}/tasks/${id}`)
  } catch (error) {
    console.error('Failed to delete task:', error)
    throw error
  }
}