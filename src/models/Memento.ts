import { type Board, type BoardPersistance } from './Board'
import { type Coordinate } from './Coordinate'
import { type TokenSymbol } from './Token'

export class Memento {
  private readonly boardPersisted: TokenSymbol[][]
  private readonly lastCoordinate: Coordinate | null

  constructor (
    board: Board
  ) {
    const { boardPersisted, lastCoordinate } = board.saveState()
    this.boardPersisted = boardPersisted
    this.lastCoordinate = lastCoordinate
  }

  getState (): BoardPersistance {
    return {
      boardPersisted: this.boardPersisted,
      lastCoordinate: this.lastCoordinate
    }
  }
}
