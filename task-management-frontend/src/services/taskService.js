import axios from 'axios'

const BASE_URL = 'http://localhost:3000';

export async function fetchTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addTask(newData) {
  try {
    const response = await axios.post('http://localhost:3000/tasks', newData)
    return response.data
  } catch (error) {
    console.error('Failed to add task:', error)
    throw error
  }
}

export async function patchTask(id, updatedData) {
  try {
    const response = await axios.patch(`http://localhost:3000/tasks/${id}`, updatedData)
    return response.data
  } catch (error) {
    console.error('Failed to update task:', error)
    throw error
  }
}

export async function deleteTask(id) {
  try {
    await axios.delete(`http://localhost:3000/tasks/${id}`)
  } catch (error) {
    console.error('Failed to delete task:', error)
    throw error
  }
}