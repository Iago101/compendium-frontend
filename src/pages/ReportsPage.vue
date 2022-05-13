<template>
    <q-page
        v-if="isAuthenticated && user.permissions.includes('super_admin')"
        class="row bg-indigo-2"
    >

    <q-list class="col-12">
       <q-expansion-item
            expand-separator
            icon="emoji_objects"
            label="Idéias"
            class="bg-white"
        >
            <q-card class="row bg-indigo-2">
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
                    <delete-confirm :dialog="deleteDialog" @canceled="deleteDialog=false" @confirmed="purge(idea._id, 'idea')"/>

                    <q-btn
                        color="green"
                        round
                        size="lg"
                        icon="check"
                        @click="purify(idea, 'idea')"
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
          <q-card class="row bg-indigo-2">
              <div class="col-6 col-sm-3 q-mx-auto q-mt-lg" v-for="folder in folders.data" :key="folder._id">
                <folder-card :folder="folder"/>
                <div class="row justify-around q-mt-sm" >
                    <q-btn
                        color="red"
                        round
                        size="lg"
                        icon="delete"
                        @click="deleteDialog = true"
                    />
                    <delete-confirm :dialog="deleteDialog" @canceled="deleteDialog=false" @confirmed="purge(folder._id, 'folder')"/>

                    <q-btn
                        color="green"
                        round
                        size="lg"
                        icon="check"
                        @click="purify(folder, 'folder')"
                    />
                </div>
              </div>
            </q-card>
        </q-expansion-item>

        <q-expansion-item
            expand-separator
            icon="shield"
            label="Guildas"
            class="bg-white"
        >
          <q-card class="row bg-indigo-2">
              <div class="col-6 col-sm-3 q-mx-auto q-mt-lg" v-for="guild in guilds.data" :key="guild._id">
                <guild-card :guild="guild"/>
                <div class="row justify-around q-mt-sm" >
                    <q-btn
                        color="red"
                        round
                        size="lg"
                        icon="delete"
                        @click="deleteDialog = true"
                    />
                    <delete-confirm :dialog="deleteDialog" @canceled="deleteDialog=false" @confirmed="purge(guild._id, 'guild')"/>

                    <q-btn
                        color="green"
                        round
                        size="lg"
                        icon="check"
                        @click="purify(guild, 'guild')"
                    />
                </div>
              </div>
            </q-card>
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
  },

  components: {
    IdeaCard: () => import('../components/IdeaCard'),
    FolderCard: () => import('../components/FolderCard'),
    GuildCard: () => import('../components/GuildCard'),
    DeleteConfirm: () => import('../components/DeleteConfirm.vue')
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-private', {
      ideasFind: 'find',
      ideasGet: 'get'
    }),
    ...mapGetters('folders-private', {
      foldersFind: 'find',
      foldersGet: 'get'
    }),
    ...mapGetters('guilds-private', {
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
    ...mapActions('ideas-private', {
      IdeasFindAction: 'find'
    }),
    ...mapActions('folders-private', {
      FoldersFindAction: 'find'
    }),
    ...mapActions('guilds-private', {
      GuildsFindAction: 'find'
    }),

    async loadIdeas () {
      return this.IdeasFindAction({ query: { reported: true, asSuperAdmin: true } })
    },
    async loadFolders () {
      return this.FoldersFindAction({ query: { reported: true, asSuperAdmin: true } })
    },
    async loadGuilds () {
      return this.GuildsFindAction({ query: { reported: true, asSuperAdmin: true } })
    },

    async purge (id, type) {
      this.params = { query: { asReport: true } }
      if (type === 'idea') { await this.$store.dispatch('ideas-private/remove', [id, this.params]) }
      if (type === 'folder') { await this.$store.dispatch('folders-private/remove', [id, this.params]) }
      if (type === 'guild') { await this.$store.dispatch('guilds-private/remove', [id, this.params]) }
    },

    async purify (thing, type) {
      this.data = thing
      this.data.reported = false

      this.params = { query: { asReport: true } }
      if (type === 'idea') { await this.$store.dispatch('ideas-private/patch', [this.data._id, this.data, this.params]) }
      if (type === 'folder') { await this.$store.dispatch('folders-private/patch', [this.data._id, this.data, this.params]) }
      if (type === 'guild') { await this.$store.dispatch('guilds-private/patch', [this.data._id, this.data, this.params]) }
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
