var express = require('express');
var router = express.Router();
var axios = require('axios');
var url = require('url')

var dbURL = "http://localhost:3000/tasks"

/* GET home page. */
router.get('/:taskID?', function(req, res, next) {
  var parsedURL = url.parse(req.url, true)


  axios.get(dbURL)
  .then(axiosRes => {
    var edit = undefined;
    if (req.params.taskID != undefined && parseInt(req.params.taskID)) {
      edit = axiosRes.data.find(task => task.id == parsedURL.pathname.slice(1))
      console.dir(edit)
    }

    switch (parsedURL.query._method) {
        case "COMPLETE": {
            var task = axiosRes.data.find(task => task.id == parsedURL.query.id)
            task.completed = "true"
            axios.put(dbURL + `/${parsedURL.query.id}`, task)
            .then(axiosPutRes => {
                console.log(`Completed task ${parsedURL.query.id}`)
            })
            .catch(axiosPutErr => {
                console.log(`Axios DELETE error: ${axiosPutErr}`)
            })
            res.writeHead(302, {'Location':'/'})
            res.end()
            break
        }
        case "DELETE": {
            axios.delete(dbURL + `/${parsedURL.query.id}`, )
            .then(axiosDeleteRes => {
                console.log(`Deleted task ${parsedURL.query.id}`)
            })
            .catch(axiosDeleteErr => {
                console.log(`Axios DELETE error: ${axiosDeleteErr}`)
            })
            res.writeHead(302, {'Location':'/'})
            res.end()
            break
        }
        case "UNDO": {
            var task = axiosRes.data.find(task => task.id == parsedURL.query.id)
            task.completed = "false"
            axios.put(dbURL + `/${parsedURL.query.id}`, task)
            .then(axiosPutRes => {
                console.log(`Undid task ${parsedURL.query.id}`)
            })
            .catch(axiosPutErr => {
                console.log(`Axios UNDO error: ${axiosPutErr}`)
            })
            res.writeHead(302, {'Location':'/'})
            res.end()
            break
        }
        default: {
            if (edit == undefined) {
              res.render('add', {tasks: axiosRes.data})
            }
            else {
              res.render('edit', {tasks: axiosRes.data, edit: edit})
            }
        }
    }
  })
  .catch(axiosErr => {
    console.log(`Axios GET error: ${axiosErr}`)
  })
})

router.post('/:taskID?', function(req, res, next) {
    task = req.body
    axios.get(dbURL)
    .then(axiosRes => {
        if (req.params.taskID != undefined && parseInt(req.params.taskID) <= axiosRes.data.length) {
            axios.put(dbURL + `/${parseInt(req.params.taskID)}`, task)
            .then(axiosPutRes => {
                console.log("Put response: " + axiosPutRes.status)
            })
            .catch(axiosPutErr => {
                console.log(`Axios PUT error: ${axiosPutErr}`)
            })
        }
        else {
            axios.post(dbURL, task, {headers: {'Content-Type': 'application/json'}})
            .then(axiosPostRes => {
                console.log("Post response: " + axiosPostRes.status)
            })
            .catch(axiosPostErr => {
                console.log(`Axios POST error: ${axiosPostErr}`)
            })
        }
        res.writeHead(302, {'Location':'/'})
        res.end()
    })
    .catch(axiosErr => {
        console.log(`Axios error: ${axiosErr}`)
    })
})

module.exports = router;
