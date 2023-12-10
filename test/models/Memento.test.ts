/* eslint-disable @typescript-eslint/no-unused-vars */
import { suite, test } from '@testdeck/jest'
import { Memento } from '../../src/models/Memento'
import { createNonFullBoard } from '../builder/boardBuilder'

@suite
class MementoTest {
  @test
  creates_a_valid_memento_with_the_correct_state (): void {
    const mockBoard = createNonFullBoard()
    const memento = new Memento(mockBoard)
    const mementoState = memento.getState()

    expect(mementoState.boardPersisted).toEqual(mockBoard.takeSnapshot().boardPersisted)
    expect(mementoState.lastCoordinate).toEqual(mockBoard.takeSnapshot().lastCoordinate)
  }
}
