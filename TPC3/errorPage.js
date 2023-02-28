exports.generate = err => {
    return `<!DOCTYPE html>
<html>
    <title>Error</title
    <meta charset="utf-8"/>
    <link rel="stylesheet" type="text/css" href="w3.css">
    <body>
        <header class="w3-header w3-teal">
            <h3><a href="/" style="text-decoration:none">PeoplePage</a></h1>
        </header>
        <div class="w3-page-content">
            <div class="w3-panel w3-pale-red">
                <p>${String(err)}</p>
            </div>
        </div>
        <footer class="w3-footer w3-teal">
            <h5>PeoplePage</h5>
            <p style="font-size:75%">Created for <b>Representation and Processing of Knowledge on the Web</b> course by 
            <a href="https://github.com/SugaryLump/RPCW-TPC"><u>Alexandre Flores</u></a>, PG50165.</p>
        </footer> 
    </body>
</html>`
}