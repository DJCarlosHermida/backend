import mongoose, { Error } from 'mongoose'
import config from '../../config.js'

const URI = config.mongo_URI

mongoose.connect(URI)
.then(()=> console.log('Connected to the databases'))
.catch(error => console.log(error))
 