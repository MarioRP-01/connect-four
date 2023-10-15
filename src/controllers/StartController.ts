import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'

export class StartController extends Controller {
  async accept (controllersVisitor: ControllersVisitor): Promise<void> {
    controllersVisitor.visitStartController(this)
  }
}
