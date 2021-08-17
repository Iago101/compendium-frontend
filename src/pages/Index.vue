
<template>
  <q-page class=" row bg-purple-2">
      <div class="col-2">
        menu lateral mto foda incoming
      </div>
    <div class="row justify-center col-10 q-mt-sm">
      <div class="col-12">
        <div class="row q-col-gutter-md" v-if="!isAuthenticated">
          <div class="col-6 col-sm-3"  v-for="idea in publicList" :key="idea._id">
            <idea-card :idea="idea">
            </idea-card>
          </div>
          <div class="col-6 col-sm-3"  v-for="folder in publicFolderList" :key="folder._id">
            <folder-card :folder="folder"/>
          </div>
        </div>

        <div class="row q-col-gutter-md" v-if="isAuthenticated">
          <div class="col-6 col-sm-3">
            <q-card
                class="cursor-pointer bg-blue"
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

                <q-card-section class="row justify-center" style="height: 252px">
                      <q-icon
                      name="add"
                      size="150px"
                      class="q-my-auto"
                      />
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <div class="text-subtitle1 line-break:normal"
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

          <div class="col-6 col-sm-3"  v-for="folder in privateFolderList" :key="folder._id">
            <folder-card :folder="folder" />
          </div>

          <div class="col-6 col-sm-3"  v-for="idea in privateList" :key="idea._id">
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
    FolderCard: () => import('../components/FolderCard')
  },

  watch: {
    isAuthenticated: {
      immediate: true,
      handler () {
        if (this.isAuthenticated) {
          this.find()
          this.privateFolderFind()
        } else {
          this.publicFind()
          this.publicFolderFind()
        }
      }
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
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
    ...mapGetters('folders-public', {
      publicFolderList: 'list',
      publicFolderGet: 'get'
    }),
    ...mapGetters('folders-private', {
      privateFolderList: 'list',
      privateFolderGet: 'get'
    })
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('ideas-private', ['patch', 'find']),
    ...mapActions('ideas-public', {
      publicFind: 'find'
    }),
    ...mapActions('folders-private', {
      privateFolderFind: 'find'
    }),
    ...mapActions('folders-public', {
      publicFolderFind: 'find'
    })
  }
}
</script>
