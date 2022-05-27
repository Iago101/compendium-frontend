<template>
    <q-page
        v-if="isAuthenticated && user.permissions.includes('super_admin')"
        class="row bg-indigo-2"
    >
    <div class="col-2">
        <navigation-menu />
      </div>
    <div class="col-6 col-sm-3 q-mx-auto q-mt-lg" v-for="feedback in feedbacks.data" :key="feedback._id">
                <div class="bg-white">
                  {{feedback.text}}
                </div>
                <div class="row justify-around q-mt-sm" >
                    <q-btn
                        color="red"
                        round
                        size="lg"
                        icon="delete"
                        @click="deleteDialog = true"
                    />
                    <delete-confirm :dialog="deleteDialog" @canceled="deleteDialog=false" @confirmed="purge(feedback._id)"/>
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
      deleteDialog: false
    }
  },

  props: {
  },

  components: {
    DeleteConfirm: () => import('../components/DeleteConfirm.vue'),
    NavigationMenu: () => import('../components/NavigationMenu.vue')

  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('feedback', {
      feedbackFind: 'find'
    }),
    feedbacks () {
      return this.feedbackFind()
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('feedback', {
      FeedbackFindAction: 'find'
    }),
    async purge (id) {
      await this.$store.dispatch('feedback/remove', [id])
    },
    async loadFeedbacks () {
      return this.FeedbackFindAction()
    }
  },
  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
    this.loadFeedbacks()
  }
}
</script>
