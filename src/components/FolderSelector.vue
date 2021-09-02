<template>
    <q-card v-if="folderCard">
        <div v-for="folder in folders.data" :key="folder._id" >
            <folder-selector-chip :idea="idea" :folder="folder" />
        </div>
    </q-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    FolderSelectorChip: () => import('../components/FolderSelectorChip.vue')
  },
  data () {
    return {

    }
  },
  props: {
    folderCard: null,
    idea: null
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('folders-private', {
      privateFind: 'find',
      privateGet: 'get'
    }),

    folders () {
      return this.privateFind({ query: { userId: this.user._id } })
    }
  },

  methods: {

    ...mapActions('folders-private', {
      privateFindAction: 'find'
    }),

    async load () {
      this.privateFindAction({ query: { userId: this.user._id } })
    }

  },

  created () {
    this.load()
  }
}
</script>
