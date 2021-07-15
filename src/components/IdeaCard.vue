<template>
  <div>
    <q-card v-if="idea"
      class="cursor-pointer"
      :class="{
        'bg-purple': idea.type==='local',
        'bg-yellow': idea.type==='item',
        'bg-grey': idea.type==='npc'
      }"
      @click="ideasDetails = true"
    >
      <q-card-section>
        <div class="row">
          <h6
            class="q-ma-none"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 150px;
            ">
            {{idea.title}}
            <q-tooltip>
              {{idea.title}}
            </q-tooltip>
          </h6>
          <h6 class="text-center q-ml-auto q-ma-none">
            {{idea.creationPoints}}
          </h6>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section  style="height: 252px">
        <div v-if="idea.type == 'npc'">
          <!-- <NPCIdea/> -->
        </div>
        <div v-if="idea.type == 'item'">
          <!-- <ItemIdea/> -->
        </div>
        <div v-if="idea.type == 'local'">
          <!-- <CityIdea/> -->
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <div class="text-subtitle1 line-break:normal"
          style="
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 90px;
        ">
          {{idea.description}}
        </div>
      </q-card-section>
    </q-card>

    <q-dialog
      v-model="ideasDetails"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
      :class="{
        'bg-purple-2': idea.type==='local',
        'bg-yellow-2': idea.type==='item',
        'bg-grey-2': idea.type==='npc'
      }">
        <q-card-section>
          <div class="row">
            <div class="row col-1">
              <q-icon
                class="fit"
                size="70px"
                name="arrow_back"
                @click="ideasDetails=false"
              />
            </div>
            <h2 class="q-ma-none col-8">
              {{idea.title}} <br>
             <div class="text-h4">
               {{ idea.type | capitalize }}
             </div>
            </h2>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn round color="red-4" label="share"/>
              </div>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn
                  round
                  v-if="shouldRender && idea.userId !== this.user._id"
                  color="red-4"
                  label="save"/>
              </div>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn
                  round
                  v-if="shouldRender && idea.userId === this.user._id"
                  color="red-4"
                  label="editar"
                  @click="edit"
                />
                <IdeaForm
                  v-model="ideasCreateDetails"
                  :ideaEdit="idea"
                  class="col-6 col-sm-3"
                />
              </div>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn
                  @click="deleteConfirm()"
                  round
                  v-if="shouldRender && idea.userId === this.user._id"
                  color="red-4"
                  label="excluir"/>
              </div>
            </h5>
            <h5 class="text-center q-ml-auto q-my-auto">
              <div >
                [ {{idea.creationPoints}} ]
                <q-btn
                  round
                  class="right "
                  color="green"
                  v-if="shouldRender && idea.userId !== this.user._id"
                  icon="navigation"
                />
                <br>
                Creation Points
              </div>
            </h5>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section style="height: 400px" class="row">
           <div  class="col-6">
          imagem?
          </div>
          <q-separator vertical />
          <h3 class="text-h5 col-5" >
            component desc
            <!-- <div v-if="idea.type == 'npc'">
              <NPCIdea/>
            </div>
            <div v-if="idea.type == 'item'">
              <ItemIdea/>
            </div>
            <div v-if="idea.type == 'local'">
              <CityIdea/>
            </div> -->
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
    </q-dialog>
      <q-dialog v-model="deleteDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Tem certeza? <br> Essa ação não é desfeita nem com Wish de nono círculo</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="cancelar" color="primary" v-close-popup />
              <q-btn flat label="DELETAR" color="red" @click="deleteIdea()" v-close-popup />
            </q-card-actions>
          </q-card>
      </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IdeaCard',
  props: {
    idea: null,
    value: Boolean
  },

  components: {
    IdeaForm: () => import('../components/IdeaForm.vue')
  },

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  data () {
    return {
      render: null,
      ideasDetails: null,
      deleteDialog: false,
      ideasCreateDetails: null
    }
  },

  methods: {
    deleteConfirm () {
      this.deleteDialog = true
    },

    async deleteIdea () {
      this.error = false
      try {
        await this.$store.dispatch('ideas-private/remove', [this.idea._id])
        this.$q.notify({ message: 'Idéia arremessada no Abismo', color: 'grey' })
      } catch (error) {
        console.error(error)
        this.$q.notify({ message: 'Erro ao sacrificar idéia, tente novamente mais tarde', color: 'red' })
      }
    },

    edit () {
      this.ideasCreateDetails = true
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
  }
}
</script>
