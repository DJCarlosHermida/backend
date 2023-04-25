//const http = require('http')
import http from 'http' 

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end ('<h3>gretting from backend</h3>')

})

server.listen(8080, ()=> {
    console.log('Listening to 8080 port HTTP');
})
