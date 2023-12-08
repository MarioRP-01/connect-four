/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { suite, test } from '@testdeck/jest'
import { Game } from '../../src/models/Game'
import { Registry } from '../../src/models/Registry'
import { SessionState } from '../../src/models/SessionState'

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
    resets_board_to_initial_state (): void {
      this.sut.register()
      this.sut.reset()

      expect(this.sut.canUndo()).toBe(false)
      expect(this.sut.canRedo()).toBe(false)
    }

    @test
    adds_new_memento_to_list (): void {
      const initialMementosLength = this.sut['mementos'].length

      this.sut.register()

      expect(this.sut['mementos'].length).toBe(initialMementosLength + 1)
      expect(this.sut.canUndo()).toBe(true)
      expect(this.sut.canRedo()).toBe(false)
    }

    @test
    returns_board_to_last_memento (): void {
      this.sut.register()
      const previousFirstPrevious = this.sut['firstPrevious']
      this.sut.undo()

      const expectedBoard = this.game.getBoard().takeSnapshot()
      const memento = this.sut['mementos'][previousFirstPrevious + 1].getState()

      expect(this.sut['firstPrevious']).toBe(previousFirstPrevious + 1)
      expect(expectedBoard.boardPersisted).toEqual(memento.boardPersisted)
    }

    @test
    returns_board_to_following_memento (): void {
      this.sut.register()
      this.sut.undo()
      const previousFirstPrevious = this.sut['firstPrevious']

      this.sut.redo()

      const expectedBoard = this.game.getBoard().takeSnapshot()
      const memento = this.sut['mementos'][previousFirstPrevious - 1].getState()

      expect(this.sut['firstPrevious']).toBe(previousFirstPrevious - 1)
      expect(expectedBoard.boardPersisted).toEqual(memento.boardPersisted)
    }

    @test
    confirms_undo_is_possible_when_there_are_registered_mementos (): void {
      this.sut.register()
      expect(this.sut.canUndo()).toBe(true)
    }

    @test
    confirms_undo_is_not_possible_when_there_are_no_registered_mementos (): void {
      this.sut.register()
      this.sut.undo()
      expect(this.sut.canUndo()).toBe(false)
    }

    @test
    confirms_redo_is_possible_when_there_are_registered_mementos (): void {
      this.sut.register()
      this.sut.undo()

      expect(this.sut.canRedo()).toBe(true)
    }

    @test
    confirms_redo_is_not_possible_when_there_are_no_registered_mementos (): void {
      this.sut.register()
      expect(this.sut.canRedo()).toBe(false)

      this.sut.undo()
      this.sut.redo()

      expect(this.sut.canRedo()).toBe(false)
    }
  }
})
