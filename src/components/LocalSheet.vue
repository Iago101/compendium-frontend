<template>
    <div class="row item-sheet">
        <div class="row col-12 border">
            <strong class="col-12 text-center">População</strong>
            <q-input :readonly="visitor" v-model="sheet.population" class="col-6 q-mx-auto big-field"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasDesc)" >
            <strong class="col-12 text-center">Descrição</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasDesc" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasDesc" v-model="sheet.description" class="col-9 minor-text q-mx-auto"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasRelevantPlaces)">
            <strong class="col-12 text-center">Locais Relevantes</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasRelevantPlaces" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasRelevantPlaces" v-model="sheet.relevantPlaces" class="col-9 minor-text q-mx-auto"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasEconomy)">
            <strong class="col-12 text-center">Comércio e Economia</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasEconomy" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasEconomy" v-model="sheet.economy" class="col-9 minor-text q-mx-auto"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasHierarchy)">
            <strong class="col-12 text-center">Hierarquia Social</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasHierarchy" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasHierarchy" v-model="sheet.hierarchy" class="col-9 minor-text q-mx-auto"/>
        </div>
        <div class="row col-12 border" v-if="checkIfHave(sheet.hasDefenses)">
            <strong class="col-12 text-center">Exército e Defesas</strong>
            <q-checkbox v-if="!visitor" v-model="sheet.hasDefenses" class="col-2" size="xl"/>
            <textarea :readonly="visitor" v-if="sheet.hasDefenses" v-model="sheet.defenses" class="col-9 minor-text q-mx-auto"/>
        </div>
    </div>
</template>
<script>
const sheet = {
  population: 0,
  hasDesc: false,
  description: '',
  hasRelevantPlaces: false,
  relevantPlaces: '',
  hasEconomy: false,
  economy: '',
  hasHierarchy: false,
  hierarchy: '',
  hasDefenses: false,
  defenses: ''
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
    this.$emit('create-local-sheet', sheet)
  },

  beforeDestroy () {
    this.$emit('destroy-local-sheet')
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
