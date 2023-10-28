import { Err, Ok, type Result } from 'neverthrow'
import { invalidPlay, type BoardError } from '../errors.ts'
import { isValidColumn } from '../models/Coordinate.ts'
import { isNumeric } from '../utils/utils.ts'
import { type PlayController } from './PlayController.ts'

export interface PlayCommand {
  execute: () => Result<null, BoardError>
}

class PutCommand implements PlayCommand {
  constructor (
    private readonly playController: PlayController,
    private readonly response: number
  ) {}

  execute (): Result<null, BoardError> {
    return this.playController.performTurn(this.response)
  }
}

class UndoCommand implements PlayCommand {
  constructor (
    private readonly playController: PlayController
  ) {}

  execute (): Result<null, BoardError> {
    return this.playController.undo()
  }
}

class RedoCommand implements PlayCommand {
  constructor (
    private readonly playController: PlayController
  ) {}

  execute (): Result<null, BoardError> {
    return this.playController.redo()
  }
}

export class PlayCommandFactory {
  constructor (
    private readonly playController: PlayController
  ) {}

  public getCommand (action: string): Result<PlayCommand, BoardError> {
    if (action === 'r') return new Ok(new RedoCommand(this.playController))
    if (action === 'u') return new Ok(new UndoCommand(this.playController))
    if (isNumeric(action) && isValidColumn(Number(action))) {
      return new Ok(new PutCommand(this.playController, Number(action)))
    }

    return new Err(invalidPlay())
  }
}
