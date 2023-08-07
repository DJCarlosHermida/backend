import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKeyJWT = 'secretJWT'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashData = async (data) => {
    return bcrypt.hash(data, 10)
}

export const compareData = async (data, dataDB) => {
    return bcrypt.compare(data, dataDB)
}

export const generateToken = (user) => {
    const token = jwt.sign(user, secretKeyJWT, { expiresIn: '1h' })
    return token
}