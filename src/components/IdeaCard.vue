<template>
  <div>
    <q-card v-if="idea"
      class="cursor-pointer"
      :class="{
        'bg-indigo-4': idea.type==='local',
        'bg-yellow-4': idea.type==='item',
        'bg-grey-5': idea.type==='npc'
      }"
      @click="ideasDetails = true"
    >
    <q-dialog
      v-model="ideasDetails"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down">
        <idea-detailed
          :idea="idea"
        />
    </q-dialog>

      <q-card-section class="bg-indigo-9 text-white">
        <div class="row">
          <h6
            class="q-ma-none clamp"
            >
            {{idea.title}}
            <q-tooltip>
              {{idea.title}}
            </q-tooltip>
          </h6>
          <h6 class="text-center q-ml-auto q-ma-none">
            {{idea.creationPoints}}
          </h6>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section v-if="!idea.image" style="height: 200px" >
        <div class="text-subtitle1 desc">
          {{idea.description}}
        </div>
      </q-card-section>

      <q-card-section v-if="idea.image"  class="no-padding">
        <q-img
            :src=idea.image
            scale-down
            style="max-height: 200px"
          />
      </q-card-section>
      <q-separator/>
      <q-card-section v-if="idea.image">
        <div class="text-subtitle1 clamp">
          {{idea.description}}
        </div>
      </q-card-section>

      <q-separator />
    </q-card>

  </div>
</template>

<script>
export default {
  name: 'IdeaCard',
  props: {
    idea: null,
    value: Boolean
  },

  components: {
    IdeaDetailed: () => import('./IdeaDetailed.vue')
  },

  data () {
    return {
      ideasDetails: false
    }
  }
}
</script>
