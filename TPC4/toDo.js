var http = require('http')
var url = require('url')
var serve = require('./serve.js')
var static = require('./static.js')
var axios = require("axios")
const { parse } = require('querystring')

var port = 7777
var dbURL = "http://localhost:3000/tasks"

var tasks = { }

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

http.createServer((req, res) => {
    var parsedURL = url.parse(req.url, true);

    if (static.isStaticResource(req)) {
        serve.staticResource(req, res)
    }
    else {
        console.log(`Method is ${req.method}`)
        switch (req.method) {
            case "POST": {
                axios.get(dbURL)
                .then(axiosRes => {
                    collectRequestBodyData(req, task => {
                        if (parseInt(parsedURL.pathname.slice(1)) != NaN && parseInt(parsedURL.pathname.slice(1)) <= axiosRes.data.length) {
                            axios.put(dbURL + `/${parseInt(parsedURL.pathname.slice(1))}`, task)
                            .then(axiosPutRes => {
                                console.log("Put response: " + axiosPutRes.status)
                                res.writeHead(302, {'Location':'/'})
                                res.end()
                            })
                            .catch(axiosPutErr => {
                                console.log(`Axios PUT error: ${axiosPutErr}`)
                            })
                        }
                        else {
                            axios.post(dbURL, task, {headers: {'Content-Type': 'application/json'}})
                            .then(axiosPostRes => {
                                console.log("Post response: " + axiosPostRes.status)
                                res.writeHead(302, {'Location':'/'})
                                res.end()
                            })
                            .catch(axiosPostErr => {
                                console.log(`Axios POST error: ${axiosPostErr}`)
                            })
                        }
                    })
                })
                .catch(axiosErr => {
                    console.log(`Axios error: ${axiosErr}`)
                })
                break;
            }
            default: {
                axios.get(dbURL)
                .then(axiosRes => {
                    var edit = null;
                    if (parseInt(parsedURL.pathname.slice(1)) != NaN && parseInt(parsedURL.pathname.slice(1)) <= axiosRes.data.length) {
                        edit = axiosRes.data.find(task => task.id == parsedURL.pathname.slice(1))
                        console.dir(edit)
                    }

                    switch (parsedURL.query._method) {
                        case "COMPLETE": {
                            var task = axiosRes.data.find(task => task.id == parsedURL.query.id)
                            task.completed = "true"
                            axios.put(dbURL + `/${parsedURL.query.id}`, task)
                            .then(axiosPutRes => {
                                console.log(`Completed task ${parsedURL.query.id}`)
                                res.writeHead(302, {'Location':'/'})
                                    res.end()
                            })
                            .catch(axiosPutErr => {
                                console.log(`Axios DELETE error: ${axiosPutErr}`)
                            })
                            break
                        }
                        case "DELETE": {
                            axios.delete(dbURL + `/${parsedURL.query.id}`, )
                            .then(axiosDeleteRes => {
                                console.log(`Deleted task ${parsedURL.query.id}`)
                                res.writeHead(302, {'Location':'/'})
                                res.end()
                            })
                            .catch(axiosDeleteErr => {
                                console.log(`Axios DELETE error: ${axiosDeleteErr}`)
                            })
                            break
                        }
                        case "UNDO": {
                            var task = axiosRes.data.find(task => task.id == parsedURL.query.id)
                            task.completed = "false"
                            axios.put(dbURL + `/${parsedURL.query.id}`, task)
                            .then(axiosPutRes => {
                                console.log(`Undid task ${parsedURL.query.id}`)
                                axios.get(dbURL)
                                res.writeHead(302, {'Location':'/'})
                                res.end()
                            })
                            .catch(axiosPutErr => {
                                console.log(`Axios DELETE error: ${axiosPutErr}`)
                            })
                            break
                        }
                        default: {
                            serve.mainPage(res, axiosRes.data, edit)
                        }
                    }
                })
                .catch(axiosErr => {
                    console.log(`Axios GET error 1: ${axiosErr}`)
                })
            }
        }
    }
}).listen(port)

console.log(`Listening on port ${port}`)