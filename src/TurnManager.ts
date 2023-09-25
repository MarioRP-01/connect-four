import { type Player } from './Player.js'

export class TurnManager {
  private readonly turns: Record<number, Player>
  private currentTurn: number

  constructor ({ player1, player2 }: { player1: Player, player2: Player }) {
    this.currentTurn = 0
    this.turns = {
      0: player1,
      1: player2
    }
  }

  getCurrentPlayer (): Player {
    return this.turns[this.currentTurn]
  }

  switchPlayer (): void {
    this.currentTurn = (this.currentTurn + 1) % 2
  }
}
