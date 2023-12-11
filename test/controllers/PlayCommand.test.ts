/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { suite, test } from '@testdeck/jest'
import { Err, Ok } from 'neverthrow'
import { PlayCommandFactory, PutCommand, RedoCommand, UndoCommand } from '../../src/controllers/PlayCommand.ts'
import { type PlayController } from '../../src/controllers/PlayController.ts'
import { invalidPlay } from '../../src/utils/errors.ts'
import { validViewColumn } from '../builder/boardBuilder.ts'

describe('PlayCommand', () => {
  @suite
  class PlayCommandFactoryTest {
    private sut!: PlayCommandFactory

    before (): void {
      const mockPlayController = jest.mock('../../src/controllers/PlayController.ts')
      this.sut = new PlayCommandFactory(mockPlayController as unknown as PlayController)
    }

    @test
    gets_correct_command_based_on_input (): void {
      expect(this.sut.getCommand('r')).toEqual(new Ok(new RedoCommand(this.sut['playController'])))
      expect(this.sut.getCommand('u')).toEqual(new Ok(new UndoCommand(this.sut['playController'])))
      expect(this.sut.getCommand(validViewColumn.toString())).toEqual(new Ok(new PutCommand(this.sut['playController'], 1)))
    }

    @test
    gets_error_when_input_is_invalid (): void {
      expect(this.sut.getCommand('invalid')).toEqual(new Err(invalidPlay()))
    }
  }
})
