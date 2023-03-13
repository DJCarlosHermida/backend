const fs = require('fs')
const crypto = require('crypto')

const path = 'Usuarios.json'

class ManagerUsuario {
    consultarUsuarios = async () => {
        try {
            if (fs.existsSync(path)) {
                const data = await fs.promises.readFile(path, 'utf-8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    crearUsuario = async (obj) => {
        try {
            const users = await this.consultarUsuarios()
            const id = this.#generarId(users)
            const newUser = { id, ...obj }

            newUser.key = crypto.randomBytes(128).toString('base64')

            newUser.password = crypto
                .createHmac('sha256', newUser.key)
                .update(newUser.password)
                .digest('hex')

            users.push(newUser)
            await fs.promises.writeFile(path, JSON.stringify(users))
            return (newUser)
        } catch (error) {
            console.log(error);
        }
    }

    validarUsuario = async (username, password) => {
        const users = await this.consultarUsuarios()
        const user = users.find(u => u.username === username)
        if (!user) {
            console.log('Usuario o contraseña no válidas');
        } else {
            const cryptoNewPass = crypto
                .createHmac('sha256', user.key)
                .update(password)
                .digest('hex')

            if (user.password === cryptoNewPass) {
                console.log('Logueado');
            } else {
                console.log('Usuario o contraseña no válidas');
            }
        }
    }

    #generarId(array) {
        let id
        if (array.length === 0) {
            id = 1
        } else {
            id = array[array.length - 1].id + 1
        }
        return id
    }
}

const usuario1 = {
    nombre: 'Carlos',
    apellido: 'Hermida',
    username: 'ch18',
    password: '12345'
}

const usuario2 = {
    nombre: 'Lucía',
    apellido: 'Pons',
    username: 'lupo',
    password: 'abcde'
}

const usuario3 = {
    nombre: 'Edgardo',
    apellido: 'Hermida',
    username: 'lalo',
    password: '123abc'
}



const manager = new ManagerUsuario()
const prueba = async () => {
    // await manager.crearUsuario(usuario1)
    // const usuarios = await manager.consultarUsuarios()
    // console.log(usuarios);
    await manager.validarUsuario('ch8', '12345')
}
prueba()