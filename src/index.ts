import { createInterface } from 'node:readline';

const reader = createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.question('Enter some text: ', (text) => {
  console.log(`Text: ${text}`);
  reader.close();
});
