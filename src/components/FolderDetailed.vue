<template>
    <q-card
      class="bg-yellow-2"
      @input="$emit('input', $event)"
      v-if="folder"
      >
        <q-card-section class="bg-blue-9 text-white">
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

             <div v-if="creator" class="text-h5 q-mt-md">
                Criado por:
              </div>
              <div v-if="creator" @click="$router.push({name: 'creatorViewer', params: {id: creator._id}})" class="text-h5 text-yellow cursor-pointer q-mt-none" style="display: inline-block">
                {{creator.name}}
              </div>

            </h2>

            <div class="text-center q-ml-auto q-my-auto">
              <q-fab
                color="grey"
                class="float-right"
                style="height: 50px"
                icon="more_vert"
                direction="down"
                persistent
              >

              <report-component :type="'folder'" :thing="folder" />

              <q-fab-action
                v-if="viewmode===false"
                round
                color="red-8"
                icon="visibility"
                @click="$router.push({name: 'folderViewer', params: {id: folder._id}})"
              />

              <q-fab-action
                    @click="deleteDialog = true"
                    round
                    v-if="isAuthenticated && folder.userId === user._id"
                    color="red-8"
                    icon="delete"
                   >
                      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                        <strong>Deletar</strong>
                      </q-tooltip>

                  </q-fab-action>
                  <delete-confirm :dialog="deleteDialog" @confirmed="deleteFolder"/>

              </q-fab>
            </div>
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
      aux: null,
      deleteDialog: false,
      creator: null

    }
  },

  props: {
    value: Boolean,
    folder: null,
    idea: null,
    viewmode: Boolean
  },

  components: {
    IdeaCard: () => import('../components/IdeaCard'),
    ReportComponent: () => import('../components/ReportComponent'),
    DeleteConfirm: () => import('./DeleteConfirm.vue')

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
    },

    async deleteFolder () {
      this.error = false
      try {
        await this.$store.dispatch('folders-private/remove', [this.folder._id])
        this.$q.notify({ message: 'Pasta arremessada no Abismo', color: 'grey' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao sacrificar pasta, tente novamente mais tarde', color: 'red' })
      }
    }
  },

  async created () {
    this.load()
    this.creator = await this.$store.dispatch('users/get', [this.folder.userId])
  }
}
</script>
