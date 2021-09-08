import feathersClient, { makeServicePlugin, BaseModel } from '../../boot/feathers-client'

class CommentsPublic extends BaseModel {
  static modelName = 'CommentsPublic'
  static instanceDefaults () {
    return {
    }
  }
}
const servicePath = 'comments-public'
const servicePlugin = makeServicePlugin({
  Model: CommentsPublic,
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
