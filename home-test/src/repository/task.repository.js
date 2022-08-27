const { connect, close } = require('../config/db.config');
const logger = require('../logger/api.logger');
const makeTask = require('./task');
const moment = require('moment')

class TaskRepository {

  //here we get filter from params
  async getTasks({ name, status, start, due, done, max = 100} = {}) {

    const db = await connect()

    const query = {}

    if (name) {
      query.name = `/${name}/`
    }

    if (status) {
      query.status = status
    }

    const data = await db
      .collection('tasks')
      //search by name and status
      .find(query)
      //sort by date
      .sort({
        start: start,
        due: due,
        done: done
      })
      //limit of amount which we can get
      .limit(Number(max))

    let tasks = [];

    await data.forEach(function(doc, err) {
      tasks.push(doc)
    })

    return tasks
  }

  async createTask(task) {
    const {
      name
    } = task;

    const db = await connect()

    //here I set up the task with inital values
    const newTask = {
      name: name,
      start: moment().format('YYYY-MM-DD'),
      due: null,
      done: null,
      status: 'to-do',
    }

    try {
      //here I insert the task in collections
      await db.collection('tasks').insertOne(newTask);
    } catch(err) {
      logger.error('Error::' + err);
    }

    return newTask;
  }

  async updateTask(task) {
    const updatedTask = makeTask({ id: task._id, ...task })

    const db = await connect();
    const id = db.makeId(task.id)

    try {
      //here I update specific task by id from collection
      const res = await db.collection('tasks').updateOne({"_id": id}, {$set: updatedTask})

      return res;
    } catch(err) {
      logger.error('Error::' + err);
    }

  }

  async deleteTask(taskId) {
    const db = await connect();
    const id = db.makeId(taskId)

    try {
      //here I delete specific task by id from collection
      const res = await db.collection('tasks').deleteOne({"_id": id})

      return res
    } catch(err) {
      logger.error('Error::' + err);

      return "Sorry this task does not exist"
    }
  }

}

module.exports = new TaskRepository();