export class Player {
  constructor (readonly name: string, readonly symbol: string) { }

  render_prompt (): string {
    return `${this.name} (${this.symbol}): `
  }
}
