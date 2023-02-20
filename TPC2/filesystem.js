var http = require('http')
var url = require('url')
var fs = require('fs')
var port = 7777

http.createServer(function (req, res) {
    path = url.parse(req.url).pathname.substring(1, 64)
    console.log("Got request for \'" + path + "\'")

    if(path == "") {
        console.log("Redirecting to \'index.html\'")
        res.writeHead(302, {'Location':'index.html'})
        res.end()
    }
    else {
        fs.readFile(path, function(err, data) {
            if (err) {
                console.log("Couldn't resolve request for " + path)
                console.log(String(err))
                res.writeHead(200, {"Content-Type":"text/plain; charset=utf-8"})
                res.write(String(err))
                res.end()
            }
            else {
                console.log("Serving " + path)
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                res.write(data)
                res.end()
            }
        })
    }
}).listen(port)

console.log("Listening on port " + port)