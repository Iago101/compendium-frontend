<template>
    <div v-if="folder" class="cursor-pointer q-mt-sm" @click="setFolder">
        {{folder.name}}
    </div>
</template>
<script>
export default {
  data () {
    return {
      folderData: null,
      arrayCounter: null
    }
  },

  props: {
    folder: null,
    idea: null
  },

  methods: {
    async setFolder () {
      this.arrayCounter = this.folder.ideasId.length
      this.arrayCounter++
      this.folderData = this.folder
      this.folderData.ideasId[this.arrayCounter] = this.idea._id
      this.error = false
      try {
        await this.$store.dispatch('folders-private/patch', [this.folderData._id, this.folderData, this.params])
        this.$q.notify({ message: 'Idéia anexada a pasta', color: 'green' })
      } catch (error) {
        console.error(error)
        this.$q.notify({ message: 'Erro ao anexar idéia, id inválido', color: 'red' })
      }
    }
  }
}
</script>
