<template>
  <q-dialog v-model="deleteDialog">
    <q-card>
        <q-card-section>
            <div class="text-h6">Tem certeza? <br> Essa ação não é desfeita nem com Wish de nono círculo</div>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat label="cancelar" color="primary" v-close-popup />
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
    }
  },

  props: {
    deleteDialog: null
  }
}
</script>
