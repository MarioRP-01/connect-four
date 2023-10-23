import { type Board } from './Board'
import { type Coordinate } from './Coordinate'

export class Memento {
  private readonly boardPersisted: string
  private readonly lastCoordinate: Coordinate | null

  constructor (
    board: Board
  ) {
    const { boardPersisted, lastCoordinate } = board.saveState()
    this.boardPersisted = boardPersisted
    this.lastCoordinate = lastCoordinate
  }

  getState (): { boardPersisted: string, lastCoordinate: Coordinate | null } {
    return {
      boardPersisted: this.boardPersisted,
      lastCoordinate: this.lastCoordinate
    }
  }
}
