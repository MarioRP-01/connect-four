import { type AcceptorController } from './AcceptorController.ts'
import { Controller } from './Controller.ts'
import { type ControllersVisitor } from './ControllersVisitor.ts'

export class StartController extends Controller implements AcceptorController {
  async accept (controllersVisitor: ControllersVisitor): Promise<void> {
    controllersVisitor.visitStartController(this)
  }
}
