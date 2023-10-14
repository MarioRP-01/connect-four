import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'

export class StartController extends Controller {
  accept (controllersVisitor: ControllersVisitor): void {
    controllersVisitor.visitStartController(this)
  }
}
