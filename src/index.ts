import { program } from 'commander';
import { getAsciiArt } from './asciiArt';
import { formatMessage } from './formatter';

program
  .name('frogsay')
  .description('Prints a sad frog saying your message!')
  .version('1.0.0')
  .option(
    '-m, --message <message>',
    'Message for the frog',
    'No message provided',
  )
  .action((options) => {
    const art = getAsciiArt();
    const formattedMessage = formatMessage(options.message, art);
    console.log(formattedMessage);
  });

program.parse();
