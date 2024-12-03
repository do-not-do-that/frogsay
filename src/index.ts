import { program } from 'commander';
import { getAsciiArt } from './asciiArt';
import { formatMessage } from './formatter';

program
  .name('frogsay')
  .description('Prints a sad frog saying your message!')
  .version('1.0.0')
  .argument('<message>', 'Message to display')
  .action((message) => {
    const art = getAsciiArt();
    const formattedMessage = formatMessage(message, art);
    // console.log(formattedMessage);
  });

program.parse();
