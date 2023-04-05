//const http = require('http')

import http from 'http' 

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end ('Saludos desde BACKEND')
})

server.listen(8080, ()=> {
    console.log('Listening to 8080 port');
})
