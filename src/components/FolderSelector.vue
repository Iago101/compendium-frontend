<template>
  <q-menu auto-close v-if="folderCard">
    <q-list dense bordered padding class="bg-red-4">
      <div v-for="folder in folders.data" :key="folder._id">
        <q-item clickable dense v-ripple class="bg-white q-mt-xs">
          <q-item-section>
            <folder-selector-chip :idea="idea" :folder="folder"/>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-menu>
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

    load () {
      return this.privateFindAction({ query: { userId: this.user._id } })
    }
  },

  created () {
    this.load()
  }
}
</script>
