import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class GuildsPublic extends BaseModel {
  // constructor (data, options) {
  //   super(data, options)
  // }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'GuildsPublic'
  // Define default properties here
  static instanceDefaults () {
    return {

    }
  }
}
const servicePath = 'guilds-public'
const servicePlugin = makeServicePlugin({
  Model: GuildsPublic,
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
