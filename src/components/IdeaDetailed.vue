<template>
    <q-card
      :class="{
        'bg-indigo-2': idea.type==='local',
        'bg-yellow-3': idea.type==='item',
        'bg-grey-2': idea.type==='npc'
      }"
      @input="$emit('input', $event)"
      >
        <q-card-section class="bg-indigo-10 text-white">
          <div class="row">
            <div class="row col-1"  v-if="!viewmode">
              <q-btn
                flat
                class="fit q-pr-md"
                size="40px"
                name="arrow_back"
                v-close-popup
                icon="arrow_back"
              />
            </div>
            <h2 class="q-ma-none col-10 col-sm-7 text">
              {{idea.title}} <br>
             <div class="text-h4">
               {{ idea.type | capitalize }}
             </div>
              <div v-if="creator" class="text-h5 q-mt-md">
                Criado por:
              </div>
              <div v-if="creator" @click="$router.push({name: 'creatorViewer', params: {id: creator._id}})" class="text-h5 text-blue cursor-pointer q-mt-none" style="display: inline-block">
                {{creator.name}}
              </div>
            </h2>

            <div class="text-center q-ml-auto q-my-auto">
                <q-fab
                  color="red-8"
                  class="float-right"
                  style="height: 50px"
                  icon="more_vert"
                  direction="down"
                  persistent
                >
                  <q-fab-action
                    round
                    color="red-8"
                    icon="favorite"
                    @click="saveFavorite"
                    v-if="isAuthenticated && user.favoriteIdeas && !user.favoriteIdeas.includes(idea._id)"
                  >
                      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                        <strong>Favoritar</strong>
                      </q-tooltip>

                  </q-fab-action>
                  <q-fab-action
                    round
                    color="red-8"
                    icon="thumb_down"
                    @click="removeFavorite(idea._id)"
                    v-if="isAuthenticated && user.favoriteIdeas && user.favoriteIdeas.includes(idea._id)"
                  >
                      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                        <strong>Desfavoritar</strong>
                      </q-tooltip>

                  </q-fab-action>

                  <q-fab-action
                    round
                    color="red-8"
                    icon="folder"
                    @click="openFolderSelector"
                    v-if="isAuthenticated"
                  >
                      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                        <strong>Salvar em Pasta</strong>
                      </q-tooltip>

                  </q-fab-action>
                  <folder-selector :idea="idea" :folderCard="folderCard" />

                  <q-fab-action
                    v-if="!viewmode"
                    round
                    color="red-8"
                    icon="visibility"
                    @click="$router.push({name: 'viewer', params: {id: idea._id}})"
                   >

                      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                        <strong>Isolar</strong>
                      </q-tooltip>

                  </q-fab-action>

                   <q-fab-action
                    round
                    v-if="shouldRender && idea.userId === user._id"
                    color="red-8"
                    icon="edit"
                    @click="ideasCreateDetails = true"
                   >
                      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                        <strong>Editar</strong>
                      </q-tooltip>

                   </q-fab-action>
                   <idea-form
                      v-model="ideasCreateDetails"
                      :ideaEdit="idea"
                      class="col-6 col-sm-3"
                    />

                  <q-fab-action
                    @click="deleteDialog = true"
                    round
                    v-if="shouldRender && idea.userId === user._id"
                    color="red-8"
                    icon="delete"
                   >
                      <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
                        <strong>Deletar</strong>
                      </q-tooltip>

                  </q-fab-action>
                  <delete-confirm :dialog="deleteDialog" @confirmed="deleteIdea"/>

                   <report-component :type="'idea'" :thing="idea" />
                </q-fab>
            </div>

            <h5 class="text-center q-ml-auto q-my-auto">
              <div>
                 {{idea.creationPoints}}
                <q-btn
                  round
                  class="right "
                  color="green"
                  v-if="shouldRender && idea.userId !== user._id"
                  icon="navigation"
                  @click="upvote"
                />
                <br>
                Creation Points
              </div>
            </h5>
          </div>
        </q-card-section>

        <q-separator v-if="idea.tags.length" />

        <q-card-section v-if="idea.tags.length" class="row text-h6">
          <div class="col-12 row justify-around">
            <div v-for="tag in idea.tags" :key="tag._id">
              <tags-chip :tag="tag" :status="'display'"/>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row">
          <div  class="col-6">
            <q-img
              :src=idea.image
              style="max-height: 55vh"
              contain
            />

            <h3
              class="text-h5 fulltext"
            >
              {{idea.description}}
            </h3>

          </div>
          <q-separator vertical />
            <h3 class="text-h5  q-mx-auto col-5" >
              <div v-if="idea.type === 'npc'">
                <dnd-character-sheet :creator="idea.userId" visitor :sheet="idea.character.record"/>
              </div>
              <div v-if="idea.type === 'item'">
                <item-sheet visitor :sheet="idea.item"/>
              </div>
              <div v-if="idea.type === 'local'">
                <local-sheet visitor :sheet="idea.local"/>
              </div>

            </h3>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <comments-component :idea="idea._id" />
        </q-card-section>
      </q-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IdeaDetailed',
  data () {
    return {
      deleteDialog: false,
      ideasCreateDetails: null,
      ideaData: null,
      folderId: null,
      folderCard: null,
      creator: null
    }
  },

  components: {
    LocalSheet: () => import('./LocalSheet.vue'),
    ItemSheet: () => import('./ItemSheet.vue'),
    DndCharacterSheet: () => import('./Dnd/DndCharacterSheet.vue'),
    DeleteConfirm: () => import('./DeleteConfirm.vue'),
    IdeaForm: () => import('./IdeaForm.vue'),
    CommentsComponent: () => import('./CommentsComponent.vue'),
    FolderSelector: () => import('./FolderSelector.vue'),
    ReportComponent: () => import('./ReportComponent.vue'),
    TagsChip: () => import('./TagsChip.vue')
  },

  props: {
    value: Boolean,
    idea: null,
    viewmode: Boolean
  },

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    shouldRender: function () {
      if (this.isAuthenticated) {
        return true
      }
      return false
    }
  },

  async created () {
    this.creator = await this.$store.dispatch('users/get', [this.idea.userId])
  },

  methods: {
    async saveFavorite  () {
      const data = this.user
      const favorites = data.favoriteIdeas.length
      data.favoriteIdeas[favorites] = this.idea._id

      try {
        await this.$store.dispatch('users-private/patch', [this.user._id, data, this.params])
        this.$q.notify({ message: 'Idéia favoritada', color: 'green' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao favoritar idéia, tente novamente mais tarde', color: 'red' })
      }
    },

    async removeFavorite  (id) {
      this.user.favoriteIdeas = this.user.favoriteIdeas.filter(el => el !== id)
      try {
        await this.$store.dispatch('users-private/patch', [this.user._id, this.user, this.params])
        this.$q.notify({ message: 'Idéia desfavoritada', color: 'grey' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao desfavoritar idéia, tente novamente mais tarde', color: 'red' })
      }
    },

    async report () {
      this.ideaData = this.idea

      if (this.ideaData.reported && this.ideaData.reported === true) {
        this.$q.notify({ message: 'Idéia já foi reportada e será revista em breve, agradecemos a sinalização', color: 'orange' })
        return
      }

      this.ideaData.reported = true

      try {
        await this.$store.dispatch('ideas-private/patch', [this.ideaData._id, this.ideaData, this.params])
        this.$q.notify({ message: 'Idéia foi reportada e será revista em breve, agradecemos a sinalização', color: 'orange' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao reportar idéia, tente novamente mais tarde', color: 'red' })
      }
    },

    async deleteIdea () {
      this.error = false
      try {
        await this.$store.dispatch('ideas-private/remove', [this.idea._id])
        this.$q.notify({ message: 'Idéia arremessada no Abismo', color: 'grey' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao sacrificar idéia, tente novamente mais tarde', color: 'red' })
      }
    },

    openFolderSelector () {
      this.folderCard = true
    },

    async upvote () {
      this.error = false
      try {
        await this.$store.dispatch('ideas-interaction/patch', [this.idea._id, this.idea, this.params])
        this.$q.notify({ message: 'Voto quantificado', color: 'green' })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
