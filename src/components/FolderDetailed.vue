<template>
    <q-card
      class="bg-yellow-2"
      @input="$emit('input', $event)"
      >
        <q-card-section>
          <div class="row">
            <div class="row col-1">
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
                  @click="$router.push({name: 'viewer', params: {id: idea._id}})"
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

        <q-card-section class="row">
            <div class="col-6 col-sm-3"  v-for="idea in publicList && idea.folderId === folder._id" :key="idea._id">
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
    idea: null
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    ...mapGetters('ideas-public', {
      publicList: 'list',
      publicGet: 'get'
    })
  },

  methods: {
    ...mapActions('ideas-public', {
      publicFind: 'find'
    })
  }
}
</script>
