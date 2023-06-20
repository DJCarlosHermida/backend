 import fs from 'fs'

 export class UserManager  {
    constructor( path ) {
        this.path = path
    }

    findUsers = async() => {
        if (fs.existsSync(this.path)){
            const usuariosFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(usuariosFile)
        } else {
            return []
        }
    }

    createUser = async (user) => {
        const usersFile = await this.findUsers()
        usersFile.push(user)
        await fs.promises.writeFile(this.path,JSON.stringify(usersFile))

    }

 }