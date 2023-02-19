import json



json_file = open('mapa.json', encoding='utf-8')
data = json.load(json_file)

cities = { }
for c in data['cidades']:
    cities[c['id']] = c

links = { }
for l in data['ligações']:
    if l['origem'] not in links:
        links[l['origem']] = [ l ]
    else:
        links[l['origem']].append(l)

json_file.close()
html = open('mapa.html', 'w', encoding='utf-8')



html.write("""<!DOCTYPE html>
<html><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title>Mapa Virtual</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tbody><tr>
                <td width="30%" valign="top">
                    <h3>Índice</h3>
                    <a name="indice"/>
                    <!-- Lista com o índice -->
                    <ul>""")

for c in cities.values():
    html.write(f"""
                        <li>
                            <a href=\"#{c["id"]}\">{c["nome"]}</a>
                        </li>""")

html.write("""
                    </ul>
                    <a href="#c1">Macedo de Cavaleiros</a>
                </td>
                <td width="70%">
                    <!-- Informação das Cidades -->""")

for c in cities.values():
    html.write(f"""
                    <a name=\"{c["id"]}\">
                    <h3>{c["nome"]}</h3>
                    <p><b>população:</b> {c["população"]}</p>
                    <p><b>descrição:</b> {c["descrição"]}</p>
                    <p><b>distrito:</b> {c["distrito"]}</p>
                    <p><b>ligações:</b> """)
    if c['id'] in links:
        for l in links[c['id']]:
            html.write(f'{cities[l["destino"]]["nome"]} ({l["distância"]}m); ')
        html.write(f"""
                        <address>[<a href="#indice">Voltar ao índice</a>]</address>
                        <center>
                            <hr width="80%">
                        </center>
                        </a>""")

html.write("""
                </td>
            </tr>
        </tbody></table>
</body></html>""")