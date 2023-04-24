//const http = require('http')

import http from 'http' 

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end ('<h6>Gretting from backend</h6>')
})

server.listen(8080, ()=> {
    console.log('Listening to 8080 port');
})
