import mongoose from 'mongoose'
import config from '../config.js'

const URI = config.mongo_uri

mongoose.connect(URI)
.then(() => console.log(`Connected to the Databases`))
.catch(error => console.log(error))