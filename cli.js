//Currently copied directly from the week 8 examples




const yargs = require('yargs/yargs');

const app = require('./app.js');

// eslint-disable-next-line no-undef
yargs(process.argv.slice(2))
    // $0 expands the file name
    // <> indicate that the command is manadatory
    // [] indicate that options are optional
    .usage('$0: Usage <command> [options]')
    .command(
        // command
        // <> indicates the command argument required
        'play <game>',
        // description for the command
        'play card games',
        // builder function to build out our command arguments and options
        // the argument inside the function below represents an instance of yargs
        (yargs) => {
            // configures a command argument based off the name
            // first argument below must match the name given in the <>
            // second agument is an options object
            return (
                yargs
                    .positional('game', {
                        describe: 'name of the card game',
                        type: 'string',
                        choices: ['poker', 'go-fish', 'blackjack']
                    })
                    // options aka flags that exists on our command
                    // first argument is the short or long form for the option name (ex: long form)
                    // alias is opposite form of the first argument (ex: short form)
                    .options('cardCount', {
                        alias: 'c',
                        describe:
                            'the number of cards to use when playing poker',
                        default: 5
                    })
            );
        },
        // handler functions for handling parsed command, command arguments, and options
        (args) => {
            if (args.game === 'poker') {
                // invoke a function to play poker
                app.playPoker(args);
            } else if (args.game === 'go-fish') {
                // invoke a function to play go-fish
                console.log(`${args.game} is not ready`);
            } else {
                console.log(`${args.game} is not available`);
            }
        }
    )
    .help().argv;
