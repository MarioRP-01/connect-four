import { type ControllersVisitor } from './ControllersVisitor.ts'

export interface AcceptorController {
  accept: (controllerVisitor: ControllersVisitor) => Promise<void>
}
