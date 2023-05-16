import express from "express";
import routers from "./src/router/index.router.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded( {extended: true}) )


// Routers

app.use("/api/", routers)

app.get('/', async (req, res) => {
  const random = Math.floor(Math.random() * 16 )
  res.json({random})
})

app.listen(8080, () => {
    console.log('Listening to 8080 Port');
})