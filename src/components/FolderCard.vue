<template>
  <div v-if="folder">
    <q-card
      class="cursor-pointer bg-yellow"
      @click="folderDetails = true"
    >
    <q-dialog
      v-model="folderDetails"
      transition-show="slide-up"
      transition-hide="slide-down"
      maximized
    >
        <folder-detailed :folder="folder"
        />
    </q-dialog>

      <q-card-section>
        <div>
          <h4
            class="q-ma-none text-center"
            >
            {{folder.name}}
            <q-tooltip>
              {{folder.name}}
            </q-tooltip>
          </h4>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section  style="height: 252px">
          //preview
      </q-card-section>

      <q-separator v-if="folder.description" />
      <q-card-section>
        <div v-if="folder.description" class="text-subtitle1"
          style="
            .text
          ">
          {{folder.description}}
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
export default {
  name: 'FolderCard',

  props: {
    folder: null
  },

  components: {
    FolderDetailed: () => import('./FolderDetailed.vue')
  },

  data () {
    return {
      folderDetails: false
    }
  }
}
</script>
