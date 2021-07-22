<template>
  <div>
    <q-btn label="editar ficha" @click="seeSheet=true" class="fit"/>
    <q-dialog v-model="seeSheet" full-height>
      <q-card style="width: 1200px; max-width: 80vw;">
        <q-input v-model="sheet.name"/>
        <q-btn label="salvar ficha" @click="passForm" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      sheet: {
        name: null
      },
      seeSheet: null
    }
  },

  methods: {
    passForm (event) {
      this.$emit('saveSheet', this.sheet)
    }
  }

}
</script>
