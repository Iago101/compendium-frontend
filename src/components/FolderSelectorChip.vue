<template>
    <div v-if="folder" class="cursor-pointer" @click="setFolder(idea._id)">
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
    async setFolder (id) {
      for (let aux = 0; aux <= this.folder.ideasId.length; aux++) {
        if (this.folder.ideasId[aux] === id) {
          this.$q.notify({ message: 'Idéia já está anexada à pasta', color: 'yellow' })
          return
        }
      }

      this.arrayCounter = this.folder.ideasId.length
      this.folderData = this.folder
      this.folderData.ideasId[this.arrayCounter] = this.idea._id
      this.error = false

      try {
        await this.$store.dispatch('folders-private/patch', [this.folderData._id, this.folderData, this.params])
        this.$q.notify({ message: 'Idéia anexada a pasta', color: 'green' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao anexar idéia, id inválido', color: 'red' })
      }
    }
  }
}
</script>
