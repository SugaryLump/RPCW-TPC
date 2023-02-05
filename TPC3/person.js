exports.generate = (res, person, data) => {
    var name = person.nome
    var sex = person.sexo
    var idType = person.BI? "BI" : "CC"
    var id = person.BI? person.BI : person.CC
    var age = person.age
    var address = person.morada.cidade
    var job = person.profissao
    var religion = person.religiao
    var party = person.partido_politico.party_name
    var sports = ''
    person.desportos.forEach(sport => {
        sports += sport + ', '
    })
    var animals = ''
    person.animais.forEach(animal => {
        animals += animal + ', '
    })
    var celebrities = ''
    person.animais.forEach(celeb => {
        celebrities += celeb + ', '
    })
    var brand = person.marca_carro
    var places = ''
    person.animais.forEach(place => {
        places += place + ', '
    })
    var tidbits = ''
    Object.entries(person.atributos).forEach(([tid, bit]) => {
        value = bit
        if (String(bit) == "true") {
            value = "yes"
        }
        else if (String(bit) == "false") {
            value = "no"
        }
        tidbits += '<li><b>' + tid + ': </b>' + value + '</li>\n'
    })
    res.end(eval("`" + data + "`"))
}