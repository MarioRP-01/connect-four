import { Interface, ReadLineOptions, createInterface } from "node:readline";

export class ConnectFour {

    private reader: Interface;

    constructor(readLineOptions: ReadLineOptions) {
        this.reader = createInterface(readLineOptions);
    }

    start() {
        this.reader.question('Enter some text: ', (text) => {
            console.log(`Text: ${text}`);
            this.reader.close();
        });
    }
}
