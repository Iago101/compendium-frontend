<template>
    <q-page>
      <div style="height: 100vh">
        <idea-detailed :idea="idea" viewmode class="full-height"/>
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
      if (this.isAuthenticated) {
        this.idea = await this.$store.dispatch('ideas-private/get', [this.$route.params.id])
        return
      }
      this.idea = await this.$store.dispatch('ideas-public/get', [this.$route.params.id])
    } catch {
    }
  }

}
</script>
