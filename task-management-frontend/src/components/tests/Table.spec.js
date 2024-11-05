import { mount, flushPromises } from '@vue/test-utils'
import Table from '../Table.vue'
import EditModal from '@/components/EditModal.vue'
import { fetchTasks, deleteTask } from '@/services/taskService'

jest.mock('@/services/taskService', () => ({
  fetchTasks: jest.fn(),
  deleteTask: jest.fn(),
}))

describe('Table.vue', () => {
  let wrapper

  beforeEach(async () => {
    fetchTasks.mockResolvedValue([
      { id: 1, title: 'Test Task 1', description: 'Description 1', status: 'to_do' },
      { id: 2, title: 'Test Task 2', description: 'Description 2', status: 'done' }
    ])
    wrapper = mount(Table)
    await flushPromises()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders task table with correct data', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2)
    expect(rows[0].text()).toContain('Test Task 1')
    expect(rows[1].text()).toContain('Test Task 2')
  })

  test('filters tasks by status', async () => {
    await wrapper.find('#statusFilter').setValue('done')
    await flushPromises()

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(rows[0].text()).toContain('Test Task 2')
  })

  test('opens add task modal when "Add Task" button is clicked', async () => {
    await wrapper.find('button[title="Add Task"]').trigger('click')
    expect(wrapper.findComponent(EditModal).exists()).toBe(true)
    expect(wrapper.vm.isModalVisible).toBe(true)
  })

  test('opens edit modal with correct task data', async () => {
    await wrapper.findAll('.fa-edit').at(0).trigger('click')
    expect(wrapper.findComponent(EditModal).exists()).toBe(true)
    expect(wrapper.vm.selectedItem.title).toBe('Test Task 1')
  })

  test('deletes task correctly', async () => {
    deleteTask.mockResolvedValueOnce()
    await wrapper.findAll('.fa-trash').at(0).trigger('click')
    await flushPromises()

    expect(deleteTask).toHaveBeenCalledWith(1)
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(1)
    expect(rows[0].text()).not.toContain('Test Task 1')
  })
})
