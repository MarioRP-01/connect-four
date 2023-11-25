/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Registry } from '../../src/models/Registry'
import { SessionState } from '../../src/models/SessionState'
import { Game } from '../../src/models/Game'

describe('Registry', () => {
  @suite
  class RegistryTest {
    private readonly sessionState = new SessionState()
    private readonly game = new Game(this.sessionState)
    private sut!: Registry

    before (): void {
      this.sut = new Registry(this.game)
    }

    @test
    reset (): void {
      this.sut.register()
      this.sut.reset()

      expect(this.sut.canUndo()).toBe(false)
      expect(this.sut.canRedo()).toBe(false)
    }

    @test
    register_adds_new_memento_to_list (): void {
      const initialMementosLength = this.sut['mementos'].length

      this.sut.register()

      expect(this.sut['mementos'].length).toBe(initialMementosLength + 1)
      expect(this.sut.canUndo()).toBe(true)
      expect(this.sut.canRedo()).toBe(false)
    }

    @test
    undo_returns_board_to_last_memento (): void {
      this.sut.register()
      const previousFirstPrevious = this.sut['firstPrevious']
      this.sut.undo()

      const expectedBoard = this.game.getBoard().saveState()
      const memento = this.sut['mementos'][previousFirstPrevious + 1].getState()

      expect(this.sut['firstPrevious']).toBe(previousFirstPrevious + 1)
      expect(expectedBoard.boardPersisted).toEqual(memento.boardPersisted)
    }

    @test
    redo_returns_board_to_following_memento (): void {
      this.sut.register()
      this.sut.undo()
      const previousFirstPrevious = this.sut['firstPrevious']

      this.sut.redo()

      const expectedBoard = this.game.getBoard().saveState()
      const memento = this.sut['mementos'][previousFirstPrevious - 1].getState()

      expect(this.sut['firstPrevious']).toBe(previousFirstPrevious - 1)
      expect(expectedBoard.boardPersisted).toEqual(memento.boardPersisted)
    }

    @test
    canUndo_returns_true_when_there_are_registered_mementos (): void {
      this.sut.register()
      expect(this.sut.canUndo()).toBe(true)
    }

    @test
    canUndo_returns_false_when_there_are_no_registered_mementos (): void {
      this.sut.register()
      this.sut.undo()
      expect(this.sut.canUndo()).toBe(false)
    }

    @test
    canRedo_returns_true_when_there_are_registered_mementos (): void {
      this.sut.register()
      this.sut.undo()

      expect(this.sut.canRedo()).toBe(true)
    }

    @test
    canRedo_returns_false_when_there_are_no_registered_mementos (): void {
      this.sut.register()
      expect(this.sut.canRedo()).toBe(false)

      this.sut.undo()
      this.sut.redo()

      expect(this.sut.canRedo()).toBe(false)
    }
  }
})
