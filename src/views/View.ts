import { type PlayController } from '../controller/PlayController.ts'
import { type ResultController } from '../controller/ResultController.ts'
import { type StartController } from '../controller/StartController.ts'
import { PlayView } from './PlayView.ts'
import { ResultView } from './ResultView.ts'
import { StartView } from './StartView.ts'

export class View {
  private readonly startView = new StartView(this.startController)
  private readonly playView = new PlayView(this.playController)
  private readonly resultView = new ResultView(this.resultController)

  constructor (
    private readonly startController: StartController,
    private readonly playController: PlayController,
    private readonly resultController: ResultController
  ) { }

  start (): void {
    this.startView.interact()
  }

  async play (): Promise<void> {
    await this.playView.interact()
  }

  result (): void {
    this.resultView.interact()
  }
}
