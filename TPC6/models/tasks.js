const { ObjectId } = require('bson')
var mongoose = require('mongoose')

var taskSchema = new mongoose.Schema({
    description: String,
    assigned: String,
    date: String,
    completed: String
})

module.exports.taskModel = mongoose.model('task', taskSchema)