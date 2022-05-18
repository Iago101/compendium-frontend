<template>
  <q-dialog v-model="dialog">
    <q-card>
        <q-card-section class="bg-indigo-10">
            <div class="text-h6 text-white">Tem certeza? <br> Essa ação não é desfeita nem com Wish de nono círculo</div>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat label="cancelar" color="primary" @click="onCancel" v-close-popup />
            <q-btn flat label="DELETAR" color="red" @click="onConfirm" v-close-popup />
        </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  methods: {
    onConfirm (event) {
      this.$emit('confirmed')
    },
    onCancel (event) {
      this.$emit('canceled')
    }
  },

  props: {
    dialog: Boolean
  }
}
</script>
