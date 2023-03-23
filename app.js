const prompts = require('prompts');
const api = require('./api.js');
const hist = require('./history.js');
const searchCategory = async (args) => {
    console.log("args", args);
    //returns an object consisting of every item in a specific category
    const result  = await api.getCategory(args.category);
    
    //returns a list of indeces selected by the user from the result of the categorical search
    const selections = await selectEntry(result);
    
    //loop through the selected objects
    for(const i in selections['entries'])
    {
        //use the index from selectEntry to find information about the selected entries from the result of 
        //the categorical search
        const currentEntry = result['data'][selections['entries'][i]];
        hist.writeFunc(currentEntry);
        //loops through all the keys of each object to print out in a cleaner fashion than a blob of json 
        for(const [key, value] of Object.entries(currentEntry))
        {
            //ignores the image key since it's just a link to an image 
            if(key !== 'image')
                console.log(`${key}: ${value}`);
        }
        console.log('\n')
    }
    
}


//search for a specific entry, no prompt required on this one
const searchEntry = async (args) => {
    console.log("args", args);
    const result  = await api.getEntry(args.entry);
    console.log(result);
    return result;
}

//gets the name of every object returned from categorical search and allows the user to select
//any number of them via prompts, returning a list of indeces
const selectEntry = async (data) => {
    const displayEntries = []
    for(const i in data['data']){
        displayEntries.push(data['data'][i]['name']);
    }
    return await prompts([
        {
            type: 'multiselect',
            name: 'entries',
            message: 'Select items to show more info about them',
            choices: displayEntries
        }
    ]);
};

const displayCategory = async () => {
    const categories = [/*'creatures', */'equipment', 'materials', 'monsters','treasure']
    const category =  await prompts([
        {
            type: 'select',
            name: 'categories',
            message: 'Select items to show more info about them',
            choices: categories
        }
    ]);

    //console.log("selection", categories[category['categories']]);
    const selection = { category: categories[category['categories']] };
    //console.log("prompt return", category);
    
    searchCategory(selection);

}


module.exports = {
    searchCategory,
    searchEntry,
    selectEntry,
    displayCategory
};


