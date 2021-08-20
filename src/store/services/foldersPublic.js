import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class FoldersPublic extends BaseModel {
  static modelName = 'FoldersPublic'
  static instanceDefaults () {
    return {
    }
  }
}
const servicePath = 'folders-public'
const servicePlugin = makeServicePlugin({
  Model: FoldersPublic,
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
