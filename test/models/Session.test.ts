/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { suite, test } from '@testdeck/jest'
import { Err, Ok } from 'neverthrow'
import { Session } from '../../src/models/Session'
import { cannotRedo, cannotUndo, invalidColumn } from '../../src/utils/errors'
import { invalidViewColumn, validViewColumn } from '../builder/boardBuilder'

@suite
class SessionTest {
  // private readonly mockSessionState!: SessionState
  private sut!: Session

  before (): void {
    this.sut = new Session()
  }

  @test
  register_action_correctly_when_put_success (): void {
    const mockRegister = jest.spyOn(this.sut['registry'], 'register')
    const action = this.sut.putToken(validViewColumn)

    expect(action).toEqual(new Ok(null))
    expect(mockRegister).toHaveBeenCalledTimes(1)
    expect(this.sut['sessionState'].lastAction).toEqual('Put')
  }

  @test
  does_not_register_action_when_put_fails (): void {
    const mockRegister = jest.spyOn(this.sut['registry'], 'register')
    const action = this.sut.putToken(invalidViewColumn)

    expect(action).toEqual(new Err(invalidColumn()))
    expect(mockRegister).not.toHaveBeenCalled()
    expect(this.sut['sessionState'].lastAction).toEqual(null)
  }

  @test
  performs_undo_when_is_possible (): void {
    const mockUndo = jest.fn()
    this.sut['registry'].undo = mockUndo
    const mockCanUndo = jest.fn().mockReturnValue(true)
    this.sut['registry'].canUndo = mockCanUndo

    const action = this.sut.undo()

    expect(action).toEqual(new Ok(null))
    expect(mockUndo).toHaveBeenCalledTimes(1)
    expect(this.sut['sessionState'].lastAction).toEqual('Undo')
  }

  @test
  does_not_performs_undo_when_is_not_possible (): void {
    const mockCanUndo = jest.fn().mockReturnValue(false)
    this.sut['registry'].canUndo = mockCanUndo

    const action = this.sut.undo()

    expect(action).toEqual(new Err(cannotUndo()))
  }

  @test
  perform_redo_when_is_possible (): void {
    const mockRedo = jest.fn()
    this.sut['registry'].redo = mockRedo
    const mockCanRedo = jest.fn().mockReturnValue(true)
    this.sut['registry'].canRedo = mockCanRedo

    const action = this.sut.redo()

    expect(action).toEqual(new Ok(null))
    expect(mockRedo).toHaveBeenCalledTimes(1)
    expect(this.sut['sessionState'].lastAction).toEqual('Redo')
  }

  @test
  does_not_perform_redo_when_is_not_possible (): void {
    const mockCanRedo = jest.fn().mockReturnValue(false)
    this.sut['registry'].canRedo = mockCanRedo

    const action = this.sut.redo()

    expect(action).toEqual(new Err(cannotRedo()))
  }
}
