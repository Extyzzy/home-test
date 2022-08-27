const { InvalidPropertyError } = require ('../helpers/errors')
const requiredParam = require ('../helpers/required-param')

function makeTask (
  contactInfo = requiredParam('taskInfo')
) {
  const validTask = validate(contactInfo)
  const normalTask = normalize(validTask)
  return Object.freeze(normalTask)

  function validate ({
                       name = requiredParam('name'),
                       start = requiredParam('start'),
                       due = requiredParam('due'),
                       done = requiredParam('done'),
                       status = requiredParam('status'),
                       ...otherInfo
                     } = {}) {
    validateName('name', name)
    return {
      name,
      start,
      due,
      done,
      status,
      ...otherInfo
    }
  }

  function validateName (label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `A task ${label} name must be at least 2 characters long.`
      )
    }
  }

  function normalize ({ name, start, due, done, status, ...otherInfo }) {
    return {
      ...otherInfo,
      name: name,
      start: start,
      due: due,
      done: done,
      status: status
    }
  }
}

module.exports = makeTask;