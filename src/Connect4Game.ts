import { Logic } from './controllers/Logic.ts'
import { Session } from './models/Session.ts'
import { ViewFactory } from './views/ViewFactory.ts'

export class Connect4Game {
  private readonly session: Session = new Session()
  private readonly viewFactory: ViewFactory = new ViewFactory()
  private readonly logic: Logic = new Logic(this.session, this.viewFactory)

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
