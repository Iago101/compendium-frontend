<template>
    <q-page
        v-if="isAuthenticated && user.roles === 'CDadmin'"
        class="row bg-purple-2"
    >
        <div class="col-6 col-sm-3 q-mx-auto q-mt-lg" v-for="idea in ideas.data" :key="idea._id">
                <idea-card :idea="idea"/>
                <div class="row justify-around q-mt-sm" >
                    <q-btn
                        color="red"
                        round
                        size="lg"
                        icon="delete"
                        @click="deleteDialog = true"
                    />
                    <delete-confirm :dialog="deleteDialog" @canceled="deleteDialog=false" @confirmed="deleteIdea(idea._id)"/>

                    <q-btn
                        color="green"
                        round
                        size="lg"
                        icon="check"
                        @click="purifyIdea(idea)"
                    />
                </div>
            </div>
    </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ReportsPage',
  data () {
    return {
      ideaData: null,
      deleteDialog: false
    }
  },

  props: {
    idea: null
  },

  components: {
    IdeaCard: () => import('../components/IdeaCard'),
    DeleteConfirm: () => import('../components/DeleteConfirm.vue')
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas', {
      ideasFind: 'find',
      ideasGet: 'get'
    }),

    ideas () {
      return this.ideasFind({ query: { reported: true } })
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas', {
      FindAction: 'find'
    }),

    async load () {
      return this.FindAction({ query: { reported: true } })
    },

    async deleteIdea (id) {
      await this.$store.dispatch('ideas/remove', [id])
    },

    async purifyIdea (idea) {
      this.ideaData = idea
      this.ideaData.reported = false
      await this.$store.dispatch('ideas/patch', [this.ideaData._id, this.ideaData, this.params])
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
    this.load()
  }
}
</script>
