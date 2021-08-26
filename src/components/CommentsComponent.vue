<template>
    <div class="row">
        <div class="row col-12 sheet" v-if="isAuthenticated">
            <q-avatar color="red" class="q-ml-xl q-my-md" text-color="black"> A </q-avatar>
            <div class="col-7">
                <div class="minor-text q-ml-md col-7">{{user.name}}</div>
                <q-input v-model="commentForm.text" borderless dense class="col-5 q-ml-md border minor-text bg-white" />
            </div>
                <q-icon name="send" class="col-1 q-mt-lg q-ml-md cursor-pointer" @click="postComment" size="lg" />
        </div>

        <q-separator />

        <q-btn round icon="add_comment" color="green" size="lg" class="q-mx-auto q-mt-md" @click="loadComments"/>

        <div v-if="loadController" >
             <div class="row q-col-gutter-md" v-if="!isAuthenticated">
                <div v-for="comment in publicCommentList" :key="comment._id">
                    <single-comment :comment="comment" />
                </div>

                <div v-for="comment in privateCommentList" :key="comment._id">
                    <single-comment :comment="comment" />
                </div>
             </div>

            <single-comment  />
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      loadController: Boolean,
      commentForm: {
        text: '',
        ideaId: null,
        userId: null
      }
    }
  },

  props: {
    idea: null
  },

  components: {
    SingleComment: () => import('./SingleComment.vue')
  },

  methods: {
    loadComments () {
      this.loadcontroller = true
    },

    async postComment () {
      if (this.commentForm.text === '') {
        this.$alertDialog('Escreva o comentário antes de postar', this)
        return
      }
      this.commentForm.ideaId = this.idea
      this.commentForm.userId = this.user._id
      try {
        await this.$store.dispatch('comments-private/create', [this.commentForm])
        this.$q.notify({ message: 'Comentário postado', color: 'green' })
        this.commentForm.text = ''
      } catch (error) {
        console.error(error)
      }
    },
    ...mapActions('comments-public', {
      publicFindAction: 'find'
    }),
    ...mapActions('comments-private', {
      privateFindAction: 'find'
    }),
    async load () {
      try {
        if (this.isAuthenticated) {
          this.privateFindAction({ query: { ideaId: this.idea._id } })
          return
        }
        this.publicFindAction({ query: { ideaId: this.idea._id } })
      } catch {
      }
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('comments-public', {
      publicFind: 'find',
      publicGet: 'get'
    }),
    ...mapGetters('comments-private', {
      privateFind: 'find',
      privateGet: 'get'
    }),

    comments () {
      if (this.isAuthenticated) {
        return this.privateFind({ query: { ideaId: this.idea._id } })
      }
      return this.publicFind({ query: { ideaId: this.idea._id } })
    }
  },

  created () {
    this.load()
  }
}
</script>
