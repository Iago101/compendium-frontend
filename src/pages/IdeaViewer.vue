<template>
    <q-page>
        <div
        :class="{
            'bg-purple-2': idea.type==='local',
            'bg-yellow-2': idea.type==='item',
            'bg-grey-2': idea.type==='npc'
        }"
        >
        <q-card-section>
          <div class="row">
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
                  v-if="shouldRender && idea.userId === user._id"
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
        <q-card-section style="height: 400px" class="row">
            <div  class="col-12">
                imagem?
            </div>
            <h3
                class="text-h5">
                {{idea.description}}
            </h3>
        </q-card-section>
        <q-card-section>
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

        <q-separator/>

        <q-card-section>
            <h3 class="text-h5 col-5" >
                comentarios placeholder
            </h3>
        </q-card-section>
      </div>
<!--fazer um componente separado pra isso aqui  -->
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
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'IdeaViewer',
  data () {
    return {
      ideasDetails: null,
      deleteDialog: false,
      ideasCreateDetails: null,
      idea: null
    }
  },

  components: {
    IdeaForm: () => import('../components/IdeaForm.vue')
  },
  // preciso por como plugin/global
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicGet: 'get'
    }),
    ...mapGetters('ideas-private', {
      privateGet: 'get'
    }),
    shouldRender: function () {
      if (this.isAuthenticated) {
        return true
      }
      return false
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-private', ['find']),
    ...mapActions('ideas-public', {
      publicFind: 'find'
    }),

    deleteConfirm () {
      this.deleteDialog = true
    },

    async deleteIdea () {
      this.error = false
      try {
        await this.$store.dispatch('ideas-private/remove', [this.idea._id])
        this.$q.notify({ message: 'Idéia arremessada no Abismo', color: 'grey' })
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.$q.notify({ message: 'Erro ao sacrificar idéia, tente novamente mais tarde', color: 'red' })
      }
    },

    edit () {
      this.ideasCreateDetails = true
    }
  },

  async created () {
    console.log(1)
    try {
      await this.authenticate()
    } catch (error) {
    }
    console.log(2)

    try {
      if (this.isAuthenticated) {
        this.idea = await this.$store.dispatch('ideas-private/get', [this.$route.params.id])
      }
      this.idea = await this.$store.dispatch('ideas-public/get', [this.$route.params.id])
    } catch {
    }
    console.log(3)
  }

}
</script>
