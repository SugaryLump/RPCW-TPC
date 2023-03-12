var http = require('http')
var url = require('url')
var serve = require('./serve.js')
var static = require('./static.js')
var axios = require("axios")

var port = 7777
var dbURL = "http://localhost:3000/tasks"

var tasks = { }

http.createServer((req, res) => {
    var parsedURL = url.parse(req.url, true);

    if (static.isStaticResource(req)) {
        serve.staticResource(req, res)
    }
    else {
        console.log(`Method is ${req.method}`)
        switch (req.method) {
            default: {
                console.log(String(req))
                axios.get(dbURL)
                .then(axiosRes => {
                    serve.mainPage(res, axiosRes.data)
                })
                .catch(axiosErr => {
                    console.log(`Axios error: ${axiosErr}`)
                    res.end(String(axiosErr))
                })
            }
        }
    }
}).listen(port)

console.log(`Listening on port ${port}`)