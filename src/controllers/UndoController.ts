import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { Controller } from './Controller.ts'

export class UndoController extends Controller {
  undo (): Result<null, BoardError> {
    return this.session.undo()
  }
}
