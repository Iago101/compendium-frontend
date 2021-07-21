<template>
        <q-card>
        <q-input v-model="record.name"/>
        </q-card>
</template>

<script>

export default {
  data () {
    return {
      record: {
        name: null
      }
    }
  },

  props: {
    ideaData: {
      character: {
        record: null
      }
    }
  }
}
</script>
