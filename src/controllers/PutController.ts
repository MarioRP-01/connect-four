import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { Controller } from './Controller.ts'

export class PutController extends Controller {
  performTurn (column: number): Result<null, BoardError> {
    return this.session.putToken(column)
  }
}
