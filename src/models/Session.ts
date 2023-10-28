import { Err, Ok, type Result } from 'neverthrow'
import { cannotRedo, cannotUndo, type BoardError } from '../errors.ts'
import { type Coordinate } from './Coordinate.ts'
import { Game } from './Game.ts'
import { type Player } from './Player.ts'
import { type PublicBoard } from './PublicBoard.ts'
import { Registry } from './Registry.ts'
import { type Token } from './Token.ts'

export class Session {
  private readonly game: Game = new Game()
  private readonly registry: Registry = new Registry(this.game)

  getCurrentPlayer (): Player {
    return this.game.getCurrentPlayer()
  }

  putToken (column: number): Result<null, BoardError> {
    return this.game.putToken(column)
      .map(() => {
        this.registry.register()
        return null
      })
  }

  getBoard (): PublicBoard {
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

  redo (): Result<null, BoardError> {
    if (!this.registry.canRedo()) {
      return new Err(cannotRedo())
    }

    this.registry.redo()
    return new Ok(null)
  }

  undo (): Result<null, BoardError> {
    if (!this.registry.canUndo()) {
      return new Err(cannotUndo())
    }

    this.registry.undo()
    return new Ok(null)
  }
}
