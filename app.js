const prompts = require('prompts');
const api = require('./api.js');

const searchCategory = async (args) => {
    console.log("args", args);
    const result  = await api.getCategory(args.category);
    
    for(const i in result['data']){
        console.log(result['data'][i]['name']);
    }
    //console.log(result);
    
}

const searchEntry = async (args) => {
    console.log("args", args);
    const result  = await api.getEntry(args.entry);
    
    console.log(result);   
}
module.exports = {
    searchCategory,
    searchEntry
};