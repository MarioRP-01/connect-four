import readline from 'readline';

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.question('Enter some text: ', (text) => {
  console.log(`Text: ${text}`);
  reader.close();
});
