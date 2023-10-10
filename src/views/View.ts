import { type Game } from '../models/Game.ts'
import { PlayView } from './PlayView.ts'
import { ResultView } from './ResultView.ts'
import { StartView } from './StartView.ts'

export class View {
  private readonly startView = new StartView()
  private readonly playView = new PlayView(this.game)
  private readonly resultView = new ResultView(this.game)

  constructor (private readonly game: Game) { }

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
