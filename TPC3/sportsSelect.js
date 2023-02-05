var fs = require('fs')

exports.generate = (res, people, data) => {
    var sports = new Set()
    people.forEach(person => {
        person.desportos.forEach(sport => {
            sports.add(sport)
        })
    })

    var sportsString=''
    Array.from(sports).sort().forEach(sport => {
        sportsString += `<li><a href="sports?sport=${sport}">${sport}</a></li>\n`
    })

    res.end(eval("`" + data + "`"))
}