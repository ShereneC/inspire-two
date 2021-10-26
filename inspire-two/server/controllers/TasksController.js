import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllTasks)
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

  async createTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }
}
