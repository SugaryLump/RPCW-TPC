import lxml
from bs4 import BeautifulSoup as bs
import os

index = open('index.html', 'w+', encoding='utf-8')
index.write(f"""<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title>Índice</title>
    </head>
    <body>
        <div style="padding-left:5%">
            <h1>Índice</h1>
""")

for path in os.listdir(os.getcwd()):
    bs_data = None
    if path.split('.')[-1] == 'xml':
        with open(path, 'r', encoding='utf-8') as file:
            bs_data = bs("".join(file.readlines()), features='xml')
        with open(path.split('.')[0] + '.html', 'w+', encoding='utf-8') as file:
            file.write(f"""<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title>{path}</title>
    </head>
    <body>
""")
            file.write(bs_data.prettify())
            file.write("""
    </body>
</html>
""")
        index.write(f"\t\t\t<p><address><a href=\"{path.split('.')[0] + '.html'}\">{path}</a></address></p>")


index.write("""
        </div>
    </body>
</html>
""")
index.close()