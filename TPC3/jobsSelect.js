var fs = require('fs')

exports.generate = (res, jobs, data) => {
    var jobsString=''
    jobs.forEach(job => {
        jobsString += `<li><a href="jobs?job=${job[0]}">${job[0]}</a></li>\n`
    })

    res.end(eval("`" + data + "`"))
}