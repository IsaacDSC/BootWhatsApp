const fs = require('fs')
const readFile = () => {
    const content = fs.readFileSync('./data/data.json', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const upFile = JSON.stringify(content)
    fs.writeFileSync('./data/data.json', upFile, 'utf-8')
}


module.exports = {
    readFile: readFile,
    writeFile: writeFile
}