import { type Players } from './Game.js'
import { type Player } from './Player.js'

export class TurnManager {
  private readonly turns: Players
  private currentTurn: number

  constructor (players: Players) {
    this.currentTurn = 0
    this.turns = players
  }

  getCurrentPlayer (): Player {
    return this.turns[this.currentTurn]
  }

  switchPlayer (): void {
    this.currentTurn = (this.currentTurn + 1) % this.turns.length
  }
}
