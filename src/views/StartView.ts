import { type StartController } from '../controllers/StartController.ts'
import { AskPlayerTypeView } from './AskPlayerTypeView.ts'
import { InquirerCli } from './InquirerCli.ts'

export class StartView {
  private readonly inquirerCli: InquirerCli = new InquirerCli()
  private readonly askPlayerTypeView: AskPlayerTypeView = new AskPlayerTypeView()

  async interact (startController: StartController): Promise<void> {
    this.inquirerCli.render('Welcome to Connect Four!\n')
    await this.playersSetup(startController)
    startController.nextState()
  }

  private async playersSetup (startController: StartController): Promise<void> {
    const player1 = await this.askPlayerTypeView.getPlayerType(1)
    const player2 = await this.askPlayerTypeView.getPlayerType(2)
    startController.setupPlayers([player1, player2])
  }
}
