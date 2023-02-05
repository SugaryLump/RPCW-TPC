var fs = require('fs')

exports.generate = (res, people, data) => {
    var tableString=''    
    people.forEach(person => {
        tableString += `
<tr onclick="window.location='/person?id=${person.id}'" style="cursor:pointer">
<td style="width:25%">${person.nome}</td>
<td style="width:10%">${person.sexo}</td>
<td style="width:30%">${person.profissao}</td>
<td style="width:35%">`
        person.desportos.forEach(sport => {
            tableString += `${sport}; `
        })
        tableString += `</td>
</tr>`
    })
    res.end(eval("`" + data + "`"))
}