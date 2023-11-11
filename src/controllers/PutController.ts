import { type Result } from 'neverthrow'
import { type BoardError } from '../utils/errors.ts'
import { Controller } from './Controller.ts'

export class PutController extends Controller {
  put (column: number): Result<null, BoardError> {
    return this.session.putToken(column)
  }
}
