<template>
    <q-card
      class="bg-yellow-2"
      @input="$emit('input', $event)"
      >
        <q-card-section>
          <div class="row">
            <div class="row col-1" v-if="viewMode!==true">
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
              {{folder.name}}
             <div class="text-h5">
             criador placeholder
             </div>
            </h2>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div>
                <q-btn
                  round
                  color="red-4"
                  label="view"
                  @click="$router.push({name: 'folderViewer', params: {id: folder._id}})"
                />
              </div>
            </h5>
          </div>
        </q-card-section>

        <q-separator />

          <q-card-section v-if="folder.description">
            <h3
              class="text-h5"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                max-height: 90px;
              ">
              {{folder.description}}
            </h3>
        </q-card-section>

        <q-separator />

        <q-card-section class="row justify-around q-mt-md">
            <div class="col-6 col-sm-3" v-for="idea in ideas.data" :key="idea._id">
                <idea-card :idea="idea" >
                </idea-card>
            </div>
        </q-card-section>
      </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FolderDetailed',
  data () {
    return {
    }
  },

  props: {
    value: Boolean,
    folder: null,
    idea: null,
    viewMode: null
  },

  components: {
    IdeaCard: () => import('../components/IdeaCard')
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicFind: 'find',
      publicGet: 'get'
    }),
    ideas () {
      return this.publicFind({ query: { folderId: this.folder._id } })
    }
  },

  methods: {
    ...mapActions('ideas-public', {
      publicFindAction: 'find'
    }),
    async load () {
      this.publicFindAction({ query: { folderId: this.folder._id } })
    }
  },

  created () {
    this.load()
  }
}
</script>
