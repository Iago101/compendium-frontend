<template>
  <div v-if="folder">
    <q-card
      class="cursor-pointer bg-yellow-2"
      @click="folderDetails = true"
    >
    <q-dialog
      v-model="folderDetails"
      transition-show="slide-up"
      transition-hide="slide-down"
      maximized
    >
        <folder-detailed :folder="folder"
        />
    </q-dialog>

      <q-card-section class="bg-blue-9 text-white">
        <div>
          <h4
            class="q-ma-none text-center"
            >
            {{folder.name}}
            <q-tooltip>
              {{folder.name}}
            </q-tooltip>
          </h4>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section class="row noclick" >
          <div class="col-2 col-sm-3 " v-for="idea in ideas.data" :key="idea._id">
            <idea-card :idea="idea" />
          </div>
      </q-card-section>

      <q-separator v-if="folder.description" />
      <q-card-section>
        <div v-if="folder.description" class="text-subtitle1"
          style="
            .text
          ">
          {{folder.description}}
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FolderCard',

  props: {
    folder: null,
    idea: null
  },

  components: {
    FolderDetailed: () => import('./FolderDetailed.vue'),
    IdeaCard: () => import('../components/IdeaCard')
  },

  data () {
    return {
      folderDetails: false
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicFind: 'find',
      publicGet: 'get'
    }),
    ...mapGetters('ideas-private', {
      privateFind: 'find',
      privateGet: 'get'
    }),

    ideas () {
      if (this.isAuthenticated) {
        return this.privateFind({ query: { _id: { $in: this.folder.ideasId }, $limit: 4 } })
      }
      return this.publicFind({ query: { _id: { $in: this.folder.ideasId }, $limit: 4 } })
    }
  },

  methods: {
    ...mapActions('ideas-public', {
      publicFindAction: 'find'
    }),
    ...mapActions('ideas-private', {
      privateFindAction: 'find'
    }),

    async load () {
      try {
        if (this.isAuthenticated) {
          this.privateFindAction({ query: { _id: { $in: this.folder.ideasId }, $limit: 4 } })
          return
        }
        this.publicFindAction({ query: { _id: { $in: this.folder.ideasId }, $limit: 4 } })
      } catch {
      }
    },

    async removeIdea (id) {
      this.folder.ideasId = this.folder.ideasId.filter(el => el !== id)

      try {
        await this.$store.dispatch('folders-private/patch', [this.folder._id, this.folder, this.params])
        this.$q.notify({ message: 'Idéia removida da pasta', color: 'green' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao anexar idéia, id inválido', color: 'red' })
      }
    }
  }
}
</script>

<style>
.noclick {
    pointer-events: none;
}
</style>
