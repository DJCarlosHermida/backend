import { program } from 'commander'

program
.option('-m, --mode <mode>', 'Ambient', 'Development')
.option('-d, --debug', 'Variable Modo Debug', false)
.option('-p, --port', 'PORT of server', 3000)
.parse(process.argv)

console.log(process.argv);
console.log(program.opts());
//console.log(program.args);