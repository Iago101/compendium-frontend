<template>
  <div>
    <q-btn label="editar ficha" @click="seeSheet=true" class="fit"/>

    <q-dialog v-model="seeSheet" full-height>
      <q-card v-if="sheet" class="row" style="width: 1200px; max-width: 80vw;">

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
            <div class=" bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border" >
              Força
              <q-input
                v-model.number="sheet.str"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                dense
                v-model.number="sheet.strMod"
                maxlength="1"
                type="number"
                rounded
                class="col-7 border q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border" >
              Destreza
              <q-input
                v-model.number="sheet.dex"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                dense
                v-model.number="sheet.dexMod"
                maxlength="1"
                type="number"
                rounded
                class="col-7 border q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border" >
              Constituição
              <q-input
                v-model.number="sheet.cons"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                dense
                v-model.number="sheet.consMod"
                maxlength="1"
                type="number"
                rounded
                class="col-7 border q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border" >
              Inteligência
              <q-input
                v-model.number="sheet.int"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                dense
                v-model.number="sheet.intMod"
                maxlength="1"
                type="number"
                rounded
                class="col-7 border q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border" >
              Sabedoria
              <q-input
                v-model.number="sheet.wis"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                dense
                v-model.number="sheet.wisMod"
                maxlength="1"
                type="number"
                rounded
                class="col-7 border q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border" >
              Carisma
              <q-input
                v-model.number="sheet.char"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input
                dense
                v-model.number="sheet.charMod"
                maxlength="1"
                type="number"
                rounded
                class="col-7 border q-mx-auto"
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
                 <q-input v-model.number="sheet.proef" type="number" />
              </div>
              <div class="col-8 text-center text-h6 q-my-auto">
                Proeficiência
              </div>
            </div>

            <div class="border col-11 q-mt-sm row" style="height:300px">
              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.profStr" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.strSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Força</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.profDex" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.dexSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Destreza</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.profCon" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.conSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Constituição</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.profInt" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.intSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Inteligência</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.profWis" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.wisSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Sabedoria</div>
              </div>

              <div class="col-12 row text-subtitle2 " style="height:40px">
                <q-checkbox v-model="sheet.profChar" class="col-2 q-my-auto" />
                <q-input v-model.number="sheet.charSave" type="number" dense class="col-3"/>
                <div class="q-mt-auto">Carisma</div>
              </div>
              <div class="col-12 text-subtitle2 q-mt-md text-center"> Salvaguardas </div>
            </div>

            <div class="border col-12 q-mt-sm row" >
              <div class="col-12 row text-subtitle2 " >
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Acrobacia (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Arcanismo (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Atletismo (For)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Atuação (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Blefar (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Furtividade (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">História (Int</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Intimidação (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Intuição (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Investigação (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Lidar com Animais (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Medicina (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Natureza (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Percepção (Sab)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Persuasão (Car)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Prestidigitação (Des)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
                <div class="q-mt-auto">Religião (Int)</div>
              </div>

              <div class="col-12 row text-subtitle2 ">
                <q-checkbox class="col-2 q-my-auto" />
                <q-input dense v-model.number="sheet.acroSkill" type="number" class="col-3"/>
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
                Percepção Passiva
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

export default {
  data () {
    return {
      seeSheet: null
    }
  },

  props: {
    sheet: null
  },

  created () {
    this.$emit('createSheet', { name: '' })
  },

  beforeDestroy () {
    this.$emit('destroySheet')
  }

}
</script>
<style>

    .border{
      border: 2px solid black;
      border-radius: 10px;
    }
</style>
