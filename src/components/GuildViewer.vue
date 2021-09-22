<template>
    <div class="row bg-purple-2 sheet guild" v-if="guild">
        <div class="col-12 row">
            <div class="col-3 q-pa-sm" v-if="guild.icon" style="max-height:200px">
              <q-card>
                <div>
                  <q-img
                    :src="guild.icon"
                    style="max-height: 200px"
                    class="q-pa-sm"
                    contain
                  />
                  <div v-if="editMode===true">
                    URL do ícone:
                    <q-input dense v-model="guild.icon"/>
                  </div>
                </div>
              </q-card>
            </div>

            <q-card class="col-9 title q-mt-sm">
              <div class="q-mt-sm">
                <q-fab
                 color="accent"
                  v-if="(user._id === guild.userId || user._id  in guild.members) && editMode === false "
                  class="float-right"
                  glossy
                  icon="keyboard_arrow_down"
                  direction="down"
                >

                  <q-fab-action
                    v-if="guild.userId === user._id"
                    color="blue"
                    text-color="black"
                    @click="edit"
                    icon="edit"
                    label="editar"
                   />

                  <q-fab-action
                    color="orange"
                    class="q-mt-sm q-ml-md"
                    round
                    icon="logout"
                    @click="leave"
                    label="Sair"
                   />

                  <q-fab-action
                    v-if="guild.userId === user._id"
                    color="red"
                    text-color="black"
                    @click="deleteDialog = true"
                    icon="delete"
                    label="Apagar"
                   />

                  <delete-confirm :dialog="deleteDialog" @confirmed="deleteGuild" @canceled="deleteDialog = false"/>
                </q-fab>

                <q-btn
                 color="green"
                 size="lg"
                 v-if="editMode === true"
                 icon="check"
                 round
                 @click="save"
                 class="float-right"
                 />

                <q-input
                    class="q-ml-md"
                    borderless
                    :readonly="editMode===false"
                    input-class="title"
                    v-model="guild.name"
                />

                <q-input
                    class="q-ml-md"
                    borderless
                    :readonly="editMode===false"
                    autogrow
                    type="textarea"
                    input-class="minor-text"
                    v-model="guild.about"
                 />
              </div>
            </q-card>
        </div>
      </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
export default {

  data () {
    return {
      deleteDialog: false,
      editMode: false,
      guildData: null
    }
  },

  props: {
    guild: null
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
  },

  components: {
    DeleteConfirm: () => import('./DeleteConfirm.vue')
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions('auth', ['authenticate']),

    edit () {
      this.editMode = true
    },

    async save () {
      this.guildData = this.guild

      try {
        await this.$store.dispatch('guilds-private/patch', [this.guild._id, this.guildData])
        this.$q.notify({ message: 'Guilda editada', color: 'green' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao editar guilda, tente novamente mais tarde', color: 'red' })
      }

      this.editMode = false
    },

    async deleteGuild () {
      try {
        await this.$store.dispatch('guilds-private/remove', [this.guild._id])
        this.$q.notify({ message: 'Guilda desbandada', color: 'grey' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao desbandar guilda, tente novamente mais tarde', color: 'red' })
      }
    },

    async leave () {
      try {
        const userData = {
          guildId: null
        }
        await this.$store.dispatch('users-private/patch', [this.user._id, userData])
        this.$q.notify({ message: 'Guilda abandonada', color: 'grey' })
        this.$router.push({ path: '/' })
      } catch (error) {
        this.$q.notify({ message: 'Erro ao abandonar guilda, tente novamente mais tarde', color: 'red' })
      }
    }
  }
}
</script>
