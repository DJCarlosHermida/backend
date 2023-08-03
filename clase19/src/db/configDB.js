import mongoose from 'mongoose'

const URI = 'mongodb+srv://coderhouse:coderhouse@cluster0.sugvijj.mongodb.net/sessionMongo51125?retryWrites=true&w=majority'

mongoose
  .connect(URI)
  .then(() => console.log('Connected to the Databases'))
  .catch((error) => console.log(error))
