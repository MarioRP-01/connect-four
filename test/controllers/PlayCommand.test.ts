/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { suite, test } from '@testdeck/jest'
import { PlayCommandFactory } from '../../src/controllers/PlayCommand.ts'
import { type PlayController } from '../../src/controllers/PlayController.ts'

describe('PlayCommand', () => {
  @suite
  class PlayCommandFactoryTest {
    private sut!: PlayCommandFactory

    before (): void {
      const mockPlayController = jest.mock('../../src/controllers/PlayController.ts')
      //   () => (return {
      //     playCommandFactory: jest.fn(),
      //     putController: jest.fn(),
      //     undoController: jest.fn(),
      //     redoController: jest.fn(),
      //     put: jest.fn(),
      //     undo: jest.fn(),
      //     redo: jest.fn(),
      //     play: jest.fn(),
      //     control: jest.fn()
      //   })
      // )

      this.sut = new PlayCommandFactory(mockPlayController as unknown as PlayController)
    }

    @test
    gets_correct_command_based_on_input (): void {
      const hola = this.sut.getCommand('r')
      hola.map((command) => { command.execute(); return null })

      // expect(this.sut.getCommand('r')).toEqual(new Ok(new RedoCommand(this.sut['playController'])))
      // expect(this.sut.getCommand('u')).toEqual(new Ok(new UndoCommand(this.sut['playController'])))
      // expect(this.sut.getCommand('1')).toEqual(new Ok(new PutCommand(this.sut['playController'], 1)))
    }
  }
})
