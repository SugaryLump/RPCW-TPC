var fs = require('fs')

exports.mainPage = (res, tasks) => {
    fs.readFile("public/toDo.html", (err, data) => {
        if(err){
            console.log('File not found: ' + err)
            res.writeHead(404, {"Content-Type": 'plain-text'})
            res.end('File not found: ' + err)
        }
        else {
            var taskFormString = `<form id="task-form" method="post">
    <p class="small-text">Description</p>
    <div 
        contenteditable
        placeholder="Description"
        class="text-block input"
        id="text-form-description">
    </div>
    <input type="hidden" name="description">
    <div id="task-form-field-row">
        <input class="input" placeholder="Assigned To" name="assigned">
        <input class="input" type=date placeholder="Due Date" name="date">
    </div>
    <button class="add-button" type="submit" onclick="getDivValue()">Add</button>
    <script>
        function getDivValue() {
            document.getElementById("description-hidden").value = document.getElementById("text-form-description").innerHTML;
            console.log("a" + document.getElementById("text-form-description").innerHTML)
        }
    </script>
</form>`
            //var pendingTasksString = `<form id="task-form`
            console.log("Serving toDo.html")
            res.writeHead(200, {"Content-Type": 'text/html charset=utf-8'})
            res.end(eval('`' + data + '`'))
        }
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
            if(file == 'my.css'){
                console.log(`Serving ${file} as CSS`)
                res.writeHead(200, 'Content-Type', 'text/css')
                res.end(data)
            }
            // PNG images
            else{
                console.log(`Serving ${file} as image`)
                res.writeHead(200, 'Content-Type', 'image/png')
                res.end(data)
            }    
        }
    })
}