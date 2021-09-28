<template>
    <q-fab-action
        round
        v-if="isAuthenticated"
        color="yellow-7"
        icon="report_problem"
        class="text-black"
        @click="report"
    >

    <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
        <strong>Reportar</strong>
    </q-tooltip>

    </q-fab-action>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      data: null
    }
  },

  props: {
    type: null,
    thing: null
  },

  methods: {

    async report () {
      this.data = this.thing

      if (this.data.reported && this.data.reported === true) {
        this.$q.notify({ message: 'Isso já foi reportado e será revisto em breve, agradecemos a sinalização', color: 'orange' })
        return
      }

      this.data.reported = true

      try {
        if (this.type === 'idea') {
          await this.$store.dispatch('ideas-private/patch', [this.data._id, this.data, this.params])
        }
        if (this.type === 'folder') {
          await this.$store.dispatch('folders-private/patch', [this.data._id, this.data, this.params])
        }
        if (this.type === 'guild') {
          await this.$store.dispatch('guilds-private/patch', [this.data._id, this.data, this.params])
        }

        this.$q.notify({ message: 'Isso foi reportado e será revisto em breve, agradecemos a sinalização', color: 'orange' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao reportar idéia, tente novamente mais tarde', color: 'red' })
      }
    }

  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  }
}
</script>
