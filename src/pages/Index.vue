
<template>
  <q-page>
    <!-- <pre>{{ip}}</pre> -->
    <hr>
    <!-- <pre>{{aux}}</pre>
    <input v-model="aux.title" v-if="aux">
    <button @click="submit"> teste </button> -->
    <hr>
    <!-- <pre>{{gui}}</pre>
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    <pre>{{use}}</pre>         lista de users filtrada        -->

  </q-page>
</template>

<script>
// import feathersClient from '../boot/feathers-client'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',

  async created () {
    // get localhost:3030/ideas-private
    // this.ip = await feathersClient.service('ideas-public').find()
    // this.ip = await this.list()
    await this.list()
    // this.aux = JSON.parse(JSON.stringify(this.ip2))
    // this.$store.dispatch('ideas-public/get', [this.id])
    // this.$store.dispatch('guilds-public/find')
    // this.$store.dispatch('users-public/find')
  },

  data () {
    return {
      id: '6081ecfc0d64c343947e3cd5',
      aux: null,
      email: '',
      password: ''
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', ['list', 'get']),
    ...mapGetters('ideas-private', {
      privateList: 'list',
      privateGet: 'get'
    }),
    ip () {
      if (this.isAuthenticated) { return this.list }

      return this.privatelist
    },
    ip2 () {
      return this.$store.getters['ideas-private/list']
    },
    // ip2 () {
    //   return this.get(this.id)
    // },

    gui () {
      return this.$store.getters['guilds-public/list']
    },

    use () {
      return this.$store.getters['users-public/list']
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-public', ['patch']),
    ...mapActions('ideas-private', {

    }),
    submit () {
      this.patch([this.ip2._id, { title: this.aux.title }])
    },

    login () {
      this.authenticate({
        email: this.email,
        password: this.password,
        strategy: 'local'
      })
    }
  }
}
</script>
