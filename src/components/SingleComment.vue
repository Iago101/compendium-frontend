<template>
    <div class="row" v-if="comment">
        <div class="row col-12 sheet q-mt-lg q-mx-auto">
            <q-avatar color="purple-3" class="q-ml-xl q-my-md" text-color="black"> {{comment.name | takeFirstLetter}} </q-avatar>
            <div class="col-7">
                <div class="minor-text q-ml-md col-7">{{comment.name}}</div>

                <q-fab icon="more_horiz" padding="sm" round flat v-if="isAuthenticated && comment.userId === user._id" class="float-right">
                  <q-fab-action color="blue" icon="edit" />
                  <q-fab-action color="red" @click="deleteDialog=true" icon="delete" />
                </q-fab>
                  <delete-confirm :dialog="deleteDialog" @confirmed="deleteComment"/>

                <q-input type="text-area" autogrow readonly v-model="comment.text" borderless dense class="col-5 q-ml-md border minor-text bg-white" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      deleteDialog: false
    }
  },

  props: {
    comment: null
  },

  components: {
    DeleteConfirm: () => import('./DeleteConfirm.vue')
  },

  filters: {
    takeFirstLetter: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase()
    }
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

    takeFirstLetter (value) {
      value = value.toString()
      return value.charAt(0).toUpperCase()
    }

  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  }
}
</script>
