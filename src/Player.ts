type Token = string

export class Player {
  constructor (readonly name: string, readonly symbol: Token) { }

  renderPrompt (): string {
    return `${this.name} (${this.symbol}): `
  }
}
