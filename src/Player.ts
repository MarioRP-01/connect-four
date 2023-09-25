export class Player {
  constructor (readonly name: string, readonly symbol: string) { }

  renderPrompt (): string {
    return `${this.name} (${this.symbol}): `
  }
}
