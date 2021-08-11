<template>
  <div>
    <q-card v-if="idea"
      class="cursor-pointer"
      :class="{
        'bg-purple': idea.type==='local',
        'bg-yellow': idea.type==='item',
        'bg-grey': idea.type==='npc'
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

      <q-card-section>
        <div class="row">
          <h6
            class="q-ma-none"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 150px;
            ">
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
      <q-card-section style="height: 252px" class="no-padding ">
        <q-img
            :src=idea.image
            contain
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
          {{idea.description}}
        </div>
      </q-card-section>
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
