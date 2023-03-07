var fs = require('fs')

exports.mainPage = (res, tasks) => {
    fs.readFile("public/toDo.html", (err, data) => {
        res.writeHead(200, {"Content-Type": 'text/html charset=utf-8'})
        res.end(data)
    })
}

exports.staticResource = (req, res) => {
    var parts = req.url.split('/')
    var file = parts[parts.length -1 ]

    fs.readFile('public/' + file, (err, data)=>{
        if(err){
            console.log('File not found: ' + err)
            res.writeHead(404, {"Content-Type": 'plain-text'})
            res.end('File not found: ' + err)
        }
        else{
            // if(file == 'favicon.ico'){
            //     res.writeHead(200, 'Content-Type', 'image/x-icon')
            //     res.end(dados)
            // }
            if(file == 'w3.css'){
                res.writeHead(200, 'Content-Type', 'text/css')
                res.end(data)
            }
            // PNG images
            else{
                res.writeHead(200, 'Content-Type', 'image/png')
                res.end(data)
            }    
        }
    })
}