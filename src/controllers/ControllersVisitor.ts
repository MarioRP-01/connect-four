import { type PlayController } from './PlayController'
import { type ResultController } from './ResultController'
import { type StartController } from './StartController'

export interface ControllersVisitor {
  visitStartController: (controller: StartController) => void
  visitPlayController: (controller: PlayController) => Promise<void>
  visitResultController: (controller: ResultController) => void
}
