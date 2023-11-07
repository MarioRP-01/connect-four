import { Logic } from './controllers/Logic.ts'
import { ViewFactory } from './views/ViewFactory.ts'

export class Connect4Game {
  private readonly viewFactory: ViewFactory = new ViewFactory()
  private readonly logic: Logic = new Logic(this.viewFactory)

  async play (): Promise<void> {
    let acceptorController
    do {
      acceptorController = this.logic.getController()
      if (acceptorController != null) {
        await acceptorController.control()
      }
    } while (acceptorController != null)
  }
}
