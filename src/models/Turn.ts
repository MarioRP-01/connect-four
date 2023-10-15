import { type Result } from 'neverthrow'
import { type Player } from './Player.ts'
import { type BoardError } from '../errors.ts'
import { type Board } from './Board.ts'

// type Players = [ player1: Player, player2: Player ]

export class Turn {
  private turns: Player[] | null
  private currentTurn: number

  constructor (private readonly board: Board) {
    this.currentTurn = 0
  }

  setPlayers(players: Player[]): void {
    this.turns = players
  }

  getCurrentPlayer (): Player {
    if (this.turns === null) {
      throw new Error('Players have not been set')
    }
    return this.turns[this.currentTurn]
  }

  switchPlayer (): void {
    if (this.turns === null) {
      throw new Error('Players have not been set')
    }
    this.currentTurn = (this.currentTurn + 1) % this.turns.length
  }

  putToken (column: number): Result<null, BoardError> {
    if (this.turns === null) {
      throw new Error('Players have not been set')
    }
    return this.getCurrentPlayer().putToken(column, this.board)
  }
}
