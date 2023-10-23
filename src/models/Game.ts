import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { Board } from './Board.ts'
import { type Coordinate } from './Coordinate.ts'
import { Memento } from './Memento.ts'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'
import { Turn } from './Turn.ts'

export class Game {
  private readonly board = new Board()
  private readonly turn = new Turn(this.board)

  reset (): void {
    this.board.reset()
    this.turn.reset()
  }

  getCurrentPlayer (): Player {
    return this.turn.getCurrentPlayer()
  }

  putToken (column: number): Result<null, BoardError> {
    return this.turn.putToken(column)
      .map(() => {
        if (!this.board.hasWinner()) {
          this.turn.switchPlayer()
        }
        return null
      })
  }

  getToken (coordinate: Coordinate): Token {
    return this.board.getToken(coordinate)
  }

  canContinue (): boolean {
    return this.board.isWinnable() && !this.board.hasWinner()
  }

  getWinner (): Player | null {
    if (!this.board.hasWinner()) {
      return null
    }

    return this.turn.getCurrentPlayer()
  }

  createMemento (): Memento {
    return new Memento(this.board)
  }

  setMemento (memento: Memento): void {
    const { boardPersisted, lastCoordinate } = memento.getState()

    if (lastCoordinate === null) {
      this.reset()
      return
    }

    this.board.loadState({ boardPersisted, lastCoordinate })
    const lastToken = this.board.getToken(lastCoordinate)
    this.turn.setTurnByToken(lastToken)
    this.turn.switchPlayer()
  }
}
