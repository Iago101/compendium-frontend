
<template>
  <q-page class="texbgm row">
      <div class="col-2">
        <navigation-menu />
      </div>

    <div class="row justify-center col-10" style="height: 36px">
      <div class="col-12 bg-indigo-4">
        <div v-for="tag in tags.data" :key="tag._id">
          <tags-chip :tag="tag" :status="'display'"/>
        </div>
      </div>

      <div class="col-12">
        <div class="row q-col-gutter-md" v-if="!isAuthenticated">
          <div class="col-6 col-sm-2 q-ml-md q-mt-md"  v-for="idea in publicList" :key="idea._id">
            <idea-card :idea="idea">
            </idea-card>
          </div>
        </div>

        <div class="row q-col-gutter-md" v-if="isAuthenticated">
          <div class="col-6 col-sm-2 q-ml-md q-mt-md">
            <q-card
              class="cursor-pointer bg-indigo-9 text-white"
              @click="ideasCreateDetails = true"
            >
              <IdeaForm v-model="ideasCreateDetails"/>

                <q-card-section>
                  <div class="row">
                    <h6
                      class="q-ma-none"
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 150px;
                      ">
                      Crie sua idéia
                      <q-tooltip>
                        Crie sua própria idéia
                      </q-tooltip>
                    </h6>
                    <h6 class="text-center q-ml-auto q-ma-none">

                    </h6>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section class="row justify-center bg-indigo-6" style="height: 150px">
                      <q-icon
                      name="add"
                      size="100px"
                      class="q-my-auto"
                      />
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <div class="text-subtitle1"
                    style="
                      overflow: hidden;
                      text-overflow: ellipsis;
                      max-height: 90px;
                  ">
                    Compartilhe suas idéias e poste a sua criatividade!
                  </div>
                </q-card-section>
              </q-card>
            </div>

          <div class="col-6 col-sm-2 q-mt-md q-ml-md"  v-for="idea in privateList" :key="idea._id">
            <idea-card :idea="idea" >
            </idea-card>
          </div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  components: {
    IdeaCard: () => import('../components/IdeaCard'),
    IdeaForm: () => import('../components/IdeaForm.vue'),
    NavigationMenu: () => import('../components/NavigationMenu.vue'),
    TagsChip: () => import('../components/TagsChip.vue')
  },

  watch: {
    isAuthenticated: {
      immediate: true,
      handler () {
        if (this.isAuthenticated) {
          this.find()
        } else {
          this.publicFind()
        }
      }
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
    this.load()
  },

  data () {
    return {
      id: '',
      aux: null,
      ideasCreateDetails: null
    }
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicList: 'list',
      publicGet: 'get'
    }),
    ...mapGetters('ideas-private', {
      privateList: 'list',
      privateGet: 'get'
    }),
    ...mapGetters('tags', {
      publicFindTags: 'find'
    }),
    tags () {
      return this.publicFindTags()
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-private', ['patch', 'find']),
    ...mapActions('ideas-public', {
      publicFind: 'find'
    }),
    ...mapActions('tags', {
      publicFindAction: 'find'
    }),

    async load () {
      try {
        this.publicFindAction()
      } catch {
      }
    },

    filterIdeas (tag) {
      console.log(tag)
      if (this.isAuthenticated) {
        this.find({ query: { tags: tag } })
      } else {
        this.publicFind({ query: { tags: tag } })
      }
    }
  }
}
</script>
<style >
.texbgm {
    background-image: url("../img/woodtex.jpg");
    background-repeat: repeat-y;

    position: fixed;
    top: 70px;

    width: 100vw; /* viewport width */
    overflow-x: hidden;
    overflow-y: scroll;
}

</style>
