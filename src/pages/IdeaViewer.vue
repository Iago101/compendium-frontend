<template>
    <q-page>
      <div>
        <idea-detailed :idea="idea" :viewMode="true" />
      </div>
    </q-page>
</template>

<script>
import IdeaDetailed from 'src/components/IdeaDetailed.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'IdeaViewer',
  data () {
    return {
      idea: null
    }
  },

  components: {
    IdeaDetailed
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicGet: 'get'
    }),
    ...mapGetters('ideas-private', {
      privateGet: 'get'
    })
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-private', ['find']),
    ...mapActions('ideas-public', {
      publicFind: 'find'
    })
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }

    try {
      if (this.isAuthenticated) {
        this.idea = await this.$store.dispatch('ideas-private/get', [this.$route.params.id])
      }
      this.idea = await this.$store.dispatch('ideas-public/get', [this.$route.params.id])
    } catch {
    }
  }

}
</script>
