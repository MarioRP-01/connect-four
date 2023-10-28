import { Logic } from './controllers/Logic.ts'
import { Session } from './models/Session.ts'
import { View, ViewFactory } from './views/View.ts'

export class Connect4Game {
  private readonly session: Session = new Session()
  private readonly viewFactory: ViewFactory = new ViewFactory()
  private readonly view: View = new View()
  private readonly logic: Logic = new Logic(this.session, this.viewFactory, this.view)

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
