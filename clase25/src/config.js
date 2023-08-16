import dotenv from 'dotenv'
import  program  from './commander.js'

const mode = program.opts().mode

dotenv.config({
    path: mode === 'stage' ? '.env.stage' : '.env.development'
})

export default {
    PORT: process.env.PORT,
    TOKKEN: process.env.TOKKEN
}