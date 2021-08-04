<template>
    <q-dialog
      :value="value"
      @input="$emit('input', $event)"
      @show="onShow"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="row col-1">
              <q-icon
                class="fit"
                size="70px"
                name="arrow_back"
                @click="$emit('input', false)"
                v-if="!ideaEdit"
              />
              <q-icon
                class="fit"
                size="70px"
                name="cancel"
                @click="clearForm"
                v-if="ideaEdit"
              />
            </div>
            <h2 class="q-ma-none col-8">
              <q-input
              v-model="ideaData.title"
              class="full-height"
              label="Nomeie a sua criação aqui"
              />
            </h2>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <q-btn-dropdown
              :label="ideaData.privacy"
              icon="public"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="ideaData.privacy='public'">
                    <q-item-section>
                      <q-item-label>Pública</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="ideaData.privacy='private'">
                    <q-item-section>
                      <q-item-label>Privada</q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- v-if se tiver guida -->
                  <q-item clickable v-close-popup @click="ideaData.privacy='guild'">
                    <q-item-section>
                      <q-item-label>Guilda apenas</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <q-btn v-if="!ideaEdit" @click="submit">
                <q-icon
                    name="save"
                    size="70px"
                />
              </q-btn>
                <q-btn v-if="ideaEdit" @click="update()">
                <q-icon
                    name="update"
                    size="70px"
                />
              </q-btn>
            </h5>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="row text-h6">
          <div class="col-12 row justify-around">
          <q-radio v-model="ideaData.type" val='npc' @click="ideaData = character" label="NPC" />
          <q-radio v-model="ideaData.type" val='item' label="Item Mágico" />
          <q-radio v-model="ideaData.type" val='local' label="Local" />
          <q-radio v-model="ideaData.type" val='simple' label="Simples" />
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section style="height: auto" class="row">
           <div  class="col-6">
            imagem?
          </div>
          <q-separator vertical />
          <div v-if="ideaData.type==='npc'" class="col-5 text-h5 row  q-mx-auto">
            <div class="col-12 row justify-around">
              <q-radio v-model="ideaData.character.system" val='dnd' label="DnD 5ed." />
              <q-radio v-model="ideaData.character.system" val='sistema2' label="sistema2" />
              <q-radio v-model="ideaData.character.system" val='sistema3' label="sistema3" />
            </div>
            <div class="col-12 fit">
              <div v-if="ideaData.character.system === 'dnd'">
                  <dnd-character-sheet
                    v-if="!ideaEdit"
                    :sheet="ideaData.character.record"
                    @destroy-sheet="ideaData.character.record = null"
                    @create-sheet="ideaData.character.record = $event"
                  />
                  <dnd-character-sheet
                    v-if="ideaEdit"
                    :sheet="ideaData.character.record"
                    :visitor="false"
                    @destroy-sheet="ideaData.character.record = null"
                  />
              </div>

              <div v-if="ideaData.character.system === 'sistema2'">
                sistema2
              </div>
            </div>
          </div>
          <div v-if="ideaData.type==='item'" class="text-h5  q-mx-auto col-5" >
            <item-sheet
              v-if="!ideaEdit"
              :visitor="false"
              :sheet="ideaData.item"
              @destroy-item-sheet="ideaData.item = null"
              @create-item-sheet="ideaData.item = $event"
            />
            <item-sheet
              v-if="ideaEdit"
              :sheet="ideaData.item"
              :visitor="false"
              @destroy-item-sheet="ideaData.item = null"
              />
          </div>
          <div v-if="ideaData.type==='local'" class="text-h5 col-5" >
            local component
          </div>
          <div v-if="ideaData.type==='simple'" class="text-h5 col-5" >
            simples component
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="no-padding">
          <h3
            class="text-h5"
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              max-height: 90px;
          ">
            <q-input
              type="textarea"
              v-model="ideaData.description"
              label="Descrição:"
              class="no-padding q-pt-none text-h5"
            />
          </h3>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  components: {
    DndCharacterSheet: () => import('./DndCharacterSheet.vue'),
    ItemSheet: () => import('./ItemSheet.vue')
  },
  name: 'IdeaForm',
  props: {
    value: Boolean,
    ideaEdit: null
  },

  data () {
    return {
      ideaData: {
        title: '',
        type: 'simple',
        description: '',
        privacy: 'public',
        character: {
          record: null,
          system: null
        },
        item: null
      }
    }
  },

  methods: {
    async submit () {
      this.error = false
      if (this.ideaData.title === '') {
        this.$alertDialog('Insira um Título para a idéia', this)
        return
      }
      if (this.ideaData.description === '') {
        this.$alertDialog('Insira uma Descrição para a idéia', this)
        return
      }
      try {
        this.ideaData.title = this.capitalize(this.ideaData.title)
        await this.$store.dispatch('ideas-private/create', [this.ideaData])
        this.$q.notify({ message: 'Idéia criada com sucesso!', color: 'red' })
        // redirect pra ideia simples
        this.clearForm()
      } catch (error) {
        console.error(error)
      }
    },

    clearForm () {
      this.ideaData.title = ''
      this.ideaData.type = 'simple'
      this.ideaData.description = ''
      this.ideaData.privacy = 'public'
      this.$emit('input', false)
    },

    capitalize (value) {
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },

    onShow () {
      if (!this.ideaEdit) {
        return
      }
      this.ideaData = JSON.parse(JSON.stringify(this.ideaEdit))
    },

    async update () {
      if (this.ideaData.title === '') {
        this.$alertDialog('Insira um Título para a idéia', this)
        return
      }
      if (this.ideaData.description === '') {
        this.$alertDialog('Insira uma Descrição para a idéia', this)
        return
      }
      try {
        await this.$store.dispatch('ideas-private/patch', [this.ideaData._id, this.ideaData, this.params])
        this.clearForm()
        this.$q.notify({ message: 'Idéia alterada com sucesso', color: 'red' })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
