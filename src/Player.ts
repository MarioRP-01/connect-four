import { type Token } from './Token.ts'

export class Player {
  constructor (readonly name: string, readonly token: Token) { }

  renderPrompt (): string {
    return `${this.name} (${this.token.toString()}): `
  }
}
