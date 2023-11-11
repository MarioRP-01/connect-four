import assert from 'assert'
import { type Result } from 'neverthrow'
import { TOKEN_SYMBOLS, Token } from '../utils/Token.ts'
import { type Connect4Error } from '../utils/errors.ts'
import { type Board } from './Board.ts'
import { BotPlayer } from './BotPlayer.ts'
import { HumanPlayer } from './HumanPlayer.ts'
import { type Player } from './Player.ts'
import { type SessionState } from './SessionState.ts'

type Players = [ player1: Player, player2: Player ]

export class Turn {
  private readonly turns: Players
  private currentTurn: number

  constructor (
    private readonly board: Board,
    private readonly gameSessionState: SessionState
  ) {
    this.currentTurn = 0
    this.turns = [
      new HumanPlayer('Player 1', new Token(TOKEN_SYMBOLS.RED_TOKEN)),
      new BotPlayer('Player 2', new Token(TOKEN_SYMBOLS.BLUE_TOKEN), this.gameSessionState)
    ]
  }

  reset (): void {
    this.currentTurn = 0
  }

  getCurrentPlayer (): Player {
    return this.turns[this.currentTurn]
  }

  switchPlayer (): void {
    this.currentTurn = (this.currentTurn + 1) % this.turns.length
  }

  putToken (column: number): Result<null, Connect4Error> {
    return this.getCurrentPlayer().putToken(column, this.board)
  }

  setTurnByToken (token: Token): void {
    const newTurn = this.turns.findIndex((player) => player.token.equals(token))
    assert(newTurn > -1)
    this.currentTurn = newTurn
  }
}
