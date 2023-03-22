const superagent = require('superagent');
const base = 'https://botw-compendium.herokuapp.com/api/v2';

const getCategory = async (category) => {
    try{
        const categoryUrl = `${base}/category/${category}`;
        const res = await superagent.get(categoryUrl);
        
        return res.body;
        
    } catch (error) {
        console.log(error);
    }
};

const getEntry = async (entry) => {
    try{
        const entryUrl = `${base}/entry/${entry}`;
        const res = await superagent.get(entryUrl);
        return res.body;
    }catch (error) {
        console.log(error);
    }
};

module.exports = {
    getCategory,
    getEntry
};  