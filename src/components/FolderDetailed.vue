<template>
    <q-card
      class="bg-yellow-2"
      @input="$emit('input', $event)"
      v-if="folder"
      >
        <q-card-section>
          <div class="row">
            <div class="row col-1" v-if="!viewmode">
              <q-btn
                flat
                class="fit q-pr-md"
                size="50px"
                name="arrow_back"
                v-close-popup
                icon="arrow_back"
              />
            </div>
            <h2 class="q-ma-none col-8">
              {{folder.name}}
             <div class="text-h5">
             criador placeholder
             </div>
            </h2>
            <h5 v-if="!viewmode" class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div>
                <q-btn
                  round
                  color="red-4"
                  label="view"
                  @click="$router.push({name: 'folderViewer', params: {id: folder._id}})"
                />
              </div>
            </h5>
          </div>
        </q-card-section>

        <q-separator />

          <q-card-section v-if="folder.description">
            <h3
              class="text-h5 .text"
            >
              {{folder.description}}
            </h3>
        </q-card-section>

        <q-separator />

        <q-card-section class="row justify-around q-mt-md">
            <div class="col-6 col-sm-3" v-for="idea in ideas.data" :key="idea._id">
                <q-btn
                  color="red"
                  v-if="isAuthenticated && folder.userId === user._id"
                  round
                  icon="delete"
                  class="q-ml-auto q-mr-none"
                  @click="removeIdea(idea._id)"
                />
                <idea-card :idea="idea"/>
            </div>
        </q-card-section>
      </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FolderDetailed',
  data () {
    return {
      aux: null
    }
  },

  props: {
    value: Boolean,
    folder: null,
    idea: null,
    viewmode: Boolean
  },

  components: {
    IdeaCard: () => import('../components/IdeaCard')
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
        return this.privateFind({ query: { _id: { $in: this.folder.ideasId } } })
      }
      return this.publicFind({ query: { _id: { $in: this.folder.ideasId } } })
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
          this.privateFindAction({ query: { _id: { $in: this.folder.ideasId } } })
          return
        }
        this.publicFindAction({ query: { _id: { $in: this.folder.ideasId } } })
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
  },

  created () {
    this.load()
  }
}
</script>
