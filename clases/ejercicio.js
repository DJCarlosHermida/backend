const fs = require('fs')

const infoPackage = fs.readFileSync('package.json', 'utf-8')
console.log(infoPackage);

const info = {
    contenido: infoPackage,
    contenidoOb: JSON.parse(infoPackage),
    size: fs.statSync('package.json').size
}

console.log(info);

fs.promises.writeFile('info.json', JSON.stringify(info))
.then(() => console.log('Archivo Creado'))
.catch(error => console.log(error))