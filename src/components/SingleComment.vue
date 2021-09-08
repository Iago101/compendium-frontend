<template>
    <div class="row" v-if="comment">
        <div class="row col-12 sheet q-mt-lg q-mx-auto">
            <q-avatar color="purple-3" class="q-ml-xl q-my-md" text-color="black"> {{comment.name | takeFirstLetter}} </q-avatar>
            <div class="col-7">
                <div class="minor-text q-ml-md col-7">{{comment.name}}</div>

                <q-fab v-model="fab" persistent icon="more_horiz" padding="sm" round flat v-if="isAuthenticated && comment.userId === user._id" class="float-right">
                  <q-fab-action color="blue" v-if="edit!==true" icon="edit" @click="editMode" />

                  <q-fab-action color="green" v-if="edit===true" icon="check" @click="updateComment" />
                  <q-fab-action color="orange" v-if="edit===true" icon="cancel" @click="edit=false" />

                  <q-fab-action color="red" @click="deleteDialog=true" icon="delete" />
                </q-fab>
                  <delete-confirm :dialog="deleteDialog" @confirmed="deleteComment" @canceled="deleteDialog=false"/>

                <q-input
                  type="text-area"
                  autogrow
                  :readonly="edit===false"
                  v-model="comment.text"
                  borderless
                  dense
                  class="col-5 q-ml-md border minor-text bg-white"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { commentsMixins } from '../boot/CompendiumMixins.js'
export default {
  data () {
    return {
      deleteDialog: false,
      edit: false,
      textPatch: null,
      fab: null
    }
  },

  mixins: [
    commentsMixins
  ],

  props: {
    comment: null
  },

  components: {
    DeleteConfirm: () => import('./DeleteConfirm.vue')
  },

  methods: {

    async deleteComment () {
      this.error = false
      try {
        await this.$store.dispatch('comments-private/remove', [this.comment._id])
        this.$q.notify({ message: 'Comentário arremessada no Abismo', color: 'grey' })
      } catch (error) {
        console.error(error)
        this.$q.notify({ message: 'Erro ao sacrificar comentário, tente novamente mais tarde', color: 'red' })
      }
    },

    editMode () {
      this.edit = true
      this.fab = true
    },

    async updateComment () {
      if (this.comment.text === '') {
        this.$alertDialog('O Comentário não pode ficar vazio', this)
        return
      }
      try {
        await this.$store.dispatch('comments-private/patch', [this.comment._id, this.comment, this.params])
        this.$q.notify({ message: 'Comentário poliformado com sucesso', color: 'green' })
        this.edit = false
      } catch (error) {
        console.error(error)
      }
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  }
}
</script>
