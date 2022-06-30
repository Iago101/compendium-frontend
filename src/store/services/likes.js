import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class Likes extends BaseModel {
  // constructor (data, options) {
  //   super(data, options)
  // }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Likes'
  // Define default properties here
  static instanceDefaults () {
    return {

    }
  }
}
const servicePath = 'likes'
const servicePlugin = makeServicePlugin({
  Model: Likes,
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
