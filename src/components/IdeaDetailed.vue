<template>
    <q-card
      :class="{
        'bg-purple-2': idea.type==='local',
        'bg-yellow-2': idea.type==='item',
        'bg-grey-2': idea.type==='npc'
      }"
      @input="$emit('input', $event)"
      >
        <q-card-section>
          <div class="row">
            <div class="row col-1"  v-if="viewMode!==true">
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
              {{idea.title}} <br>
             <div class="text-h4">
               {{ idea.type | capitalize }}
             </div>
             <div class="text-h5">
             criador placeholder
             </div>
            </h2>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn
                  v-if="viewMode!==true"
                  round
                  color="red-4"
                  label="view"
                  @click="$router.push({name: 'viewer', params: {id: idea._id}})"
                />
              </div>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn
                  round
                  v-if="shouldRender && idea.userId !== user._id"
                  color="red-4"
                  label="save"/>
              </div>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn
                  round
                  v-if="shouldRender && idea.userId === user._id"
                  color="red-4"
                  label="editar"
                  @click="ideasCreateDetails = true"
                />
                <idea-form
                  v-model="ideasCreateDetails"
                  :ideaEdit="idea"
                  class="col-6 col-sm-3"
                />
              </div>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn
                  @click="deleteDialog = true"
                  round
                  v-if="shouldRender && idea.userId === user._id"
                  color="red-4"
                  label="excluir"/>
              </div>
                  <delete-confirm :deleteDialog="deleteDialog" @confirmed="deleteIdea"/>
            </h5>
            <h5 class="text-center q-ml-auto q-my-auto">
              <div >
                [ {{idea.creationPoints}} ]
                <q-btn
                  round
                  class="right "
                  color="green"
                  v-if="shouldRender && idea.userId !== user._id"
                  icon="navigation"
                />
                <br>
                Creation Points
              </div>
            </h5>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="row">
           <div  class="col-6">
          imagem?
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
            <h3
              class="text-h5"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                max-height: 90px;
              ">
              {{idea.description}}
            </h3>
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
      ideasCreateDetails: null
    }
  },

  components: {
    IdeaForm: () => import('../components/IdeaForm.vue'),
    DeleteConfirm: () => import('../components/DeleteConfirm.vue'),
    DndCharacterSheet: () => import('./DndCharacterSheet.vue'),
    ItemSheet: () => import('./ItemSheet.vue'),
    LocalSheet: () => import('./LocalSheet.vue')
  },

  props: {
    value: Boolean,
    idea: null,
    viewMode: null
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

  methods: {
    async deleteIdea () {
      this.error = false
      try {
        await this.$store.dispatch('ideas-private/remove', [this.idea._id])
        this.$q.notify({ message: 'Idéia arremessada no Abismo', color: 'grey' })
      } catch (error) {
        console.error(error)
        this.$q.notify({ message: 'Erro ao sacrificar idéia, tente novamente mais tarde', color: 'red' })
      }
    }
  }
}
</script>
