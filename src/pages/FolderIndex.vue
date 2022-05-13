
<template>
  <q-page class="texbg row">
      <div class="col-2">
        <navigation-menu />
      </div>
    <div class="row justify-center col-10 q-mt-sm">
      <div class="col-12">
        <div class="q-col-gutter-md" v-if="!isAuthenticated">
          <div class="q-mb-md" v-for="folder in publicFolderList" :key="folder._id">
            <folder-card v-if="folder.ideasId.length > 0" class="q-mx-sm" :folder="folder"/>
          </div>
        </div>

        <div class="q-mb-md" v-for="folder in privateFolderList" :key="folder._id">
          <folder-card v-if="folder.ideasId.length > 0"  class="q-mx-sm" :folder="folder" />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  components: {
    FolderCard: () => import('../components/FolderCard'),
    NavigationMenu: () => import('../components/NavigationMenu.vue')
  },

  watch: {
    isAuthenticated: {
      immediate: true,
      handler () {
        if (this.isAuthenticated) {
          this.privateFolderFind()
        } else {
          this.publicFolderFind()
        }
      }
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('folders-public', {
      publicFolderList: 'list',
      publicFolderGet: 'get'
    }),
    ...mapGetters('folders-private', {
      privateFolderList: 'list',
      privateFolderGet: 'get'
    })
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('folders-private', {
      privateFolderFind: 'find'
    }),
    ...mapActions('folders-public', {
      publicFolderFind: 'find'
    })
  }
}
</script>
<style >
.texbg {
    background-image: url("../img/marbletex.jpg");
    background-repeat: repeat-y;
}
</style>
