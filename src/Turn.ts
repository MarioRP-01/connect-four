import { type Player } from './Player.ts'

export class Turn {
  private readonly turns: Record<number, Player>
  private turn: number

  constructor ({ player1, player2 }: { player1: Player, player2: Player }) {
    this.turn = 0
    this.turns = {
      0: player1,
      1: player2
    }
  }

  get_current (): Player {
    return this.turns[this.turn]
  }

  next (): void {
    this.turn = (this.turn + 1) % 2
  }
}
