import { type Coordinate } from '../utils/Coordinate'
import { type TokenSymbol } from '../utils/Token'
import { type Board, type BoardSnapshot } from './Board'

export class Memento {
  private readonly boardPersisted: TokenSymbol[][]
  private readonly lastCoordinate: Coordinate | null

  constructor (
    board: Board
  ) {
    const { boardPersisted, lastCoordinate } = board.takeSnapshot()
    this.boardPersisted = boardPersisted
    this.lastCoordinate = lastCoordinate
  }

  getState (): BoardSnapshot {
    return {
      boardPersisted: this.boardPersisted,
      lastCoordinate: this.lastCoordinate
    }
  }
}
