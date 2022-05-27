<template>
    <q-page class="row texbg">

        <div class="col-2">
            <navigation-menu />
        </div>

        <div v-if="user.favoriteIdeas.length > 0" class="row justify-center col-10 q-mt-sm">
            <div class="col-6 col-sm-2" v-for="idea in ideas.data" :key="idea._id">
                <idea-card :idea="idea"/>
            </div>
        </div>

        <h2 v-if="!user.favoriteIdeas.length > 0" class="col-10 q-ma-auto text-indigo text-center">
            Nenhuma idéia favoritada, experimente favoritar algumas!
        </h2>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FavoritesPage',
  components: {
    IdeaCard: () => import('../components/IdeaCard'),
    NavigationMenu: () => import('../components/NavigationMenu.vue')
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-private', {
      privateFind: 'find',
      privateGet: 'get'
    }),

    ideas () {
      return this.privateFind({ query: { _id: { $in: this.user.favoriteIdeas } } })
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-private', {
      privateFindAction: 'find'
    }),

    async load () {
      try {
        this.privateFindAction({ query: { _id: { $in: this.user.favoriteIdeas } } })
      } catch {
      }
    },

    async created () {
      try {
        await this.authenticate()
      } catch (error) {
      }
      this.load()
    }
  }
}
</script>
<style >
.texbg {
    background-image: url("../img/woodtex.jpg");
    background-repeat: repeat-y;
}
</style>
