const fs = require('fs');

const writeFunc = async (input) => {
  const filePath = './history.json';
  const newData = input;
  

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    let existingData = JSON.parse([data]);

    if(!Array.isArray(existingData)){
      existingData = [];
    }
    existingData.push(newData);

    const updatedData = JSON.stringify(existingData,null,5);
    fs.writeFile(filePath, updatedData, 'utf-8', (err) => {
      if (err)
        console.log(err);
      else {
        console.log(fs.readFileSync("./history.json", "utf8"));
        console.log("File written successfully."); 
      }
    })
 
  });
  
}

module.exports = {
  writeFunc
};