
<template>
  <q-page class="bg-purple-2">
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <div class="row q-col-gutter-md" v-if="!isAuthenticated">
          <div class="col-6 col-sm-4"  v-for="idea in publicList" :key="idea._id">
            <IdeaCard :idea="idea" >
            </IdeaCard>
          </div>
        </div>

        <div class="row q-col-gutter-md" v-if="isAuthenticated">
          <div class="col-6 col-sm-4"  v-for="idea in privateList" :key="idea._id">
            <IdeaCard :idea="idea" >
            </IdeaCard>
          </div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  components: {
    IdeaCard: () => import('../components/IdeaCard')
  },

  watch: {
    isAuthenticated: {
      immediate: true,
      handler () {
        if (this.isAuthenticated) {
          this.find()
        } else {
          this.publicFind()
        }
      }
    }
  },

  async created () {
    // get localhost:3030/ideas-private
    // this.ip = await feathersClient.service('ideas-public').find()
    // this.ip = await this.list()
    try {
      await this.authenticate()
    } catch (error) {
    }
    console.log(this.isAuthenticated)

    // this.aux = JSON.parse(JSON.stringify(this.ip2))
    // this.$store.dispatch('ideas-public/get', [this.id])
    // this.$store.dispatch('guilds-public/find')
    // this.$store.dispatch('users-public/find')
  },

  data () {
    return {
      id: '',
      aux: null
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicList: 'list',
      publicGet: 'get'
    }),
    ...mapGetters('ideas-private', {
      privateList: 'list',
      privateGet: 'get'
    })
    // ip () {
    //   if (this.isAuthenticated) { return this.list }

    //   return this.privatelist
    // },
    // ip2 () {
    //   return this.$store.getters['ideas-private/list']
    // },
    // ip2 () {
    //   return this.get(this.id)
    // },

    // gui () {
    //   return this.$store.getters['guilds-public/list']
    // },

    // use () {
    //   return this.$store.getters['users-public/list']
    // }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-private', ['patch', 'find']),
    ...mapActions('ideas-public', {
      publicFind: 'find'
    }),
    submit () {
      this.patch([this.ip2._id, { title: this.aux.title }])
    }
  }
}
</script>
