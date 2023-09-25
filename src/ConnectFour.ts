import { createInterface, type Interface, type ReadLineOptions } from 'node:readline'

export class ConnectFour {
  private readonly reader: Interface

  constructor (readLineOptions: ReadLineOptions) {
    this.reader = createInterface(readLineOptions)
  }

  start (): void {
    this.reader.question('Enter some text: ', (text) => {
      console.log(`Text: ${text}`)
      this.reader.close()
    })
  }
}
