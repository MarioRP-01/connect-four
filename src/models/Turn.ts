import { type Result } from 'neverthrow'
import { type Player } from './Player.ts'
import { type BoardError } from '../errors.ts'
import { HumanPlayer } from './HumanPlayer.ts'
import { BotPlayer } from './BotPlayer.ts'
import { TOKEN_SYMBOLS, Token } from './Token.ts'
import { type Board } from './Board.ts'

type Players = [ player1: Player, player2: Player ]

export class Turn {
  private readonly turns: Players
  private currentTurn: number

  constructor (private readonly board: Board) {
    this.currentTurn = 0
    this.turns = [
      new HumanPlayer('Player 1', new Token(TOKEN_SYMBOLS.RED_TOKEN)),
      new BotPlayer('Player 2', new Token(TOKEN_SYMBOLS.BLUE_TOKEN))
    ]
  }

  getCurrentPlayer (): Player {
    return this.turns[this.currentTurn]
  }

  switchPlayer (): void {
    this.currentTurn = (this.currentTurn + 1) % this.turns.length
  }

  putToken (column: number): Result<null, BoardError> {
    return this.getCurrentPlayer().putToken(column, this.board)
  }
}
