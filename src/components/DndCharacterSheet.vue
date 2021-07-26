<template>
  <div >
    <q-btn label="editar ficha" @click="seeSheet=true" class="fit"/>

    <q-dialog v-model="seeSheet" full-height>
      <q-card v-if="sheet" class="dnd-character-sheet row" style="width: 1200px; max-width: 80vw;">

        <div class="col-12 row q-mt-md q-mb-xl">
          <div class="col-5 row justify-around">
            <q-input hint="Nome do Personagem" class="col-10 q-my-auto" v-model="sheet.name"/>
          </div>
          <div class="col-6 row">
            <q-input hint="Classe & Nível" class="col-4" v-model="sheet.classLevel"/>
            <q-input hint="Background" class="col-4" v-model="sheet.background"/>
            <q-input hint="Nome do Jogador" class="col-4" v-model="sheet.playerName"/>
            <q-input hint="Raça" class="col-4" v-model="sheet.race"/>
            <q-input hint="Alinhamento" class="col-4" v-model="sheet.alignement"/>
            <q-input hint="Experiência" class="col-4" v-model="sheet.xp"/>
          </div>
        </div>

        <div class="col-4 row justify-around">
          <div class="col-5 row bg-grey-6">
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Força
              <q-input
                v-model.number="sheet.str"
                dense
                borderless
                input-class="bigField"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                outlined
                v-model.number="sheet.strMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="bigField q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Destreza
              <q-input
                v-model.number="sheet.dex"
                dense
                borderless
                input-class="bigField"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                outlined
                v-model.number="sheet.dexMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="bigField q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Constituição
              <q-input
                v-model.number="sheet.con"
                dense
                borderless
                input-class="bigField"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                outlined
                v-model.number="sheet.conMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="bigField q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Inteligência
              <q-input
                v-model.number="sheet.int"
                dense
                borderless
                input-class="bigField"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                outlined
                v-model.number="sheet.intMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="bigField q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Sabedoria
              <q-input
                v-model.number="sheet.wis"
                dense
                borderless
                input-class="bigField"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                outlined
                v-model.number="sheet.wisMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="bigField q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Carisma
              <q-input
                v-model.number="sheet.char"
                dense
                borderless
                input-class="bigField"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                outlined
                v-model.number="sheet.charMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="bigField q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
          </div>

          <div class="col-7 justify-center row">

            <div class="border col-10 q-mt-sm row" style="height:60px">
              <div class="col-3">
                <q-checkbox v-model="sheet.inspiration" size="xl"/>
              </div>
              <div class="col-8 text-center text-h6 q-my-auto">
                Inspiração
              </div>
            </div>

            <div class="border col-10 q-mt-sm row" style="height:60px">
              <div class="col-3">
                 <q-input v-model.number="sheet.proef" borderless input-class="bigField" type="number" />
              </div>
              <div class="col-8 text-center text-h6 q-my-auto"
              >
                Proeficiência
              </div>
            </div>

            <div class="border col-11 q-mt-sm row" style="height:300px">
              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.proefStr" value="false" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.strSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Força</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.proefDex" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.dexSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Destreza</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.proefCon" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.conSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Constituição</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.proefInt" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.intSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Inteligência</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.proefWis" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.wisSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Sabedoria</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.proefChar" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.charSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Carisma</div>
              </div>
              <div class="col-12 text-subtitle2 q-mt-md text-center"> Salvaguardas </div>
            </div>

            <div class="border col-12 q-mt-sm row" >
              <div class="col-12 row text-subtitle2 " >
                <q-checkbox v-model="sheet.proefAcrobatics" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acrobaticsSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Acrobacia (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefArcana" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.arcanaSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Arcanismo (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefAtletism" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.atletismSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Atletismo (For)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefActing" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.actingSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Atuação (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefBluff" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.bluffSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Blefar (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefStealth" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.stealthSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Furtividade (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefHistory" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.historySkill" type="number" class="col-3"/>
                <div class="q-mt-auto">História (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefIntimidation" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.intimidationSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Intimidação (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefInsight" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.insightSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Intuição (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefInvestigation" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.investigationSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Investigação (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefAnimalHandling" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.animalHandlingSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Lidar com Animais (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefMedicine" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.medicineSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Medicina (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefNature" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.natureSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Natureza (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefPerception" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.perceptionSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Percepção (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefPersuasion" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.persuasionSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Persuasão (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefSleightOfHand" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.sleightOfHandSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Prestidigitação (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefReligion" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.religionSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Religião (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox v-model="sheet.proefSurvival" class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.survivalSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Sobrevivência (Sab)</div>
              </div>
              <div class="col-12 text-subtitle2 q-mt-md text-center"> Perícias </div>
            </div>

          </div>
            <div class="border col-11 q-mt-md row" style="height:60px">
              <div class="col-3">
                 <q-input v-model.number="sheet.passivePerception" type="number" class="justify-center" />
              </div>
              <div class="col-8 text-center text-h6 q-my-auto">
                Percepção Passiva (Sab)
              </div>
            </div>

            <div class="border col-11 q-mt-md">
              <q-input
                v-model="sheet.otherProef"
                autogrow
                hint="Idiomas e outras Proeficiências"
              />
            </div>
        </div>

        <div class="col-4 row">
          <div class="row col-12 bg-grey-6">
            <div class="justify-around row col-12 text-center q-mt-sm" style="height: 90px">
              <div class="col-3 row">
                <q-input v-model.number="sheet.armorClass" class="border bg-white" hint="CA"/>
              </div>
              <div class="col-3 row">
                <q-input class="border bg-white" />
              </div>
              <div class="col-3 row">
                <q-input class="border bg-white" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-4">
        </div>

        {{sheet}}

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const sheet = {
  name: '',
  classLevel: '',
  background: '',
  playerName: '',
  race: '',
  alignement: '',
  xp: 0,
  inspiration: false,
  str: 10,
  strMod: 0,
  dex: 10,
  dexMod: 0,
  con: 10,
  conMod: 0,
  int: 10,
  intMod: 0,
  wis: 10,
  wisMod: 0,
  char: 10,
  charMod: 0,
  proef: 0,
  proefStr: false,
  strSave: 0,
  proefDex: false,
  dexSave: 0,
  proefCon: false,
  conSave: 0,
  proefInt: false,
  intSave: 0,
  proefWis: false,
  wisSave: 0,
  proefChar: false,
  charSave: 0,
  proefAcrobatics: false,
  acrobaticsSkill: 0,
  proefArcana: false,
  arcanaSkill: 0,
  proefAtletism: false,
  atletismSkill: 0,
  proefActing: false,
  actingSkill: 0,
  proefBluff: false,
  bluffSkill: 0,
  proefStealth: false,
  stealthSkill: 0,
  proefHistory: false,
  historySkill: 0,
  proefIntimidation: false,
  intimidationSkill: 0,
  proefInsight: false,
  insightSkill: 0,
  proefInvestigation: false,
  investigationSkill: 0,
  proefAnimalHandling: false,
  animalHandlingSkill: 0,
  proefMedicine: false,
  medicineSkill: 0,
  proefNature: false,
  natureSkill: 0,
  proefPerception: false,
  perceptionSkill: 0,
  proefPersuasion: false,
  persuasionSkill: 0,
  proefSleightOfHand: false,
  sleightOfHandSkill: 0,
  proefReligion: false,
  religionSkill: 0,
  proefSurvival: false,
  survivalSkill: 0,
  passivePerception: 10
}
export default {
  data () {
    return {
      seeSheet: null
    }
  },

  props: {
    sheet: null
  },

  watch: {
    'sheet.str' () {
      this.sheet.strMod = Math.floor((this.sheet.str - 10) / 2)
    },
    'sheet.strMod' () {
      if (this.sheet.proefAtletism === true) {
        this.sheet.atletismSkill = this.sheet.strMod + this.sheet.proef
      }
      if (this.sheet.proefAtletism === false) {
        this.sheet.atletismSkill = this.sheet.strMod
      }

      if (this.sheet.proefStr === true) {
        this.sheet.strSave = this.sheet.strMod + this.sheet.proef
      }
      if (this.sheet.proefStr === false) {
        this.sheet.strSave = this.sheet.strMod
      }
    },
    'sheet.proefStr' () {
      if (this.sheet.proefStr === true) {
        this.sheet.strSave = this.sheet.strSave + this.sheet.proef
      }
      if (this.sheet.proefStr === false) {
        this.sheet.strSave = this.sheet.strMod
      }
    },
    'sheet.proefAtletism' () {
      if (this.sheet.proefAtletism === true) {
        this.sheet.atletismSkill = this.sheet.atletismSkill + this.sheet.proef
      }
      if (this.sheet.proefAtletism === false) {
        this.sheet.atletismSkill = this.sheet.strMod
      }
    },
    'sheet.dex' () {
      this.sheet.dexMod = Math.floor((this.sheet.dex - 10) / 2)
    },
    'sheet.dexMod' () {
      if (this.sheet.proefAcrobatics === true) {
        this.sheet.acrobaticsSkill = this.sheet.dexMod + this.sheet.proef
      }
      if (this.sheet.proefAcrobatics === false) {
        this.sheet.acrobaticsSkill = this.sheet.dexMod
      }

      if (this.sheet.proefStealth === true) {
        this.sheet.stealthSkill = this.sheet.dexMod + this.sheet.proef
      }
      if (this.sheet.proefStealth === false) {
        this.sheet.stealthSkill = this.sheet.dexMod
      }

      if (this.sheet.proefSleightOfHand === true) {
        this.sheet.sleightOfHandSkill = this.sheet.dexMod + this.sheet.proef
      }
      if (this.sheet.proefSleightOfHand === false) {
        this.sheet.sleightOfHandSkill = this.sheet.dexMod
      }

      if (this.sheet.proefDex === true) {
        this.sheet.dexSave = this.sheet.dexMod + this.sheet.proef
      }
      if (this.sheet.proefDex === false) {
        this.sheet.dexSave = this.sheet.dexMod
      }
    },
    'sheet.proefDex' () {
      if (this.sheet.proefDex === true) {
        this.sheet.dexSave = this.sheet.dexSave + this.sheet.proef
      }
      if (this.sheet.proefDex === false) {
        this.sheet.dexSave = this.sheet.dexMod
      }
    },
    'sheet.proefAcrobatics' () {
      if (this.sheet.proefAcrobatics === true) {
        this.sheet.acrobaticsSkill = this.sheet.acrobaticsSkill + this.sheet.proef
      }
      if (this.sheet.proefAcrobatics === false) {
        this.sheet.acrobaticsSkill = this.sheet.dexMod
      }
    },
    'sheet.proefStealth' () {
      if (this.sheet.proefStealth === true) {
        this.sheet.stealthSkill = this.sheet.stealthSkill + this.sheet.proef
      }
      if (this.sheet.proefStealth === false) {
        this.sheet.stealthSkill = this.sheet.dexMod
      }
    },
    'sheet.proefSleightOfHand' () {
      if (this.sheet.proefSleightOfHand === true) {
        this.sheet.sleightOfHandSkill = this.sheet.sleightOfHandSkill + this.sheet.proef
      }
      if (this.sheet.proefSleightOfHand === false) {
        this.sheet.sleightOfHandSkill = this.sheet.dexMod
      }
    },
    'sheet.con' () {
      this.sheet.conMod = Math.floor((this.sheet.con - 10) / 2)
    },
    'sheet.conMod' () {
      if (this.sheet.proefCon === true) {
        this.sheet.conSave = this.sheet.conMod + this.sheet.proef
      }
      if (this.sheet.proefCon === false) {
        this.sheet.conSave = this.sheet.conMod
      }
    },
    'sheet.proefCon' () {
      if (this.sheet.proefCon === true) {
        this.sheet.conSave = this.sheet.conSave + this.sheet.proef
      }
      if (this.sheet.proefCon === false) {
        this.sheet.conSave = this.sheet.conMod
      }
    },
    'sheet.int' () {
      this.sheet.intMod = Math.floor((this.sheet.int - 10) / 2)
    },
    'sheet.intMod' () {
      if (this.sheet.proefArcana === true) {
        this.sheet.arcanaSkill = this.sheet.intMod + this.sheet.proef
      }
      if (this.sheet.proefArcana === false) {
        this.sheet.arcanaSkill = this.sheet.intMod
      }

      if (this.sheet.proefHistory === true) {
        this.sheet.historySkill = this.sheet.intMod + this.sheet.proef
      }
      if (this.sheet.proefHistory === false) {
        this.sheet.historySkill = this.sheet.intMod
      }

      if (this.sheet.proefInvestigation === true) {
        this.sheet.investigationSkill = this.sheet.intMod + this.sheet.proef
      }
      if (this.sheet.proefInvestigation === false) {
        this.sheet.investigationSkill = this.sheet.intMod
      }

      if (this.sheet.proefNature === true) {
        this.sheet.natureSkill = this.sheet.intMod + this.sheet.proef
      }
      if (this.sheet.proefNature === false) {
        this.sheet.natureSkill = this.sheet.intMod
      }

      if (this.sheet.proefReligion === true) {
        this.sheet.religionSkill = this.sheet.intMod + this.sheet.proef
      }
      if (this.sheet.proefReligion === false) {
        this.sheet.religionSkill = this.sheet.intMod
      }

      if (this.sheet.proefInt === true) {
        this.sheet.intSave = this.sheet.intMod + this.sheet.proef
      }
      if (this.sheet.proefInt === false) {
        this.sheet.intSave = this.sheet.intMod
      }
    },
    'sheet.proefInt' () {
      if (this.sheet.proefInt === true) {
        this.sheet.intSave = this.sheet.intSave + this.sheet.proef
      }
      if (this.sheet.proefInt === false) {
        this.sheet.intSave = this.sheet.intMod
      }
    },
    'sheet.proefArcana' () {
      if (this.sheet.proefArcana === true) {
        this.sheet.arcanaSkill = this.sheet.arcanaSkill + this.sheet.proef
      }
      if (this.sheet.proefArcana === false) {
        this.sheet.arcanaSkill = this.sheet.intMod
      }
    },
    'sheet.proefHistory' () {
      if (this.sheet.proefHistory === true) {
        this.sheet.historySkill = this.sheet.historySkill + this.sheet.proef
      }
      if (this.sheet.proefHistory === false) {
        this.sheet.historySkill = this.sheet.intMod
      }
    },
    'sheet.proefInvestigation' () {
      if (this.sheet.proefInvestigation === true) {
        this.sheet.investigationSkill = this.sheet.investigationSkill + this.sheet.proef
      }
      if (this.sheet.proefInvestigation === false) {
        this.sheet.investigationSkill = this.sheet.intMod
      }
    },
    'sheet.proefNature' () {
      if (this.sheet.proefNature === true) {
        this.sheet.natureSkill = this.sheet.natureSkill + this.sheet.proef
      }
      if (this.sheet.proefNature === false) {
        this.sheet.natureSkill = this.sheet.intMod
      }
    },
    'sheet.proefReligion' () {
      if (this.sheet.proefReligion === true) {
        this.sheet.religionSkill = this.sheet.religionSkill + this.sheet.proef
      }
      if (this.sheet.proefReligion === false) {
        this.sheet.religionSkill = this.sheet.intMod
      }
    },
    'sheet.wis' () {
      this.sheet.wisMod = Math.floor((this.sheet.wis - 10) / 2)
    },
    'sheet.wisMod' () {
      this.sheet.passivePerception = 10 + this.sheet.wisMod

      if (this.sheet.proefInsight === true) {
        this.sheet.insightSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (this.sheet.proefInsight === false) {
        this.sheet.insightSkill = this.sheet.wisMod
      }

      if (this.sheet.proefAnimalHandling === true) {
        this.sheet.animalHandlingSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (this.sheet.proefAnimalHandling === false) {
        this.sheet.animalHandlingSkill = this.sheet.wisMod
      }

      if (this.sheet.proefMedicine === true) {
        this.sheet.medicineSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (this.sheet.proefMedicine === false) {
        this.sheet.medicineSkill = this.sheet.wisMod
      }

      if (this.sheet.proefPerception === true) {
        this.sheet.perceptionSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (this.sheet.proefPerception === false) {
        this.sheet.perceptionSkill = this.sheet.wisMod
      }

      if (this.sheet.proefSurvival === true) {
        this.sheet.survivalSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (this.sheet.proefSurvival === false) {
        this.sheet.survivalSkill = this.sheet.wisMod
      }

      if (this.sheet.proefWis === true) {
        this.sheet.wisSave = this.sheet.wisMod + this.sheet.proef
      }
      if (this.sheet.proefWis === false) {
        this.sheet.wisSave = this.sheet.wisMod
      }
    },
    'sheet.proefWis' () {
      if (this.sheet.proefWis === true) {
        this.sheet.wisSave = this.sheet.wisSave + this.sheet.proef
      }
      if (this.sheet.proefWis === false) {
        this.sheet.wisSave = this.sheet.wisMod
      }
    },
    'sheet.proefInsight' () {
      if (this.sheet.proefInsight === true) {
        this.sheet.insightSkill = this.sheet.insightSkill + this.sheet.proef
      }
      if (this.sheet.proefInsight === false) {
        this.sheet.insightSkill = this.sheet.wisMod
      }
    },
    'sheet.proefAnimalHandling' () {
      if (this.sheet.proefAnimalHandling === true) {
        this.sheet.animalHandlingSkill = this.sheet.animalHandlingSkill + this.sheet.proef
      }
      if (this.sheet.proefAnimalHandling === false) {
        this.sheet.animalHandlingSkill = this.sheet.wisMod
      }
    },
    'sheet.proefMedicine' () {
      if (this.sheet.proefMedicine === true) {
        this.sheet.medicineSkill = this.sheet.medicineSkill + this.sheet.proef
      }
      if (this.sheet.proefMedicine === false) {
        this.sheet.medicineSkill = this.sheet.wisMod
      }
    },
    'sheet.proefPerception' () {
      if (this.sheet.proefPerception === true) {
        this.sheet.perceptionSkill = this.sheet.perceptionSkill + this.sheet.proef
      }
      if (this.sheet.proefPerception === false) {
        this.sheet.perceptionSkill = this.sheet.wisMod
      }
    },
    'sheet.proefSurvival' () {
      if (this.sheet.proefSurvival === true) {
        this.sheet.survivalSkill = this.sheet.survivalSkill + this.sheet.proef
      }
      if (this.sheet.proefSurvival === false) {
        this.sheet.survivalSkill = this.sheet.wisMod
      }
    },
    'sheet.char' () {
      this.sheet.charMod = Math.floor((this.sheet.char - 10) / 2)
    },
    'sheet.charMod' () {
      if (this.sheet.proefActing === true) {
        this.sheet.actingSkill = this.sheet.charMod + this.sheet.proef
      }
      if (this.sheet.proefActing === false) {
        this.sheet.actingSkill = this.sheet.charMod
      }

      if (this.sheet.proefBluff === true) {
        this.sheet.bluffSkill = this.sheet.charMod + this.sheet.proef
      }
      if (this.sheet.proefBluff === false) {
        this.sheet.bluffSkill = this.sheet.charMod
      }

      if (this.sheet.proefIntimidation === true) {
        this.sheet.intimidationSkill = this.sheet.charMod + this.sheet.proef
      }
      if (this.sheet.proefIntimidation === false) {
        this.sheet.intimidationSkill = this.sheet.charMod
      }

      if (this.sheet.proefPersuasion === true) {
        this.sheet.persuasionSkill = this.sheet.charMod + this.sheet.proef
      }
      if (this.sheet.proefPersuasion === false) {
        this.sheet.persuasionSkill = this.sheet.charMod
      }

      if (this.sheet.proefChar === true) {
        this.sheet.charSave = this.sheet.charMod + this.sheet.proef
      }
      if (this.sheet.proefChar === false) {
        this.sheet.charSave = this.sheet.charMod
      }
    },
    'sheet.proefChar' () {
      if (this.sheet.proefChar === true) {
        this.sheet.charSave = this.sheet.charSave + this.sheet.proef
      }
      if (this.sheet.proefChar === false) {
        this.sheet.charSave = this.sheet.charMod
      }
    },
    'sheet.proefActing' () {
      if (this.sheet.proefActing === true) {
        this.sheet.actingSkill = this.sheet.actingSkill + this.sheet.proef
      }
      if (this.sheet.proefActing === false) {
        this.sheet.actingSkill = this.sheet.charMod
      }
    },
    'sheet.proefBluff' () {
      if (this.sheet.proefBluff === true) {
        this.sheet.bluffSkill = this.sheet.bluffSkill + this.sheet.proef
      }
      if (this.sheet.proefBluff === false) {
        this.sheet.bluffSkill = this.sheet.charMod
      }
    },
    'sheet.proefIntimidation' () {
      if (this.sheet.proefIntimidation === true) {
        this.sheet.intimidationSkill = this.sheet.intimidationSkill + this.sheet.proef
      }
      if (this.sheet.proefIntimidation === false) {
        this.sheet.intimidationSkill = this.sheet.charMod
      }
    },
    'sheet.proefPersuasion' () {
      if (this.sheet.proefPersuasion === true) {
        this.sheet.persuasionSkill = this.sheet.persuasionSkill + this.sheet.proef
      }
      if (this.sheet.proefPersuasion === false) {
        this.sheet.persuasionSkill = this.sheet.charMod
      }
    }
  },

  created () {
    this.$emit('createSheet', sheet)
  },

  beforeDestroy () {
    this.$emit('destroySheet')
  }

}
</script>
<style lang="scss">
.dnd-character-sheet{
  .border{
    border: 2px solid black;
    border-radius: 10px;
  }
  .bigField{
    text-align: center;
    font-size: 40px;
  }
}
</style>
