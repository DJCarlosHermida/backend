import jwt from 'jsonwebtoken'
import { generateToken } from '../utills.js'

const secretKeyJWT = 'secretJWT'
export const jwtValidation = (req, res, next) => {
const authHeader = req.get('Authorization')
const token = authHeader.split(' ')[1]
const verifiedUser = jwt.verify(token,secretKeyJWT)
if(verifiedUser){
    req.user = verifiedUser
    next()
}
}

//COOKIE
// export const jwtValidation = (req, res, next) => {
//   console.log(req.cookies)
//   const token = req.cookies.token
//   const verifiedUser = jwt.verify(token, secretKeyJWT)
//   if (verifiedUser) {
//     req.user = verifiedUser
//     next()
//   }
// }
