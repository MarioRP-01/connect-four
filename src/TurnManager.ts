import { type Player } from './Player.js'

export class TurnManager {
  private readonly turns: Record<number, Player>
  private current_turn: number

  constructor ({ player1, player2 }: { player1: Player, player2: Player }) {
    this.current_turn = 0
    this.turns = {
      0: player1,
      1: player2
    }
  }

  get_current_player (): Player {
    return this.turns[this.current_turn]
  }

  forward (): void {
    this.current_turn = (this.current_turn + 1) % 2
  }
}
