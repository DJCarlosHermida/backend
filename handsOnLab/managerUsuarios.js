const fs = require('fs')

const path = 'Usuarios.json'

class ManagerUsuarios {
    consultarUsuarios = async () => {
        if (fs.existsSync(path)) {
            const InfoArchivo = await fs.promises.readFile(path, 'utf-8')
            const usuarios = JSON.parse(InfoArchivo)
            return usuarios
        } else {
            console.log('archivo no existe')
            return []
        } 
    }
    crearUruario = async (usuario) => {
        const usuarios = await this.consultarUsuarios()
        let id
        if (usuarios.length === 0) {
            id = 1
        }else {
            id = usuarios[usuarios.length - 1].id + 1
        }
        const nuevoUsuario = {id, ...usuario}
        usuarios.push(nuevoUsuario)
        await fs.promises.writeFile(path, JSON.stringify(usuarios))
        return nuevoUsuario
    }
}

const usuario1 = {
    nombre: 'Carlos',
    apellido: 'Hermida'
}

const usuario2 = {
    nombre: 'Emilio',
    apellido: 'López'
}

async function prueba() {
    const manager = new ManagerUsuarios()
    await manager.crearUruario(usuario1)
    await manager.crearUruario(usuario2)
    const usuarios = await manager.consultarUsuarios()
    console.log(usuarios);
}
prueba()