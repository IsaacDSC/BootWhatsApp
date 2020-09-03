const fs = require('fs')
const readFile = () => {
    const content = fs.readFileSync('', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const upFile = JSON.stringify(content)
    fs.writeFileSync('./data/db.json', upFile, 'utf-8')
}


module.exports = {
    readFile: readFile,
    writeFile: writeFile
}