import { type Result } from 'neverthrow'
import { type Connect4Error } from '../utils/errors.ts'
import { Controller } from './Controller.ts'

export class PutController extends Controller {
  put (column: number): Result<null, Connect4Error> {
    return this.session.putToken(column)
  }
}
