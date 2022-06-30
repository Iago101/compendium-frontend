<template>
    <dnd-sheet-core :creator="creator" :visitor="visitor" :sheet="sheet"/>
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
  passivePerception: 10,
  armorClass: 10,
  initiative: null,
  movement: null,
  totalHP: null,
  currentHP: null,
  tempHP: null,
  lifeDie: null,
  totalDie: null,
  deathSaveSucess1: false,
  deathSaveSucess2: false,
  deathSaveSucess3: false,
  deathSaveFail1: false,
  deathSaveFail2: false,
  deathSaveFail3: false,
  attackName1: '',
  attackName2: '',
  attackName3: '',
  attackName4: '',
  attackName5: '',
  attackBonus1: '',
  attackBonus2: '',
  attackBonus3: '',
  attackBonus4: '',
  attackBonus5: '',
  attackType1: '',
  attackType2: '',
  attackType3: '',
  attackType4: '',
  attackType5: '',
  cooperCoins: 0,
  silverCoins: 0,
  electrumCoins: 0,
  goldCoins: 0,
  platinumCoins: 0,
  equipment: '',
  traits: '',
  ideals: '',
  bonds: '',
  flaws: ''
}
export default {

  components: {
    DndSheetCore: () => import('./DndSheetCore.vue')
  },

  watch: {
    'sheet.str' () {
      this.sheet.strMod = Math.floor((this.sheet.str - 10) / 2)
    },
    'sheet.strMod' () {
      if (this.sheet.proefAtletism) {
        this.sheet.atletismSkill = this.sheet.strMod + this.sheet.proef
      }
      if (!this.sheet.proefAtletism) {
        this.sheet.atletismSkill = this.sheet.strMod
      }

      if (this.sheet.proefStr) {
        this.sheet.strSave = this.sheet.strMod + this.sheet.proef
      }
      if (!this.sheet.proefStr) {
        this.sheet.strSave = this.sheet.strMod
      }
    },
    'sheet.proefStr' () {
      if (this.sheet.proefStr) {
        this.sheet.strSave = this.sheet.strSave + this.sheet.proef
      }
      if (!this.sheet.proefStr) {
        this.sheet.strSave = this.sheet.strMod
      }
    },
    'sheet.proefAtletism' () {
      if (this.sheet.proefAtletism) {
        this.sheet.atletismSkill = this.sheet.atletismSkill + this.sheet.proef
      }
      if (!this.sheet.proefAtletism) {
        this.sheet.atletismSkill = this.sheet.strMod
      }
    },
    'sheet.dex' () {
      this.sheet.dexMod = Math.floor((this.sheet.dex - 10) / 2)
    },
    'sheet.dexMod' () {
      if (this.sheet.proefAcrobatics) {
        this.sheet.acrobaticsSkill = this.sheet.dexMod + this.sheet.proef
      }
      if (!this.sheet.proefAcrobatics) {
        this.sheet.acrobaticsSkill = this.sheet.dexMod
      }

      if (this.sheet.proefStealth) {
        this.sheet.stealthSkill = this.sheet.dexMod + this.sheet.proef
      }
      if (!this.sheet.proefStealth) {
        this.sheet.stealthSkill = this.sheet.dexMod
      }

      if (this.sheet.proefSleightOfHand) {
        this.sheet.sleightOfHandSkill = this.sheet.dexMod + this.sheet.proef
      }
      if (!this.sheet.proefSleightOfHand) {
        this.sheet.sleightOfHandSkill = this.sheet.dexMod
      }

      if (this.sheet.proefDex) {
        this.sheet.dexSave = this.sheet.dexMod + this.sheet.proef
      }
      if (!this.sheet.proefDex) {
        this.sheet.dexSave = this.sheet.dexMod
      }
    },
    'sheet.proefDex' () {
      if (this.sheet.proefDex) {
        this.sheet.dexSave = this.sheet.dexSave + this.sheet.proef
      }
      if (!this.sheet.proefDex) {
        this.sheet.dexSave = this.sheet.dexMod
      }
    },
    'sheet.proefAcrobatics' () {
      if (this.sheet.proefAcrobatics) {
        this.sheet.acrobaticsSkill = this.sheet.acrobaticsSkill + this.sheet.proef
      }
      if (!this.sheet.proefAcrobatics) {
        this.sheet.acrobaticsSkill = this.sheet.dexMod
      }
    },
    'sheet.proefStealth' () {
      if (this.sheet.proefStealth) {
        this.sheet.stealthSkill = this.sheet.stealthSkill + this.sheet.proef
      }
      if (!this.sheet.proefStealth) {
        this.sheet.stealthSkill = this.sheet.dexMod
      }
    },
    'sheet.proefSleightOfHand' () {
      if (this.sheet.proefSleightOfHand) {
        this.sheet.sleightOfHandSkill = this.sheet.sleightOfHandSkill + this.sheet.proef
      }
      if (!this.sheet.proefSleightOfHand) {
        this.sheet.sleightOfHandSkill = this.sheet.dexMod
      }
    },
    'sheet.con' () {
      this.sheet.conMod = Math.floor((this.sheet.con - 10) / 2)
    },
    'sheet.conMod' () {
      if (this.sheet.proefCon) {
        this.sheet.conSave = this.sheet.conMod + this.sheet.proef
      }
      if (!this.sheet.proefCon) {
        this.sheet.conSave = this.sheet.conMod
      }
    },
    'sheet.proefCon' () {
      if (this.sheet.proefCon) {
        this.sheet.conSave = this.sheet.conSave + this.sheet.proef
      }
      if (!this.sheet.proefCon) {
        this.sheet.conSave = this.sheet.conMod
      }
    },
    'sheet.int' () {
      this.sheet.intMod = Math.floor((this.sheet.int - 10) / 2)
    },
    'sheet.intMod' () {
      if (this.sheet.proefArcana) {
        this.sheet.arcanaSkill = this.sheet.intMod + this.sheet.proef
      }
      if (!this.sheet.proefArcana) {
        this.sheet.arcanaSkill = this.sheet.intMod
      }

      if (this.sheet.proefHistory) {
        this.sheet.historySkill = this.sheet.intMod + this.sheet.proef
      }
      if (!this.sheet.proefHistory) {
        this.sheet.historySkill = this.sheet.intMod
      }

      if (this.sheet.proefInvestigation) {
        this.sheet.investigationSkill = this.sheet.intMod + this.sheet.proef
      }
      if (!this.sheet.proefInvestigation) {
        this.sheet.investigationSkill = this.sheet.intMod
      }

      if (this.sheet.proefNature) {
        this.sheet.natureSkill = this.sheet.intMod + this.sheet.proef
      }
      if (!this.sheet.proefNature) {
        this.sheet.natureSkill = this.sheet.intMod
      }

      if (this.sheet.proefReligion) {
        this.sheet.religionSkill = this.sheet.intMod + this.sheet.proef
      }
      if (!this.sheet.proefReligion) {
        this.sheet.religionSkill = this.sheet.intMod
      }

      if (this.sheet.proefInt) {
        this.sheet.intSave = this.sheet.intMod + this.sheet.proef
      }
      if (!this.sheet.proefInt) {
        this.sheet.intSave = this.sheet.intMod
      }
    },
    'sheet.proefInt' () {
      if (this.sheet.proefInt) {
        this.sheet.intSave = this.sheet.intSave + this.sheet.proef
      }
      if (!this.sheet.proefInt) {
        this.sheet.intSave = this.sheet.intMod
      }
    },
    'sheet.proefArcana' () {
      if (this.sheet.proefArcana) {
        this.sheet.arcanaSkill = this.sheet.arcanaSkill + this.sheet.proef
      }
      if (!this.sheet.proefArcana) {
        this.sheet.arcanaSkill = this.sheet.intMod
      }
    },
    'sheet.proefHistory' () {
      if (this.sheet.proefHistory) {
        this.sheet.historySkill = this.sheet.historySkill + this.sheet.proef
      }
      if (!this.sheet.proefHistory) {
        this.sheet.historySkill = this.sheet.intMod
      }
    },
    'sheet.proefInvestigation' () {
      if (this.sheet.proefInvestigation) {
        this.sheet.investigationSkill = this.sheet.investigationSkill + this.sheet.proef
      }
      if (!this.sheet.proefInvestigation) {
        this.sheet.investigationSkill = this.sheet.intMod
      }
    },
    'sheet.proefNature' () {
      if (this.sheet.proefNature) {
        this.sheet.natureSkill = this.sheet.natureSkill + this.sheet.proef
      }
      if (!this.sheet.proefNature) {
        this.sheet.natureSkill = this.sheet.intMod
      }
    },
    'sheet.proefReligion' () {
      if (this.sheet.proefReligion) {
        this.sheet.religionSkill = this.sheet.religionSkill + this.sheet.proef
      }
      if (!this.sheet.proefReligion) {
        this.sheet.religionSkill = this.sheet.intMod
      }
    },
    'sheet.wis' () {
      this.sheet.wisMod = Math.floor((this.sheet.wis - 10) / 2)
    },
    'sheet.wisMod' () {
      this.sheet.passivePerception = 10 + this.sheet.wisMod

      if (this.sheet.proefInsight) {
        this.sheet.insightSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (!this.sheet.proefInsight) {
        this.sheet.insightSkill = this.sheet.wisMod
      }

      if (this.sheet.proefAnimalHandling) {
        this.sheet.animalHandlingSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (!this.sheet.proefAnimalHandling) {
        this.sheet.animalHandlingSkill = this.sheet.wisMod
      }

      if (this.sheet.proefMedicine) {
        this.sheet.medicineSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (!this.sheet.proefMedicine) {
        this.sheet.medicineSkill = this.sheet.wisMod
      }

      if (this.sheet.proefPerception) {
        this.sheet.perceptionSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (!this.sheet.proefPerception) {
        this.sheet.perceptionSkill = this.sheet.wisMod
      }

      if (this.sheet.proefSurvival) {
        this.sheet.survivalSkill = this.sheet.wisMod + this.sheet.proef
      }
      if (!this.sheet.proefSurvival) {
        this.sheet.survivalSkill = this.sheet.wisMod
      }

      if (this.sheet.proefWis) {
        this.sheet.wisSave = this.sheet.wisMod + this.sheet.proef
      }
      if (!this.sheet.proefWis) {
        this.sheet.wisSave = this.sheet.wisMod
      }
    },
    'sheet.proefWis' () {
      if (this.sheet.proefWis) {
        this.sheet.wisSave = this.sheet.wisSave + this.sheet.proef
      }
      if (!this.sheet.proefWis) {
        this.sheet.wisSave = this.sheet.wisMod
      }
    },
    'sheet.proefInsight' () {
      if (this.sheet.proefInsight) {
        this.sheet.insightSkill = this.sheet.insightSkill + this.sheet.proef
      }
      if (!this.sheet.proefInsight) {
        this.sheet.insightSkill = this.sheet.wisMod
      }
    },
    'sheet.proefAnimalHandling' () {
      if (this.sheet.proefAnimalHandling) {
        this.sheet.animalHandlingSkill = this.sheet.animalHandlingSkill + this.sheet.proef
      }
      if (!this.sheet.proefAnimalHandling) {
        this.sheet.animalHandlingSkill = this.sheet.wisMod
      }
    },
    'sheet.proefMedicine' () {
      if (this.sheet.proefMedicine) {
        this.sheet.medicineSkill = this.sheet.medicineSkill + this.sheet.proef
      }
      if (!this.sheet.proefMedicine) {
        this.sheet.medicineSkill = this.sheet.wisMod
      }
    },
    'sheet.proefPerception' () {
      if (this.sheet.proefPerception) {
        this.sheet.perceptionSkill = this.sheet.perceptionSkill + this.sheet.proef
      }
      if (!this.sheet.proefPerception) {
        this.sheet.perceptionSkill = this.sheet.wisMod
      }
    },
    'sheet.proefSurvival' () {
      if (this.sheet.proefSurvival) {
        this.sheet.survivalSkill = this.sheet.survivalSkill + this.sheet.proef
      }
      if (!this.sheet.proefSurvival) {
        this.sheet.survivalSkill = this.sheet.wisMod
      }
    },
    'sheet.char' () {
      this.sheet.charMod = Math.floor((this.sheet.char - 10) / 2)
    },
    'sheet.charMod' () {
      if (this.sheet.proefActing) {
        this.sheet.actingSkill = this.sheet.charMod + this.sheet.proef
      }
      if (!this.sheet.proefActing) {
        this.sheet.actingSkill = this.sheet.charMod
      }

      if (this.sheet.proefBluff) {
        this.sheet.bluffSkill = this.sheet.charMod + this.sheet.proef
      }
      if (!this.sheet.proefBluff) {
        this.sheet.bluffSkill = this.sheet.charMod
      }

      if (this.sheet.proefIntimidation) {
        this.sheet.intimidationSkill = this.sheet.charMod + this.sheet.proef
      }
      if (!this.sheet.proefIntimidation) {
        this.sheet.intimidationSkill = this.sheet.charMod
      }

      if (this.sheet.proefPersuasion) {
        this.sheet.persuasionSkill = this.sheet.charMod + this.sheet.proef
      }
      if (!this.sheet.proefPersuasion) {
        this.sheet.persuasionSkill = this.sheet.charMod
      }

      if (this.sheet.proefChar) {
        this.sheet.charSave = this.sheet.charMod + this.sheet.proef
      }
      if (!this.sheet.proefChar) {
        this.sheet.charSave = this.sheet.charMod
      }
    },
    'sheet.proefChar' () {
      if (this.sheet.proefChar) {
        this.sheet.charSave = this.sheet.charSave + this.sheet.proef
      }
      if (!this.sheet.proefChar) {
        this.sheet.charSave = this.sheet.charMod
      }
    },
    'sheet.proefActing' () {
      if (this.sheet.proefActing) {
        this.sheet.actingSkill = this.sheet.actingSkill + this.sheet.proef
      }
      if (!this.sheet.proefActing) {
        this.sheet.actingSkill = this.sheet.charMod
      }
    },
    'sheet.proefBluff' () {
      if (this.sheet.proefBluff) {
        this.sheet.bluffSkill = this.sheet.bluffSkill + this.sheet.proef
      }
      if (!this.sheet.proefBluff) {
        this.sheet.bluffSkill = this.sheet.charMod
      }
    },
    'sheet.proefIntimidation' () {
      if (this.sheet.proefIntimidation) {
        this.sheet.intimidationSkill = this.sheet.intimidationSkill + this.sheet.proef
      }
      if (!this.sheet.proefIntimidation) {
        this.sheet.intimidationSkill = this.sheet.charMod
      }
    },
    'sheet.proefPersuasion' () {
      if (this.sheet.proefPersuasion) {
        this.sheet.persuasionSkill = this.sheet.persuasionSkill + this.sheet.proef
      }
      if (!this.sheet.proefPersuasion) {
        this.sheet.persuasionSkill = this.sheet.charMod
      }
    },
    'sheet.deathSaveSucess1' () {
      if (!this.sheet.deathSaveSucess1) {
        this.sheet.deathSaveSucess2 = false
        this.sheet.deathSaveSucess3 = false
      }
    },
    'sheet.deathSaveFail1' () {
      if (!this.sheet.deathSaveFail1) {
        this.sheet.deathSaveFail2 = false
        this.sheet.deathSaveFail3 = false
      }
    }
  },

  props: {
    sheet: null,
    creator: null,
    visitor: Boolean
  },

  created () {
    this.$emit('create-sheet', sheet)
  },

  beforeDestroy () {
    this.$emit('destroy-sheet')
  }

}
</script>
