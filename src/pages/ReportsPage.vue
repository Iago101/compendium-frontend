<template>
    <q-page
        v-if="isAuthenticated && user.roles === 'CDadmin'"
        class="row bg-purple-2"
    >

    <q-list class="col-12">
       <q-expansion-item
            expand-separator
            icon="emoji_objects"
            label="Idéias"
            class="bg-white"
        >
            <q-card class="row bg-purple-2">
              <div class="col-6 col-sm-3 q-mx-auto q-mt-lg" v-for="idea in ideas.data" :key="idea._id">
                <idea-card :idea="idea"/>
                <div class="row justify-around q-mt-sm" >
                    <q-btn
                        color="red"
                        round
                        size="lg"
                        icon="delete"
                        @click="deleteDialog = true"
                    />
                    <delete-confirm :dialog="deleteDialog" @canceled="deleteDialog=false" @confirmed="deleteIdea(idea._id)"/>

                    <q-btn
                        color="green"
                        round
                        size="lg"
                        icon="check"
                        @click="purifyIdea(idea)"
                    />
                </div>
              </div>
            </q-card>
        </q-expansion-item>

        <q-expansion-item
            expand-separator
            icon="folder"
            label="Pastas"
            class="bg-white"
        >
        </q-expansion-item>

        <q-expansion-item
            expand-separator
            icon="shield"
            label="Guildas"
            class="bg-white"
        >
        </q-expansion-item>
    </q-list>

    </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReportsPage',
  data () {
    return {
      ideaData: null,
      deleteDialog: false
    }
  },

  props: {
    idea: null
  },

  components: {
    IdeaCard: () => import('../components/IdeaCard'),
    // FolderCard: () => import('../components/FolderCard'),
    DeleteConfirm: () => import('../components/DeleteConfirm.vue')
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas', {
      ideasFind: 'find',
      ideasGet: 'get'
    }),
    ...mapGetters('folders', {
      foldersFind: 'find',
      foldersGet: 'get'
    }),
    ...mapGetters('guilds', {
      guildsFind: 'find',
      guildsGet: 'get'
    }),

    ideas () {
      return this.ideasFind({ query: { reported: true } })
    },
    folders () {
      return this.foldersFind({ query: { reported: true } })
    },
    guilds () {
      return this.guildsFind({ query: { reported: true } })
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas', {
      IdeasFindAction: 'find'
    }),
    ...mapActions('folders', {
      FoldersFindAction: 'find'
    }),
    ...mapActions('guilds', {
      GuildsFindAction: 'find'
    }),

    async loadIdeas () {
      return this.IdeasFindAction({ query: { reported: true } })
    },
    async loadFolders () {
      return this.FoldersFindAction({ query: { reported: true } })
    },
    async loadGuilds () {
      return this.GuildsFindAction({ query: { reported: true } })
    },

    async deleteIdea (id) {
      await this.$store.dispatch('ideas/remove', [id])
    },

    async purifyIdea (idea) {
      this.ideaData = idea
      this.ideaData.reported = false
      await this.$store.dispatch('ideas/patch', [this.ideaData._id, this.ideaData, this.params])
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
    this.loadIdeas()
    this.loadFolders()
    this.loadGuilds()
  }
}
</script>
