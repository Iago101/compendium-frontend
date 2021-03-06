import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class Feedback extends BaseModel {
  static modelName = 'Feedback'
  static instanceDefaults () {
    return {

    }
  }
}
const servicePath = 'feedback'
const servicePlugin = makeServicePlugin({
  Model: Feedback,
  service: feathersClient.service(servicePath),
  servicePath
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin
