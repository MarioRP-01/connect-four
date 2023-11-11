import { Err, Ok, type Result } from 'neverthrow'
import { type Board } from '../utils/Board.ts'
import { type Coordinate } from '../utils/Coordinate.ts'
import { type Token } from '../utils/Token.ts'
import { cannotRedo, cannotUndo, type Connect4Error } from '../utils/errors.ts'
import { Game } from './Game.ts'
import { type Player } from './Player.ts'
import { Registry } from './Registry.ts'
import { type SessionState } from './SessionState.ts'

export type ActionType = 'Put' | 'Undo' | 'Redo'

export class Session implements SessionState {
  private readonly game: Game = new Game(this)
  private readonly registry: Registry = new Registry(this.game)
  private lastAction: ActionType | null = null

  getCurrentPlayer (): Player {
    return this.game.getCurrentPlayer()
  }

  putToken (column: number): Result<null, Connect4Error> {
    return this.game.putToken(column)
      .map(() => {
        this.lastAction = 'Put'
        this.registry.register()
        return null
      })
  }

  getLastAction (): ActionType | null {
    return this.lastAction
  }

  getBoard (): Board {
    return this.game.getBoard()
  }

  getToken (coordinate: Coordinate): Token {
    return this.game.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.game.canContinue()
  }

  getWinner (): Player | null {
    return this.game.getWinner()
  }

  redo (): Result<null, Connect4Error> {
    if (!this.registry.canRedo()) {
      return new Err(cannotRedo())
    }

    this.lastAction = 'Redo'
    this.registry.redo()
    return new Ok(null)
  }

  undo (): Result<null, Connect4Error> {
    if (!this.registry.canUndo()) {
      return new Err(cannotUndo())
    }

    this.lastAction = 'Undo'
    this.registry.undo()
    return new Ok(null)
  }
}
