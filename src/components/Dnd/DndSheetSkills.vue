<template>
        <div class="row">
            <div class="border col-11 q-mt-sm row" style="height:300px">
              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox :disable="visitor"  v-model="sheet.proefStr" value="false" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" v-model.number="sheet.strSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Força</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox :disable="visitor" v-model="sheet.proefDex" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" v-model.number="sheet.dexSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Destreza</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox :disable="visitor" v-model="sheet.proefCon" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" v-model.number="sheet.conSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Constituição</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox :disable="visitor" v-model="sheet.proefInt" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" v-model.number="sheet.intSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Inteligência</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox :disable="visitor" v-model="sheet.proefWis" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" v-model.number="sheet.wisSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Sabedoria</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox :disable="visitor" v-model="sheet.proefChar" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" v-model.number="sheet.charSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Carisma</div>
              </div>
              <div class="col-12 text-subtitle2 q-mt-md text-center"> <strong>Salvaguardas</strong> </div>
            </div>

            <div class="border col-12 q-mt-sm row" >
              <div class="col-12 row text-subtitle2 " >
                <q-checkbox :disable="visitor" v-model="sheet.proefAcrobatics" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.acrobaticsSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Acrobacia (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefArcana" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.arcanaSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Arcanismo (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefAtletism" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.atletismSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Atletismo (For)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefActing" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.actingSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Atuação (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefBluff" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.bluffSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Blefar (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefStealth" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.stealthSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Furtividade (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefHistory" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.historySkill" type="number" class="col-3"/>
                <div class="q-mt-auto">História (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefIntimidation" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.intimidationSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Intimidação (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefInsight" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.insightSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Intuição (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefInvestigation" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.investigationSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Investigação (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefAnimalHandling" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.animalHandlingSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Lidar com Animais (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefMedicine" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.medicineSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Medicina (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefNature" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.natureSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Natureza (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefPerception" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.perceptionSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Percepção (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefPersuasion" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.persuasionSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Persuasão (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefSleightOfHand" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.sleightOfHandSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Prestidigitação (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefReligion" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.religionSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Religião (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox :disable="visitor" v-model="sheet.proefSurvival" class="col-2 q-my-auto" />
                <q-input :readonly="visitor" dense v-model.number="sheet.survivalSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Sobrevivência (Sab)</div>
              </div>
              <div class="col-12 text-subtitle2 q-mt-md text-center"> <strong>Perícias</strong> </div>
            </div>
        </div>
</template>
<script>
export default {
  props: {
    sheet: null,
    creator: null,
    visitor: Boolean
  }
}
</script>
