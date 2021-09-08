import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class CommentsPrivate extends BaseModel {
  static modelName = 'CommentsPrivate'
  static instanceDefaults () {
    return {
    }
  }
}
const servicePath = 'comments-private'
const servicePlugin = makeServicePlugin({
  Model: CommentsPrivate,
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
