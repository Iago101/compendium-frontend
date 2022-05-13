<template>
    <q-page class="row bg-indigo-2">
        <div class="col-2">
            <navigation-menu />
        </div>

        <div class="col-10 row justify-around">
           <guild-viewer :guild="guild" />
        </div>
    </q-page>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
export default {

  data () {
    return {
      guild: null
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }

    this.guild = await this.$store.dispatch('guilds-private/get', [this.$route.params.id])
  },

  components: {
    NavigationMenu: () => import('../components/NavigationMenu.vue'),
    GuildViewer: () => import('../components/GuildViewer.vue')
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('guilds-private', {
      privateGet: 'get'
    })
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('guilds-private', {
      privateActionGet: 'get'
    })
  }
}
</script>
