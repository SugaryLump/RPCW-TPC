var fs = require('fs')
var http = require('http')
var url = require('url')
var axios = require('axios')

var errorPage    = require('./errorPage.js')
var tablePage    = require('./tablePage.js')
var sportSelect  = require('./sportsSelect.js')
var jobsSelect  = require('./jobsSelect.js')
var person = require('./person.js')

//var sexPage      = require('./sexPage.js')
//var jobPage      = require('./jobPage.js')
//var sportsPage   = require('./sportsPage.js')

var port = 7777

http.createServer((req, res) => {
    var parsedURL = url.parse(req.url, true)
    
    if (parsedURL.pathname == "/") {
        console.log("Redirecting to \'index\'")
        res.writeHead(302, {'Location':'index'})
        res.end()
    }









    else if (parsedURL.pathname == "/my.css") {
        fs.readFile("my.css", (err, data) => {
            if (err) {
                console.log(`Error reading my.css: ${String(err)}`)
                res.writeHead(200, {"Content-Type": "plain/text; charset=utf-8"})
                res.end("Something went really wrong.")
            }
            else {
                res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"})
                res.end(data)
            }
        })
    }








    else if (parsedURL.pathname == "/index") {
        axios.get("http://localhost:3000/pessoas")
            .then(axiosRes => {
                console.log(`Got ${axiosRes.data.length} entries`)



                fs.readFile("index.html", (err, data) => {
                    if (err) {
                        console.log(`Error reading index.html: ${String(err)}`)
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        errorPage.generate(res, err)
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        tablePage.generate(res, axiosRes.data, data)
                    }
                })
            })
            .catch(err => {
                console.log(`Axios error: ${err}`)
                errorPage.generate(res, err)
            })
    }







    else if (parsedURL.pathname == '/sex') {                
        if (parsedURL.query.s) {
            axios.get(`http://localhost:3000/pessoas?sexo=${parsedURL.query.s}`)
            .then(axiosRes => {
                console.log(`Got ${axiosRes.data.length} entries`)
                fs.readFile("sex.html", (err, data) => {
                    if (err) {
                        console.log(`Error reading sex.html: ${String(err)}`)
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        errorPage.generate(res, err)
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        tablePage.generate(res, axiosRes.data, data)
                    }
                })
            })
            .catch(error => {
                console.log(`Axios error: ${err}`)
                errorPage.generate(res, error)
            })
        }
        else {
            fs.readFile("sexSelect.html", (err, data) => {
                if (err) {
                    console.log(`Error reading sexSelect.html: ${String(err)}`)
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                    errorPage.generate(res, err)
                }
                else {
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                    res.end(data)
                }
            })
        }
    }








    else if (parsedURL.pathname == "/sports") {
        if (parsedURL.query.sport) {
            axios.get(`http://localhost:3000/pessoas?desporto=${parsedURL.query.sport}`)
            .then(axiosRes => {
                console.log(`Got ${axiosRes.data.length} entries`)
                filtered = new Array()
                axiosRes.data.forEach(person => {
                    if (person.desportos.includes(parsedURL.query.sport)) {
                        filtered.push(person)
                    }
                })
                fs.readFile("sports.html", (err, data) => {
                    if (err) {
                        console.log(`Error reading sports.html: ${String(err)}`)
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        errorPage.generate(res, err)
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        tablePage.generate(res, filtered, data)
                    }
                })
            })
            .catch(error => {
                console.log(`Axios error: ${err}`)
                errorPage.generate(res, error)
            })
        }
        else {
            axios.get(`http://localhost:3000/pessoas`)
            .then(axiosRes => {
                console.log(`Got ${axiosRes.data.length} entries`)
                fs.readFile("sportsSelect.html", (err, data) => {
                    if (err) {
                        console.log(`Error reading sportsSelect.html: ${String(err)}`)
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        errorPage.generate(res, err)
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        sportSelect.generate(res, axiosRes.data, data)
                    }
                })
            })
            .catch(error => {
                console.log(`Axios error: ${err}`)
                errorPage.generate(res, error)
            })
        }
    }











    else if (parsedURL.pathname == "/jobs") {
        if (parsedURL.query.job) {
            axios.get(`http://localhost:3000/pessoas?profissao=${parsedURL.query.job}`)
            .then(axiosRes => {
                console.log(`Got ${axiosRes.data.length} entries`)
                fs.readFile("jobs.html", (err, data) => {
                    if (err) {
                        console.log(`Error reading jobs.html: ${String(err)}`)
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        errorPage.generate(res, err)
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        tablePage.generate(res, axiosRes.data, data)
                    }
                })
            })
            .catch(error => {
                console.log(`Axios error: ${err}`)
                errorPage.generate(res, error)
            })
        }
        else {
            axios.get(`http://localhost:3000/pessoas`)
            .then(axiosRes => {
                console.log(`Got ${axiosRes.data.length} entries`)
                var jobsDict = { }
                axiosRes.data.forEach(person => {
                    if (person.profissao in jobsDict) {
                        jobsDict[person.profissao] = jobsDict[person.profissao] + 1
                    }
                    else {
                        jobsDict[person.profissao] = 1
                    }
                })
                sortedJobs = Object.entries(jobsDict).sort(
                    ([j1, t1], [j2, t2]) => (t1 < t2) ? 1 : -1 
                )
                sortedJobs = sortedJobs.slice(0, 10);
                console.log("Result: " + String(sortedJobs) + " at " + sortedJobs.length)

                fs.readFile("jobsSelect.html", (err, data) => {
                    if (err) {
                        console.log(`Error reading jobsSelect.html: ${String(err)}`)
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        errorPage.generate(res, err)
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        jobsSelect.generate(res, sortedJobs, data)
                    }
                })
            })
            .catch(error => {
                console.log(`Axios error: ${err}`)
                errorPage.generate(res, error)
            })
        }
    }







    else if (parsedURL.pathname == "/person" && parsedURL.query.id) {
        axios.get(`http://localhost:3000/pessoas?id=${parsedURL.query.id}`)
            .then(axiosRes => {
                console.log(`Got ${axiosRes.data.length} entry/entries`)
                fs.readFile("person.html", (err, data) => {
                    if (err) {
                        console.log(`Error reading person.html: ${String(err)}`)
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        errorPage.generate(res, err)
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                        person.generate(res, axiosRes.data[0], data)
                    }
                })
            })
            .catch(error => {
                console.log(`Axios error: ${err}`)
                errorPage.generate(res, error)
            })
    }










    else {
        console.log(`Unsupported operation (${parsedURL.path}).`)
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
        errorPage.generate(res, `Unsupported operation (${parsedURL.pathname}).`)
    }
}).listen(port)

console.log("Listening on " + port)