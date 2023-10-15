import { fromPromise, type ResultAsync } from 'neverthrow'
import * as Errors from '../errors.ts'
import { type BoardError } from '../errors.ts'
import { InquirerCli } from './InquirerCli.ts'

type PlayerType = 'h' | 'b'

export class AskPlayerTypeView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()

  getPlayerType (player: number): ResultAsync<{ playerType: PlayerType }, BoardError> {
    return fromPromise(
      this.inquirerCli
        .prompt([{
          name: 'selectPlayerType',
          message: `Select type for Player ${player}: (h/b)`
        }]),
      (error) => (Errors.other('inquired failed', error as Error))
    ).map((answers) => ({ playerType: answers.selectPlayerType }))
  }
}
