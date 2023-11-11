import { type Result } from 'neverthrow'
import { type Connect4Error } from '../utils/errors.ts'
import { Controller } from './Controller.ts'

export class RedoController extends Controller {
  redo (): Result<null, Connect4Error> {
    return this.session.redo()
  }
}
