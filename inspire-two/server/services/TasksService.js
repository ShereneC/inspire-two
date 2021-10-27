import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllTasks(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate()
    if (!tasks) {
      throw new BadRequest('Tasks not found')
    }
    return tasks
  }

  async getTaskById(id) {
    const foundTask = await dbContext.Tasks.findById(id).populate()
    if (!foundTask) {
      throw new BadRequest('Invalid Task Id')
    }
    return foundTask
  }
}
export const tasksService = new TasksService()
