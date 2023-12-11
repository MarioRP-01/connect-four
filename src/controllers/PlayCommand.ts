import { Err, Ok, type Result } from 'neverthrow'
import { isValidColumn } from '../utils/Coordinate.ts'
import { invalidPlay, type Connect4Error } from '../utils/errors.ts'
import { isNumeric } from '../utils/utils.ts'
import { type PlayController } from './PlayController.ts'

export interface PlayCommand {
  execute: () => Result<null, Connect4Error>
}

export class PutCommand implements PlayCommand {
  constructor (
    private readonly playController: PlayController,
    private readonly response: number
  ) {}

  execute (): Result<null, Connect4Error> {
    return this.playController.put(this.response)
  }
}

export class UndoCommand implements PlayCommand {
  constructor (
    private readonly playController: PlayController
  ) {}

  execute (): Result<null, Connect4Error> {
    return this.playController.undo()
  }
}

export class RedoCommand implements PlayCommand {
  constructor (
    private readonly playController: PlayController
  ) {}

  execute (): Result<null, Connect4Error> {
    return this.playController.redo()
  }
}

export class PlayCommandFactory {
  constructor (
    private readonly playController: PlayController
  ) {}

  public getCommand (action: string): Result<PlayCommand, Connect4Error> {
    if (action === 'r') return new Ok(new RedoCommand(this.playController))
    if (action === 'u') return new Ok(new UndoCommand(this.playController))
    if (isNumeric(action) && isValidColumn(Number(action))) {
      return new Ok(new PutCommand(this.playController, Number(action)))
    }

    return new Err(invalidPlay())
  }
}
