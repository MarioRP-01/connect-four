import assert from 'assert'
import { type Game } from './Game'
import { type Memento } from './Memento'

export class Registry {
  private mementos!: Memento[]
  private firstPrevious!: number

  constructor (private readonly game: Game) {
    this.reset()
  }

  reset (): void {
    this.firstPrevious = 0
    this.mementos = [this.game.createMemento()]
  }

  register (): void {
    this.mementos.splice(0, this.firstPrevious)
    this.firstPrevious = 0
    this.mementos.unshift(this.game.createMemento())
  }

  undo (): void {
    assert(this.canUndo())

    this.firstPrevious++
    this.game.setMemento(this.mementos[this.firstPrevious])
  }

  redo (): void {
    assert(this.canRedo())

    this.firstPrevious--
    this.game.setMemento(this.mementos[this.firstPrevious])
  }

  canUndo (): boolean {
    return this.firstPrevious < this.mementos.length - 1
  }

  canRedo (): boolean {
    return this.firstPrevious > 0
  }
}
