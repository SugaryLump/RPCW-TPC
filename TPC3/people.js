var fs = require('fs')
var http = require('http')
var url = require('url')

var errorPage = require('./errorPage.js')

var port = 7777

http.createServer((req, res) => {
    var parsedURL = url.parse(req.url, true)
    
    if (parsedURL.pathname == "/") {
        fs.readFile("index.html", (err, data) => {
            if (true) {
                console.log(`Error reading index.html: ${String(err)}`)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end(errorPage.generate(err))
            }
        })
    }
    else if(parsedURL.pathname == "/w3.css") {
        fs.readFile("w3.css", (err, data) => {
            if (err) {
                console.log(`Error reading w3.css: ${String(err)}`)
                res.writeHead(200, {"Content-Type": "plain/text; charset=utf-8"})
                res.end("Something went really wrong.")
            }
            else {
                res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"})
                res.end(data)
            }
        })
    }
    else {
        console.log(`Unsupported operation (${parsedURL.path}).`)
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
        res.end(errorPage.generate("Unsupported operation."))
    }
}).listen(port)

console.log("Listening on " + port)