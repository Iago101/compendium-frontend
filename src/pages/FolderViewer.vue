<template>
    <q-page>
      <div style="height: 100vh">
        <folder-detailed :folder="folder" viewmode class="full-height"/>
      </div>
    </q-page>
</template>

<script>
import FolderDetailed from 'src/components/FolderDetailed.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FolderViewer',
  data () {
    return {
      folder: null
    }
  },

  components: {
    FolderDetailed
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('folders-public', {
      publicGet: 'get'
    }),
    ...mapGetters('folders-private', {
      privateGet: 'get'
    })
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('folders-private', ['find']),
    ...mapActions('folders-public', {
      publicFind: 'find'
    })
  },

  async created () {
    try {
      if (this.isAuthenticated) {
        this.folder = await this.$store.dispatch('folders-private/get', [this.$route.params.id])
        return
      }
      this.folder = await this.$store.dispatch('folders-public/get', [this.$route.params.id])
    } catch {
    }
  }

}
</script>
