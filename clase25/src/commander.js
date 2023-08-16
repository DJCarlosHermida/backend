import { program } from 'commander'
//import dotenv from 'dotenv'
//import config from './config'
program
.option('-m, --mode <mode>', 'Ambient', 'Development')
.option('-d, --debug', 'Variable Modo Debug', false)
.option('-p, --port', 'PORT of server', 3000)
.parse(process.argv) 

// console.log(process.argv);
// console.log(program.opts());
// console.log(config.PORT)

export default program