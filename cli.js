const yargs = require('yargs/yargs');
const app = require ('./app.js');

yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
        // THIS IS IMPORTANT 
        'search <category>',
        //       ^^^^^^^
        'search a category',

        (yargs) => {
            return (
                yargs
                    .positional('category', {
                        describe: 'search category',
                        type: 'string',
                        choices: ['creatures', 'equipment', 'materials', 'monsters','treasure']
                    })
            );

        },
        (args) => {
            if(args.category === 'monsters' || args.category === 'creatures' || args.category === 'materials'
                    || args.category === 'treasure' || args.category === 'equipment'){
                app.searchCategory(args);
            } else {
                console.log('invalid search term');
            } // etc etc
        }
    )
    .command(
        'entry <entry>',
        'search for a specific entry',
        (yargs) => {
            return (
                yargs
                    .positional('entry', {
                        describe: 'search category',
                        type: 'string',
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
    .help().argv;