<template>
    <q-page class=" row bg-purple-2">
        <div class="col-2">
            <navigation-menu />
        </div>

        <div class="col-10 row justify-around" v-if="!isAuthenticated">
            <q-icon name="account_circle" class="col-12" size="20vw" color="purple" />
            <h3 class="text-center text-purple-9 q-mt-none" > Logue para continuar </h3>
        </div>

        <div class="col-10 row justify-around" v-if="isAuthenticated">
            {{user.guildId}}
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

    try {
      if (this.isAuthenticated) {
        this.guild = await this.$store.dispatch('guilds-private/get', [this.$route.params.id])
      }
    } catch {
    }
  },

  components: {
    NavigationMenu: () => import('../components/NavigationMenu.vue')
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
