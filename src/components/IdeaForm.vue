<template>
    <q-dialog
      :value="value"
      @input="$emit('input', $event)"
      @show="onShow"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        class="bg-indigo-1">

        <q-card-section class="bg-indigo-10">
          <div class="row">
            <div class="row col-1">
              <q-icon
                color="white"
                class="fit"
                size="70px"
                name="arrow_back"
                @click="$emit('input', false)"
                v-if="!ideaEdit"
              />
              <q-icon
                color="white"
                class="fit"
                size="70px"
                name="cancel"
                @click="clearForm"
                v-if="ideaEdit"
              />
            </div>
            <h2 class="q-ma-none col-8 guild">
              <q-input
              borderless
                class="q-ml-md"
                label-color='white'
                :input-style="{ fontSize: '50px', height: '70px'}"
                input-class="text-white"
                v-model="ideaData.title"
                label="Nomeie a sua criação aqui"

              />
            </h2>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <q-btn-dropdown
              color="white"
              text-color="black"
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

                  <!-- <q-item clickable v-close-popup @click="ideaData.privacy='guild'">
                    <q-item-section>
                      <q-item-label>Guilda apenas</q-item-label>
                    </q-item-section>
                  </q-item> -->
                </q-list>
              </q-btn-dropdown>
            </h5>
            <h5 class="text-center q-ml-sm q-my-auto q-mx-auto">
              <q-btn v-if="!ideaEdit" @click="submit">
                <q-icon
                    color="white"
                    text-color="black"
                    name="save"
                    size="70px"
                />
              </q-btn>
                <q-btn v-if="ideaEdit" @click="update()">
                <q-icon
                    color="white"
                    text-color="black"
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
        <q-card-section class="row text-h6">
          <div class="col-12 row justify-around">
            <div v-for="tag in ideaData.tags" :key="tag._id">
              <tags-chip :tag="tag" :status="'tagged'" @removetag="removeTag(tag._id)"/>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="row text-h6">
          <div class="col-12 row justify-around">
            <div  v-for="tag in tags.data" :key="tag._id">
                <tags-chip v-if="!ideaData.tags.includes(tag)" :tag="tag" :status="null" @addtag="addTag(tag)" />
            </div>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section style="height: auto" class="row">
           <div class="col-6">
             <h3 class="q-ma-none"> Imagem </h3>
            <div v-if="ideaData.image" >
              <q-btn round color="red float-right" @click="ideaData.image=''" icon="delete" />
              <q-img
                :src="ideaData.image"
                style="max-height: 50vh"
                contain
              />
            </div>
            <div class="q-mt-md col-6">
              URL da imagem:
              <q-input v-model="ideaData.image"/>
            </div>
          </div>
          <q-separator vertical />
          <div v-if="ideaData.type==='npc'" class="col-5 text-h5 row  q-mx-auto">
            <div class="col-12 row justify-around">
              <q-radio v-model="ideaData.character.system" val='dnd' label="D&D 5ed." />
              <!-- <q-radio v-model="ideaData.character.system" val='sistema2' label="sistema2" />
              <q-radio v-model="ideaData.character.system" val='sistema3' label="sistema3" /> -->
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
          <div v-if="ideaData.type==='local'" class="text-h5 q-mx-auto  col-5" >
            <local-sheet
              :sheet="ideaData.local"
              v-if="!ideaEdit"
              @destroy-local-sheet="ideaData.local = null"
              @create-local-sheet="ideaData.local = $event"
            />
            <local-sheet
              :sheet="ideaData.local"
              v-if="ideaEdit"
              @destroy-local-sheet="ideaData.local = null"
            />
          </div>
          <div v-if="ideaData.type==='simple'" class="text-h5 col-5 q-ml-md" >
            <!-- <q-card-section class="no-padding">
              <h3 class="q-ma-none">Descrição: </h3>
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
                  label="Qual é a sua idéia?"
                  class="no-padding q-pt-none text-h5"
                />
              </h3>
            </q-card-section> -->
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section  class="no-padding q-ml-md">
          <h3 class="q-ma-none">Descrição: </h3>
              <h3
                class="text-h5"
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                ">
                <q-input
                  type="textarea"
                  v-model="ideaData.description"
                  label="Qual é a sua idéia?"
                  class="no-padding q-pt-none text-h5"
                  autogrow
                />
              </h3>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DndCharacterSheet: () => import('./Dnd/DndCharacterSheet.vue'),
    ItemSheet: () => import('./ItemSheet.vue'),
    LocalSheet: () => import('./LocalSheet.vue'),
    TagsChip: () => import('./TagsChip.vue')
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
        item: null,
        local: null,
        image: null,
        tags: []
      }
    }
  },

  computed: {
    ...mapGetters('tags', {
      privateFind: 'find'
    }),
    tags () {
      return this.privateFind()
    }
  },

  created () {
    this.load()
  },

  methods: {
    ...mapActions('tags', {
      privateFindAction: 'find'
    }),
    async load () {
      try {
        this.privateFindAction()
      } catch {
      }
    },

    addTag (tag) {
      const aux = this.ideaData.tags.length
      this.$set(this.ideaData.tags, aux, tag)
    },

    removeTag (tag) {
      this.ideaData.tags = this.ideaData.tags.filter(el => el._id !== tag)
    },

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
