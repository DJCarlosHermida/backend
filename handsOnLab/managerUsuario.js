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

            newUser.contraseña = crypto.createHmac('sha256')






            users.push(newUser)
            await fs.promises.writeFile(path, JSON.stringify(users))
            return (newUser)

        } catch (error) {
            console.log(error);
        }
    }

    validarUsuario = async () => {

    }
    #generarId(array) {
        if (array === 0) {
            id = 1
        } else {
            id = array[array.length - 1].id + 1
        }
    }
}