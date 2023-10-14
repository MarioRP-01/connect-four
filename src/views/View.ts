import { type ControllersVisitor } from '../controllers/ControllersVisitor.ts'
import { type PlayController } from '../controllers/PlayController.ts'
import { type ResultController } from '../controllers/ResultController.ts'
import { type StartController } from '../controllers/StartController.ts'
import { PlayView } from './PlayView.ts'
import { ResultView } from './ResultView.ts'
import { StartView } from './StartView.ts'

export class View implements ControllersVisitor {
  private readonly startView = new StartView()
  private readonly playView = new PlayView()
  private readonly resultView = new ResultView()

  visitStartController (controller: StartController): void {
    this.startView.interact(controller)
  }

  async visitPlayController (controller: PlayController): Promise<void> {
    await this.playView.interact(controller)
  }

  visitResultController (controller: ResultController): void {
    this.resultView.interact(controller)
  }
}
