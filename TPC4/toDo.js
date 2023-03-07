var http = require('http')
var url = require('url')
var serve = require('./serve.js')
var static = require('./static.js')

var port = 7777

var tasks = { }

http.createServer((req, res) => {
    if (static.isStaticResource(req)) {
        serve.staticResource(req, res)
    }
    switch (req.method) {
        default: {
            serve.mainPage(res, tasks)
        }
    }
}).listen(port)

console.log(`Listening on port ${port}`)