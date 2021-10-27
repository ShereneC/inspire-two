import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .get('', this.getAllTasks)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getTaskById)
      .post('', this.createTask)
      .delete('', this.removeTask)
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await tasksService.getAllTasks(req.query)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await tasksService.getTaskById(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async removeTask(req, res, next) {
    try {
      await tasksService.removeTask(req.params.id, req.userInfo.id)
    } catch (error) {
      next(error)
    }
    return 'Task has been deleted'
  }
}
