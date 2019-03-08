const http = require('http');
const url = require('url');
const PORT = 3003
const ip = '127.0.0.1'

const server = http.createServer((req, res) => {

})


console.log('server listening on PORT', PORT)
server.listen(PORT, ip)
