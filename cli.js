const yargs = require('yargs/yargs');
const app = require ('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
        // THIS IS IMPORTANT 
        'search <category>',
        //       ^^^^^^^
        'search a category of objects from the game, ie monsters, equipment etc..',

        (yargs) => {
            return (
                yargs
                    .positional('category', {
                        describe: 'search category',
                        type: 'string',
                        //possible choices, which perhaps could itself be a prompt
                        choices: [/*'creatures', */'equipment', 'materials', 'monsters','treasure']
                    })
            );

        },
        (args) => {
            if(args.category === 'monsters' ||/* args.category === 'creatures' || */ args.category === 'materials'
                    || args.category === 'treasure' || args.category === 'equipment'){
                app.searchCategory(args);
            } else {
                console.log('invalid search term');
            } 
        }
    )
    .command(
        'entry <entry>',
        'search for a specific entry, the name of which must be exact',
        (yargs) => {
            return (
                yargs
                    .positional('entry', {
                        describe: 'search category',
                        type: 'string',
                        //since this searches for one specific entry by name, a list of choices would be very long
                        //choices: ['creatures', 'equipment', 'materials', 'monsters','treasure']
                    })
            );

        },
        (args) => {
            if(args.entry !== undefined){
                app.searchEntry(args);
            } else {
                console.log('invalid search term');
            } // etc etc
        }

    )
    .command(
        'choices',
        'select from a list of choices',
        (yargs) => {
            return (
                yargs
                    .positional('entry', {
                        describe: 'search category',
                        type: 'string',
                        //since this searches for one specific entry by name, a list of choices would be very long
                        //choices: ['creatures', 'equipment', 'materials', 'monsters','treasure']
                    })
            );

        },
        (args) => {
            app.displayCategory();            
        }
    )
    
    .help().argv;