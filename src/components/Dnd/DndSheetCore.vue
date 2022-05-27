<template>
    <div>
    <q-btn label="Ver Ficha" @click="seeSheet=true" color="indigo" class="fit"/>

    <q-dialog v-model="seeSheet" @show="onShow" full-height>
      <q-card v-if="sheet" class="sheet row " style="width: 1300px; max-width: 90vw;">
        <div class="col-12 row q-mt-md q-mb-xl">
          <div class="col-5 row justify-around">
            <q-input :readonly="visitor" hint="Nome do Personagem" class="col-10 q-my-auto" v-model="sheet.name"/>
          </div>
          <div class="col-6 row">
            <q-input :readonly="visitor" hint="Classe & Nível" class="col-4" v-model="sheet.classLevel"/>
            <q-input :readonly="visitor" hint="Background" class="col-4" v-model="sheet.background"/>
            <q-input :readonly="visitor" hint="Nome do Jogador" class="col-4" v-model="sheet.playerName"/>
            <q-input :readonly="visitor" hint="Raça" class="col-4" v-model="sheet.race"/>
            <q-input :readonly="visitor" hint="Alinhamento" class="col-4" v-model="sheet.alignement"/>
            <q-input :readonly="visitor" hint="Experiência" class="col-4" v-model="sheet.xp"/>
          </div>
        </div>

        <div class="col-12 col-sm-4 row justify-around">
          <div class="col-5 row bg-grey-6">
            <dnd-sheet-attributes :sheet="sheet" :creator="creator" :visitor="visitor" />
          </div>

          <div class="col-7 justify-center row">
            <div class="border col-10 q-mt-sm row" style="height:60px">
              <div class="col-3">
                <q-checkbox :disable="visitor" v-model="sheet.inspiration" size="xl"/>
              </div>
              <div class="col-8 text-center text-h6 q-my-auto">
                Inspiração
              </div>
            </div>

            <div class="border col-10 q-mt-sm row" style="height:60px">
              <div class="col-3">
                 <q-input :readonly="visitor" v-model.number="sheet.proef" borderless input-class="big-field" type="number" />
              </div>
              <div class="col-8 text-center text-h6 q-my-auto"
              >
                Proeficiência
              </div>
            </div>

            <dnd-sheet-skills :sheet="sheet" :creator="creator" :visitor="visitor" />
          </div>

            <div class="border col-11 q-mt-md row" style="height:60px">
              <div class="col-3">
                 <q-input :readonly="visitor" v-model.number="sheet.passivePerception" borderless type="number" input-class="big-field" />
              </div>
              <div class="col-8 text-center text-h6 q-my-auto">
                Percepção Passiva (Sab)
              </div>
            </div>

            <div class="border text-center col-11 q-mt-md">
              <q-input :readonly="visitor"
                v-model="sheet.otherProef"
                autogrow
                borderless/>
              <strong class=" q-mt-auto col-12">Idiomas e Outras Proeficiências</strong>
            </div>
        </div>

        <div class="col-12 col-sm-4 row">
          <div class="row bg-grey-6 justify-around">
            <div class="justify-around row col-12 text-center q-mt-sm" style="height: 90px">
              <div class="col-3 row border bg-white justify-center">
                <q-input :readonly="visitor" v-model.number="sheet.armorClass" type="number" borderless input-class="big-field"/>
                <strong>C.A.</strong>
              </div>
              <div class="col-3 row border bg-white justify-center">
                <q-input :readonly="visitor" v-model.number="sheet.initiative" type="number" borderless input-class="big-field"/>
                <strong>Iniciativa</strong>
              </div>
              <div class="col-3 row border bg-white justify-center">
                <q-input :readonly="visitor" v-model="sheet.movement" borderless input-class="big-field"/>
                <strong>Deslocamento</strong>
              </div>
            </div>

            <div class="col-11 row border bg-white justify-center" style="height:200px">
              <div class="col-12 row" style="height: 60px">
                  <strong class="col-5 q-ml-md q-my-auto">
                    Pontos de Vida Totais
                  </strong>
                  <q-input :readonly="visitor"
                    borderless
                    dense
                    outlined
                    v-model.number="sheet.totalHP"
                    type="number"
                    class="q-my-auto col-6"
                  />
              </div>
              <q-input :readonly="visitor"
                type="number"
                v-model.number="sheet.currentHP"
                borderless
                input-class="big-field"
              />
              <strong>Pontos de Vida Atuais</strong>
            </div>

            <div class="col-11 row border bg-white justify-center" style="height:100px">
              <q-input :readonly="visitor"
                 type="number"
                 v-model.number="sheet.tempHP"
                 borderless
                 input-class="big-field"
                />
                <strong>Pontos de Vida Temporários</strong>
            </div>

            <div class="col-5 row border bg-white justify-center" style="height:150px">
              <div class="col-12 row" style="height: 60px">
                <strong class="col-4 q-ml-md q-my-auto">
                  Total
                </strong>
                <q-input :readonly="visitor"
                 borderless
                 dense
                 outlined
                 type="number"
                 v-model.number="sheet.totalDie"
                 class="q-my-auto col-6"
                />
              </div>
              <q-input :readonly="visitor"
                type="number"
                v-model.number="sheet.lifeDie"
                borderless
                input-class="big-field"
              />
                <strong>Dados de Vida</strong>
            </div>

            <div class="col-5 row border bg-white justify-center" style="height:150px">
              <div class="col-12 row" style="height: 60px">
                <strong class="col-4 q-ml-sm q-my-auto">Sucessos</strong>
                <div class="col-7 q-my-auto">
                  <q-checkbox :disable="visitor" v-model="sheet.deathSaveSucess1"  size="xs"/>
                  <q-checkbox :disable="visitor" v-model="sheet.deathSaveSucess2" size="xs"/>
                  <q-checkbox :disable="visitor" v-model="sheet.deathSaveSucess3" size="xs"/>
                </div>
              </div>
              <div class="col-12 row" style="height: 60px">
                <strong class="col-4 q-ml-sm q-my-auto">Falhas</strong>
                <div class="col-7 q-my-auto">
                  <q-checkbox :disable="visitor" v-model="sheet.deathSaveFail1" size="xs"/>
                  <q-checkbox :disable="visitor" v-model="sheet.deathSaveFail2" size="xs"/>
                  <q-checkbox :disable="visitor" v-model="sheet.deathSaveFail3" size="xs"/>
                </div>
              </div>
                <strong>Testes Contra a Morte</strong>
            </div>

          </div>

            <dnd-sheet-equipment :sheet="sheet" :creator="creator" :visitor="visitor"/>
        </div>

        <div class="col-12 col-sm-4 row justify-around">
          <div class="col-12 bg-grey-6 q-py-md row justify-center" style="height: 600px">
            <div class="col-11 bg-white row border" style="height:130px">
              <textarea :readonly="visitor" v-model="sheet.traits" borderless style="max-height:100px" class="col-12" />
              <strong class="text-center q-mt-auto col-12"> Traços de Personalidade </strong>
            </div>
            <div class="col-11 q-mt-sm bg-white row border" style="height:130px">
              <textarea :readonly="visitor" v-model="sheet.ideals" borderless style="max-height:100px" class="col-12" />
              <strong class="text-center q-mt-auto col-12"> Ideais </strong>
            </div>
            <div class="col-11 q-mt-sm bg-white row border" style="height:130px">
              <textarea :readonly="visitor" v-model="sheet.bonds" borderless style="max-height:100px" class="col-12" />
              <strong class="text-center q-mt-auto col-12"> Ligações </strong>
            </div>
            <div class="col-11 q-mt-sm bg-white row border" style="height:130px">
              <textarea :readonly="visitor" v-model="sheet.flaws" borderless style="max-height:100px" class="col-12" />
              <strong class="text-center q-mt-auto col-12"> Defeitos</strong>
            </div>
          </div>

          <div class="col-11 bg-white row border" >
            <textarea :readonly="visitor" v-model="sheet.abilities" borderless class="col-12" style="max-height:60vw; height:60vw;" />
            <strong class="text-center q-mt-auto col-12"> Características e Habilidades</strong>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DndSheetAttributes from './DndSheetAttributes.vue'
import DndSheetEquipment from './DndSheetEquipment.vue'
import DndSheetSkills from './DndSheetSkills.vue'

export default {

  data () {
    return {
      seeSheet: null
    }
  },

  computed: {
    ...mapGetters('auth', ['user'])
  },

  components: { DndSheetAttributes, DndSheetSkills, DndSheetEquipment },

  methods: {
    // onShow () {
    //   if (this.creator && this.creator === this.user._id) {
    //     this.visitor = false
    //   }
    // }
  },

  props: {
    sheet: null,
    creator: null,
    visitor: Boolean
  }

}
</script>
