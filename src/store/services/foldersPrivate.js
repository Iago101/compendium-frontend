import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class FoldersPrivate extends BaseModel {
  static modelName = 'FoldersPrivate'
  static instanceDefaults () {
    return {
    }
  }
}
const servicePath = 'folders-private'
const servicePlugin = makeServicePlugin({
  Model: FoldersPrivate,
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
