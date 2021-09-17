import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class GuildsPrivate extends BaseModel {
  static modelName = 'GuildsPrivate'
  static instanceDefaults () {
    return {
    }
  }
}
const servicePath = 'guilds-private'
const servicePlugin = makeServicePlugin({
  Model: GuildsPrivate,
  service: feathersClient.service(servicePath),
  servicePath
})

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
