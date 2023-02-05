var fs = require('fs')

exports.generate = (res, err) => {
    fs.readFile("error.html", (error, data) => {
        if (!error) {
            res.end(eval("`" + data + "`"))
        }
        else {
            console.log(String(error))
            res.end("Can't find error page. Something went really wrong.")
        }
    })
}