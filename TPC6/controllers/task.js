var Task = require('../models/tasks')
const { ObjectId } = require('bson')


module.exports.list = () => {
    return Task.taskModel.find()
    .then(docs => {
        return docs
    })
    .catch(err => {
        return err
    })
}

module.exports.addTask = task => {
    return Task.taskModel.create(task)
    .then(doc => {
        return doc
    })
    .catch(err => {
        return err
    })
}

module.exports.getTask = id => {
    return Task.taskModel.findOne({_id:new ObjectId(id)})
    .then (doc => {
        return doc
    })
    .catch(err => {
        return err
    })
}

module.exports.editTask = task => {
    return Task.taskModel.updateOne({_id: task._id}, task)
    .then(doc => {
        return doc
    })
    .catch(err => {
        return err
    })
}

module.exports.deleteTask = id => {
    return Task.taskModel.deleteOne({_id:new ObjectId(id)})
    .then(doc => {
        return doc
    })
    .catch(err => {
        return err
    })
}