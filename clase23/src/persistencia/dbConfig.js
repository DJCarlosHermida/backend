import mongoose from 'mongoose'

const URI = 'mongodb+srv://djcarloshermida:djmongodb@djcarloshermida.iiimagn.mongodb.net/routerDB?retryWrites=true&w=majority'

mongoose
    .connect(URI)
    .then(()=> console.log('Connected to the databases'))
    .catch((error) => console.log(error))