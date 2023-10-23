import { Logic } from './controllers/Logic.ts'
import { Session } from './models/Session.ts'
import { View } from './views/View.ts'

export class Connect4Game {
  private readonly session: Session
  private readonly view: View
  private readonly logic: Logic

  constructor () {
    this.session = new Session()
    this.logic = new Logic(this.session)
    this.view = new View()
  }

  async play (): Promise<void> {
    let acceptorController
    do {
      acceptorController = this.logic.getController()
      if (acceptorController != null) {
        await acceptorController.accept(this.view)
      }
    } while (acceptorController != null)
  }
}
