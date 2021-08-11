<template>
    <div class="row item-sheet">
        <div class="row col-12 border" v-if="checkIfHave(sheet.doesDamage)">
            <strong class="col-12 text-center">Dano</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.doesDamage" class="col-2" size="xl"/>
            <q-input :readonly="visitor" v-if="sheet.doesDamage" v-model="sheet.damage" class="col-10 q-mx-auto big-field"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasCharges)" >
            <strong class="col-12 text-center">Cargas</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasCharges" class="col-2" size="xl"/>
            <q-input :readonly="visitor" v-if="sheet.hasCharges" v-model.number="sheet.charges" type="number" input-class="big-field" class="q-mx-auto col-2"/>
            <q-input :readonly="visitor" v-if="sheet.hasCharges" v-model="sheet.perWhen" class="col-8 big-text q-mx-auto q-mx-auto"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasOrigin)">
            <strong class="col-12 text-center">Origem</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasOrigin" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasOrigin" v-model="sheet.origin" class="col-9 minor-text q-mx-auto"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasUtilization)">
            <strong class="col-12 text-center">Utilização</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasUtilization" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasUtilization" v-model="sheet.utilization" class="col-9 minor-text q-mx-auto"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasRules)">
            <strong class="col-12 text-center">Regras</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasRules" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasRules" v-model="sheet.rules" class="col-9 minor-text q-mx-auto"/>
        </div>
    </div>
</template>
<script>
const sheet = {
  doesDamage: false,
  damage: '',
  hasCharges: false,
  charges: 0,
  perWhen: 'Por dia',
  hasOrigin: false,
  origin: '',
  hasUtilization: false,
  utilization: '',
  hasRules: false,
  rules: ''
}
export default {

  data () {
    return {
      field: true
    }
  },

  methods: {
    checkIfHave (field) {
      if (field) {
        return true
      }
      if (!this.visitor) {
        return true
      }
      return false
    }
  },

  props: {
    sheet: null,
    visitor: Boolean
  },

  created () {
    this.$emit('create-item-sheet', sheet)
  },

  beforeDestroy () {
    this.$emit('destroy-item-sheet')
  }

}
</script>
<style lang="sass">
.item-sheet
  .border
    border: 2px solid black
    border-radius: 10px

  .big-field
    text-align: center
    font-size: 40px

  .big-text
    font-size: 30px

  .minor-text
    font-size: 20px

</style>
