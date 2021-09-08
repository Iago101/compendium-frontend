<template>
    <div class="row">
        <div class="row col-12 sheet" v-if="isAuthenticated">
            <q-avatar color="purple-4" class="q-ml-xl q-my-md" text-color="black"> {{user.name | takeFirstLetter}} </q-avatar>
            <div class="col-7">
                <div class="minor-text q-ml-md col-7">{{user.name}}</div>
                <q-input v-model="commentForm.text" borderless dense class="col-5 q-ml-md border minor-text bg-white" />
            </div>
                <q-icon name="send" class="col-1 q-mt-lg q-ml-md cursor-pointer" @click="postComment" size="lg" />
        </div>

        <q-btn round icon="add_comment" v-if="loadController!==true" color="green" size="lg" class="q-mx-auto q-mt-md" @click="loadComments"/>

        <div v-if="loadController===true" class="col-12" >
             <div>
                <div v-for="comment in comments.data" :key="comment._id">
                    <single-comment :comment="comment" />
                </div>
             </div>
        </div>

        <q-btn round icon="add_comment" v-if="loadController===true" color="red" size="lg" class="q-mx-auto q-mt-md" @click="loadComments"/>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { commentsMixins } from '../boot/CompendiumMixins.js'
export default {
  data () {
    return {
      loadController: Boolean,
      commentForm: {
        name: null,
        text: '',
        ideaId: null,
        userId: null
      }
    }
  },

  props: {
    idea: null
  },

  mixins: [
    commentsMixins
  ],

  components: {
    SingleComment: () => import('./SingleComment.vue')
  },

  methods: {

    loadComments () {
      if (this.loadController === true) {
        this.loadController = false
        return
      }
      this.loadController = true
    },

    async postComment () {
      if (this.commentForm.text === '') {
        this.$alertDialog('Escreva o comentário antes de postar', this)
        return
      }
      this.commentForm.name = this.user.name
      this.commentForm.ideaId = this.idea
      this.commentForm.userId = this.user._id
      try {
        await this.$store.dispatch('comments-private/create', [this.commentForm])
        this.$q.notify({ message: 'Comentário postado', color: 'green' })
        this.commentForm.text = ''
      } catch {
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
          this.privateFindAction({ query: { ideaId: this.idea } })
          return
        }
        this.publicFindAction({ query: { ideaId: this.idea } })
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
        return this.privateFind({ query: { ideaId: this.idea } })
      }
      return this.publicFind({ query: { ideaId: this.idea } })
    }
  },

  created () {
    this.load()
  }
}
</script>
