<template>
  <div>
    <q-card v-if="idea"
      class="cursor-pointer"
      :class="{
        'bg-purple': idea.type===3,
        'bg-yellow': idea.type===2,
        'bg-grey': idea.type===1
      }"
      @click="ideasDetails = true"
    >

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

      <q-card-section  style="height: 252px">
        <div v-if="idea.type == 1">
          <CityIdea/>
        </div>
        <div v-if="idea.type == 2">
          <ItemIdea/>
        </div>
        <div v-if="idea.type == 3">
          <NPCIdea/>
        </div>
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

    <q-dialog
      v-model="ideasDetails"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
      :class="{
        'bg-purple-2': idea.type===3,
        'bg-yellow-2': idea.type===2,
        'bg-grey-2': idea.type===1
      }">
        <q-card-section>
          <div class="row">
            <q-btn
              size="10px"
              round
              class="q-mr-md"
              style="width:80px"
              label="voltar"
              color="red"
              @click="ideasDetails=false"
            />
            <h2 class="q-ma-none col-8">
              {{idea.title}}
            </h2>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn round color="red-4" label="share"/>
              </div>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <div >
                <q-btn round color="red-4" label="save"/>
              </div>
            </h5>
            <h5 class="text-center q-ml-auto q-my-none">
              <div >
                [ {{idea.creationPoints}} ]
                <q-btn round class="right" color="green" icon="navigation" />
                <br>
                Creation Points
              </div>
            </h5>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: 400px" class="row">
           <div  class="col-6">
          imagem?
          </div>
          <q-separator vertical />
          <h3 class="text-h5 col-5" >
            component desc
            <div v-if="idea.type == 1">
              <CityIdea/>
            </div>
            <div v-if="idea.type == 2">
              <ItemIdea/>
            </div>
            <div v-if="idea.type == 3">
              <NPCIdea/>
            </div>
          </h3>

        </q-card-section>

        <q-separator />

        <q-card-section>
          <h3
            class="text-h5"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              max-height: 90px;
          ">
          {{idea.description}}
          </h3>
        </q-card-section>
      </q-card>

    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'IdeaCard',
  props: {
    idea: null
  },

  components: {

  },

  data () {
    return {
      ideasDetails: null
    }
  },

  methods: {
  }
}
</script>
