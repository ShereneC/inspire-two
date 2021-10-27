import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllTasks(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('creator')
    if (!tasks) {
      throw new BadRequest('Tasks not found')
    }
    return tasks
  }

  async getTaskById(id) {
    const foundTask = await dbContext.Tasks.findById(id).populate('creator')
    if (!foundTask) {
      throw new BadRequest('Invalid Task Id')
    }
    return foundTask
  }

  async createTask(body) {
    const newTask = await dbContext.Tasks.create(body)
    return await dbContext.Tasks.findById(newTask.id)
  }

  async markAsComplete(id, userId) {
    const task = await dbContext.Tasks.findById(id)
    if (!task) {
      throw new BadRequest('No Task Found with this Id')
    } else if (task.completed === false) {
      const taskToUpdate = await dbContext.Tasks.findByIdAndUpdate(id, { completed: true }, { new: true })
      return taskToUpdate
    } else {
      const taskToUpdate = await dbContext.Tasks.findByIdAndUpdate(id, { completed: false }, { new: true })
      return taskToUpdate
    }
  }

  async removeTask(id, userId) {
    const task = await this.getTaskById(id)
    if (task) {
      if (userId === task.creator.id) {
        const taskToDelete = await dbContext.Tasks.findByIdAndDelete(id)
        return taskToDelete
      }
      throw new BadRequest('This is not your task!')
    }
    throw new BadRequest('Task Not Found with that ID')
  }
}

export const tasksService = new TasksService()
