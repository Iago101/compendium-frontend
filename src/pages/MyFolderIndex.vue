
<template>
  <q-page class="texbg row">
      <div class="col-2">
        <navigation-menu />
      </div>
    <div class="row justify-center col-10 q-mt-sm">
      <div class="col-12"  v-if="isAuthenticated" >
        <!-- <div class="q-col-gutter-md" v-if="!isAuthenticated">
          <div class="q-mb-md" v-for="folder in myPublicFolderList" :key="folder._id">
            <folder-card class="q-mx-sm" :folder="folder"/>
          </div>
        </div> -->

        <div class="q-mb-md" v-for="folder in folders.data" :key="folder._id">
          <folder-card class="q-mx-sm" :folder="folder" />
        </div>

        <h2 v-if="!folders.data.length" class="col-10 q-ma-auto text-indigo text-center">
            Nenhuma pasta criada, <br> experimente criar uma!
        </h2>
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

  // watch: {
  //   isAuthenticated: {
  //     immediate: true,
  //     handler () {
  //       if (this.isAuthenticated) {
  //         this.myPrivateFolderFind({ query: { userId: this.user._id } })
  //       } else {
  //         this.myPublicFolderFind({ query: { userId: this.user._id } })
  //       }
  //     }
  //   }
  // },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
    this.loadMyFolders()
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('folders-private', {
      foldersFind: 'find'
    }),

    folders () {
      return this.foldersFind({ query: { userId: this.user._id } })
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('folders-private', {
      foldersFindAction: 'find'
    }),

    async loadMyFolders () {
      return this.foldersFindAction({ query: { userId: this.user._id } })
    }
  }
}
</script>
<style >
.texbg {
    background-image: url("../img/marbletex.jpg");
    background-repeat: repeat-y;
}
</style>
