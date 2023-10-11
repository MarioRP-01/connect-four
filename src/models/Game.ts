import { type Result } from 'neverthrow'
import { type BoardError } from '../errors.ts'
import { Board } from './Board.ts'
import { type Coordinate } from './Coordinate.ts'
import { type Player } from './Player.ts'
import { type Token } from './Token.ts'
import { Turn, type Players } from './Turn.ts'

export class Game {
  private readonly board: Board = new Board(6, 7)
  private readonly turn: Turn

  constructor (
    players: Players
  ) {
    this.turn = new Turn(players)
  }

  getCurrentPlayer (): Player {
    return this.turn.getCurrentPlayer()
  }

  performTurn (column: number): Result<null, BoardError> {
    return this.board.put(column, this.turn.getCurrentPlayer().token)
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
}