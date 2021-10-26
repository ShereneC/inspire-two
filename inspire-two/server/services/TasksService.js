import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllTasks(query = {}) {
    const tasks = await dbContext.Tasks.find(query)
    if (!tasks) {
      throw new BadRequest('Tasks not found')
    }
    return tasks
  }
}

export const tasksService = new TasksService()
