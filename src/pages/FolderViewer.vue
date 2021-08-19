<template>
    <q-page>
      <div>
        <folder-detailed :folder="folder" :viewMode="true" />
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
      await this.authenticate()
    } catch (error) {
    }

    try {
      if (this.isAuthenticated) {
        this.folder = await this.$store.dispatch('folders-private/get', [this.$route.params.id])
      }
      this.folder = await this.$store.dispatch('folders-public/get', [this.$route.params.id])
    } catch {
    }
  }

}
</script>
