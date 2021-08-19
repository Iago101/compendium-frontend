<template>
        <div class="row">
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Força
              <q-input :readonly="visitor"
                v-model.number="sheet.str"
                dense
                borderless
                input-class="big-field"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input :readonly="visitor"
                outlined
                v-model.number="sheet.strMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="big-field q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Destreza
              <q-input :readonly="visitor"
                v-model.number="sheet.dex"
                dense
                borderless
                input-class="big-field"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input :readonly="visitor"
                outlined
                v-model.number="sheet.dexMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="big-field q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Constituição
              <q-input :readonly="visitor"
                v-model.number="sheet.con"
                dense
                borderless
                input-class="big-field"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input :readonly="visitor"
                outlined
                v-model.number="sheet.conMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="big-field q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Inteligência
              <q-input :readonly="visitor"
                v-model.number="sheet.int"
                dense
                borderless
                input-class="big-field"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input :readonly="visitor"
                outlined
                v-model.number="sheet.intMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="big-field q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Sabedoria
              <q-input :readonly="visitor"
                v-model.number="sheet.wis"
                dense
                borderless
                input-class="big-field"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input :readonly="visitor"
                outlined
                v-model.number="sheet.wisMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="big-field q-mb-none"
                class="col-7 q-mx-auto"
               />
            </div>
            <div class="bg-white col-10 q-my-sm row text-h6 q-mx-auto justify-center border">
              Carisma
              <q-input :readonly="visitor"
                v-model.number="sheet.char"
                dense
                borderless
                input-class="big-field"
                maxlength="2"
                type="number"
                class="col-8"
              />
              <q-input :readonly="visitor"
                outlined
                v-model.number="sheet.charMod"
                maxlength="1"
                type="number"
                round
                size="lg"
                input-class="big-field q-mb-none"
                class="col-7 q-mx-auto"
               />
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
