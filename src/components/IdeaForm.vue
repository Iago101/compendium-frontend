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
      >
        <q-card-section>
          <div class="row">
            <div class="row col-1">
              <q-icon
                class="fit"
                size="70px"
                name="arrow_back"
                @click="$emit('input', false)"
                v-if="editMode===false"
              />
              <q-icon
                class="fit"
                size="70px"
                name="cancel"
                @click="$emit('input', false); clearForm"
                v-if="editMode===true"

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
              <q-btn v-if="editMode == false" @click="submit">
                <q-icon
                    name="save"
                    size="70px"

                />
              </q-btn>
                <q-btn v-if="editMode == true" @click="update()">
                <q-icon
                    name="update"
                    size="70px"
                />
              </q-btn>
            </h5>

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

          </div>
        </q-card-section>

        <q-separator />
        <q-card-section class="row justify-center text-h6">
          <div class="col-12 row justify-around">
          <q-radio v-model="ideaData.type" val=1 label="NPC" />
          <q-radio v-model="ideaData.type" val=2 label="Item Mágico" />
          <q-radio v-model="ideaData.type" val=3 label="Local" />
          <q-radio v-model="ideaData.type" val=4 label="Simples" />
          </div>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: 400px" class="row">
           <div  class="col-6">
            imagem?
          </div>
          <q-separator vertical />
          <h3 v-if="ideaData.type==1" class="text-h5 col-5" >
            ficha component
          </h3>
          <h3 v-if="ideaData.type==2" class="text-h5 col-5" >
            item magico component
          </h3>
          <h3 v-if="ideaData.type==3" class="text-h5 col-5" >
            local component
          </h3>
          <h3 v-if="ideaData.type==4" class="text-h5 col-5" >
            simples component
          </h3>

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
    <!--
        <q-dialog v-model="alertCreate">
          <q-card>
            <q-card-section>
              <div class="text-h6">Idéia criada com sucesso!</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Idéia criada com sucesso!
              Obrigado por participar da comunidade Compendium, agora sua idéia está postada!
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Vamos lá!" color="primary" @click="dialog=false" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
</template>

<script>
import feathersClient from '../boot/feathers-client'

export default {
  name: 'IdeaForm',
  props: {
    idea: null,
    value: Boolean,
    ideaEdit: null
  },

  components: {

  },

  data () {
    return {
      editMode: false,
      alert: false,
      ideaData: {
        title: '',
        type: 4,
        description: '',
        privacy: 'public'
      }
    }
  },

  methods: {
    async submit () {
      this.error = false
      if (this.ideaData.title === null) {
        this.$alertDialog('Outra coisa', this)
        this.alert = true
        return
      }
      if (this.ideaData.description === '') {
        this.alert = true
        this.alertDesc = true
        return
      }
      try {
        await feathersClient.service('ideas-private').create(this.ideaData)
        this.alertCreate = true
        this.clearForm()
      } catch (error) {
        console.error(error)
      }
    },

    clearForm () {
      this.ideaData.title = ''
      this.ideaData.type = 4
      this.ideaData.description = ''
      this.ideaData.privacy = 'public'
    },

    onShow () {
      if (this.ideaEdit.title === null) {
        return
      }
      this.editMode = true
      this.ideaData = JSON.parse(JSON.stringify(this.ideaEdit))
    },

    async update () {
      this.error = false
      if (this.ideaData.title === '') {
        this.$alertDialog('Outra coisa', this)
        this.alert = true
        return
      }
      if (this.ideaData.description === '') {
        this.alert = true
        this.alertDesc = true
        return
      }
      try {
        await feathersClient.service('ideas-private').patch(this.ideaData._id, this.ideaData, this.params)
        this.alertCreate = true
        this.clearForm()
        this.$emit('input', false)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
