
<template>
  <q-page class="texbg row">
      <div class="col-2">
        <navigation-menu />
      </div>
    <div class="row justify-center col-10 q-mt-sm">
      <div class="col-12 row justify-around"  v-if="isAuthenticated" >
        <div class="q-mb-md col-2" v-for="idea in ideas.data" :key="idea._id">
          <idea-card class="q-mx-sm" :idea="idea" />
        </div>

        <h2 v-if="!ideas.data.length" class="col-10 q-ma-auto text-white text-center">
            Nenhuma idéia criada, <br> experimente criar uma!
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
    IdeaCard: () => import('../components/IdeaCard'),
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
    this.loadMyideas()
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-private', {
      ideasFind: 'find'
    }),

    ideas () {
      return this.ideasFind({ query: { userId: this.user._id } })
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-private', {
      ideasFindAction: 'find'
    }),

    async loadMyideas () {
      return this.ideasFindAction({ query: { userId: this.user._id } })
    }
  }
}
</script>
<style >
.texbg {
    background-image: url("../img/woodtex.jpg");
    background-repeat: repeat-y;
}
</style>
