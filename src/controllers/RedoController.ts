import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { Controller } from './Controller.ts'

export class RedoController extends Controller {
  redo (): Result<null, BoardError> {
    return this.session.redo()
  }
}