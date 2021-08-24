<template>
        <div class="row">
            <div class="row col-12 border bg-white justify-center">
              <div class="text-center col-5">
                Nome
                <q-input :readonly="visitor" v-model="sheet.attackName1" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackName2" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackName3" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackName4" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackName5" class="q-pa-sm" dense outlined />
              </div>
              <div class="text-center col-2">
                Bonus
                <q-input :readonly="visitor" v-model="sheet.attackBonus1" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackBonus2" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackBonus3" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackBonus4" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackBonus5" class="q-pa-sm" dense outlined />
              </div>
              <div class="text-center col-5">
                Dano / Tipo
                <q-input :readonly="visitor" v-model="sheet.attackType1" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackType2" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackType3" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackType4" class="q-pa-sm" dense outlined />
                <q-input :readonly="visitor" v-model="sheet.attackType5" class="q-pa-sm" dense outlined />
              </div>

              <strong class="q-mt-auto" >Ataques e Magias</strong>
            </div>

            <div class="row col-12 border bg-white justify-center">
              <div class="text-center col-2">
                <strong>P.C.</strong>
                <q-input :readonly="visitor" v-model="sheet.cooperCoins" class="q-pa-sm" dense outlined />
                <strong>P.P.</strong>
                <q-input :readonly="visitor" v-model="sheet.silverCoins" class="q-pa-sm" dense outlined />
                <strong>P.E.</strong>
                <q-input :readonly="visitor" v-model="sheet.electrumCoins" class="q-pa-sm" dense outlined />
                <strong>P.O.</strong>
                <q-input :readonly="visitor" v-model="sheet.goldCoins" class="q-pa-sm" dense outlined />
                <strong>P.L.</strong>
                <q-input :readonly="visitor" v-model="sheet.platinumCoins" class="q-pa-sm" dense outlined />
              </div>
              <textarea :readonly="visitor" v-model="sheet.equipment" class="col-10">
              </textarea>
              <strong class="text-center q-mt-auto col-12">Equipamento</strong>
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
