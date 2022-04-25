<template>
    <q-page class="row bg-indigo-2">
        <div class="col-2">
          <navigation-menu />
        </div>

        <div v-if="userData" class="col-10 row">
            <div class="col-12">
              <q-card >

                <div class="text-h1 text-blue text-center q-my-lg">
                  Criações de {{userData.name}}
                </div>

                <div v-if="guild" class="text-h2 text-green text-center q-my-lg">
                  <div class="text-black">
                    Membro de
                  </div>
                  {{guild.name}}
                </div>

              </q-card>
            </div>

            <div class="col-12 row justify-around">
              <div class="col-6 col-sm-3 q-ma-sm" v-for="idea in ideas.data" :key="idea._id">
                <idea-card :idea="idea"/>
              </div>
            </div>

        </div>
    </q-page>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
export default {

  data () {
    return {
      userData: null,
      guild: null
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }

    this.userData = await this.$store.dispatch('users/get', [this.$route.params.id])
    this.load()
    this.guild = await this.$store.dispatch('guilds-private/get', [this.userData.guildId])
  },

  components: {
    NavigationMenu: () => import('../components/NavigationMenu.vue'),
    IdeaCard: () => import('../components/IdeaCard')

  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicFind: 'find',
      publicGet: 'get'
    }),
    ...mapGetters('ideas-private', {
      privateFind: 'find',
      privateGet: 'get'
    }),

    ideas () {
      if (this.isAuthenticated) {
        return this.privateFind({ query: { userId: this.userData._id } })
      }
      return this.publicFind({ query: { userId: this.userData._id } })
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-public', {
      publicFindAction: 'find'
    }),
    ...mapActions('ideas-private', {
      privateFindAction: 'find'
    }),

    async load () {
      try {
        if (this.isAuthenticated) {
          this.privateFindAction({ query: { userId: this.userData._id } })
          return
        }
        this.publicFindAction({ query: { userId: this.userData._id } })
      } catch {
      }
    }
  }
}
</script>
