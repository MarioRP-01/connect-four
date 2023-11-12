import { type Result } from 'neverthrow'
import { type Connect4Error } from '../utils/errors.ts'
import { Controller } from './Controller.ts'

export class UndoController extends Controller {
  undo (): Result<null, Connect4Error> {
    return this.session.undo()
  }
}
