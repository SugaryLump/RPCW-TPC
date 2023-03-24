var express = require('express');
var router = express.Router();
var axios = require('axios');
var url = require('url')
var Task = require('../controllers/task')
const { ObjectId } = require('bson')


/* GET home page. */
router.get('/:taskID?', function(req, res, next) {
  var parsedURL = url.parse(req.url, true)

  Task.list()
  .then(allTasks => {
    Task.getTask(req.params.taskID)
    .then(edit => {
        switch (parsedURL.query._method) {
            case "COMPLETE": {
                Task.getTask(parsedURL.query.id)
                .then(task => {
                    task.completed = "true"
                    Task.editTask(task)
                    .then(t => {
                        res.writeHead(302, {'Location':'/'})
                        res.end()
                    })
                })
                break
            }
            case "DELETE": {
                Task.deleteTask(parsedURL.query.id)
                .then(d => {
                    res.writeHead(302, {'Location':'/'})
                    res.end()
                })
                break
            }
            case "UNDO": {
                Task.getTask(parsedURL.query.id)
                .then(task => {
                    task.completed = "false"
                    Task.editTask(task)
                    .then(e => {
                        res.writeHead(302, {'Location':'/'})
                        res.end()
                    })
                })
                break
            }
            default: {
                if (edit == undefined) {
                res.render('add', {tasks: allTasks})
                }
                else {
                res.render('edit', {tasks: allTasks, edit: edit})
                }
            }
        }
    })
  })
  .catch(err => {
    console.log(String(err))
  })
})

router.post('/:taskID?', function(req, res, next) {
    var task = req.body
    
    if (req.params.taskID != undefined) {
        task._id = new ObjectId(req.params.taskID)
        Task.editTask(task)
    }
    else {
        Task.addTask(task)
    }
    res.writeHead(302, {'Location':'/'})
    res.end()
})

module.exports = router;
