import { type Logic } from '../controllers/Logic.ts'
import { PlayView } from './PlayView.ts'
import { ResultView } from './ResultView.ts'
import { StartView } from './StartView.ts'

export class View {
  private readonly startView = new StartView()
  private readonly playView = new PlayView(this.logic)
  private readonly resultView = new ResultView(this.logic)

  constructor (
    private readonly logic: Logic
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
