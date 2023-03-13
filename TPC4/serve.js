var fs = require('fs')

exports.mainPage = (res, tasks, edit) => {
    fs.readFile("public/toDo.html", (err, data) => {
        if(err){
            console.log('File not found: ' + err)
            res.writeHead(404, {"Content-Type": 'plain-text'})
            res.end('File not found: ' + err)
        }
        else {
            if (edit == null) {
                var taskFormString = `
    <form id="task-form" method="post">
        <p class="small-text">Description</p>
        <div 
            contenteditable
            placeholder="Description"
            class="text-block input"
            id="text-form-description"></div>
        <input id="description-hidden" type="hidden" name="description">
        <input type="hidden" name="completed" value=false>
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
    </form>
`
            }
            else {
                console.log("Doing editing routine")
                var taskFormString = `
    <form id="task-form" method="post">
        <p class="small-text">Description</p>
        <div 
            contenteditable
            placeholder="Description"
            class="text-block input"
            id="text-form-description">${edit.description}</div>
        <input id="description-hidden" type="hidden" name="description">
        <input type="hidden" name="completed" value=${edit.completed}>
        <input type="hidden" name="id" value=${edit.id}>
        <div id="task-form-field-row">
            <input class="input" placeholder="Assigned To" name="assigned" value="${edit.assigned}">
            <input class="input" type=date placeholder="Due Date" name="date" value="${edit.date}">
        </div>
        <div id="edit-button-row">
            <a class="add-button" href="/">Cancel</a>
            <button class="add-button" type="submit" onclick="getDivValue()">Edit</button>
            <script>
                function getDivValue() {
                    document.getElementById("description-hidden").value = document.getElementById("text-form-description").innerHTML;
                    console.log("a" + document.getElementById("text-form-description").innerHTML)
                }
            </script>
        </div>
    </form>
`
            }
            var pendingTasksString = ""
            tasks.forEach(task => {
                if (task.completed == "false") {
                    pendingTasksString += `
    <div class="task-card">
        <div class="task-card-button-row">
            <form method="get">
                <input type="hidden" name="_method" value="COMPLETE">
                <input type="hidden" name="id" value="${task.id}">
                <button class="icon-button" type="submit"><i class="fas fa-check icon-button green-hover"></i></button>
            </form>
            <a href="/${task.id}"><i class="fa fa-file icon-button yellow-hover"></i></a>
            <form method="get">
                <input type="hidden" name="_method" value="DELETE">
                <input type="hidden" name="id" value="${task.id}">
                <button class="icon-button" type="submit"><i class="fas fa-times icon-button red-hover"></i></i></button>
            </form>
        </div>
        <p>${task.description}</p>
        <div class="task-card-field-row">
            <p><b>${task.assigned}</b></p>
            <p><b>${task.date}</b></p>
        </div>
    </div>
`
            }})

            var completeTasksString = ""
            tasks.forEach(task => {
                if (task.completed == "true") {
                    completeTasksString += `
    <div class="task-card-done">
        <div class="task-card-button-row">
            <form method="get">
                <input type="hidden" name="_method" value="UNDO">
                <input type="hidden" name="id" value="${task.id}">
                <button class="icon-button" type="submit"><i class="fas fa-undo icon-button yellow-hover"></i></button>
            </form>
            <a href="/${task.id}"><i class="fa fa-file icon-button yellow-hover"></i></a>
            <form method="get">
                <input type="hidden" name="_method" value="DELETE">
                <input type="hidden" name="id" value="${task.id}">
                <button class="icon-button" type="submit"><i class="fas fa-times icon-button red-hover"></i></i></button>
            </form>
        </div>
        <p>${task.description}</p>
        <div class="task-card-field-row">
            <p><b>${task.assigned}</b></p>
            <p><b>${task.date}</b></p>
        </div>
    </div>                
`
            }})

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