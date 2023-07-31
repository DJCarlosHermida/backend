import mongoose from 'mongoose'

const URI = 'mongodb+srv://djcarloshermida:djmongodb@djcarloshermida.iiimagn.mongodb.net/'

mongoose
    .connect(URI)
    .then(() => console.log('Connected to the database'))
    .catch((error) => console.log(error))

