<template>

    <q-page class=" row bg-purple-2 sheet guild" v-if="isAuthenticated">
        <div class="col-2">
            <navigation-menu />
        </div>

        <div class="col-10 row" >
            <div class="col-3 row" style="max-height:300px">
              <div v-if="guildForm.icon" class="col-12">
                <q-btn
                  round
                  color="red"
                  class="float-right"
                  @click="guildForm.icon=''"
                  icon="delete"
                />
                <q-img
                  :src="guildForm.icon"
                  style="max-height: 200px"
                  contain
                />
              </div>

              <div class="col-12 q-mt-none">
                URL do ícone:
                <q-input dense v-model="guildForm.icon"/>
              </div>
            </div>

            <div class="col-9 title q-mt-xl">
              <q-input class="q-ml-md" input-class="title" v-model="guildForm.name" hint="Nome da Guilda" />
              <q-input class="q-ml-md" type="textarea" input-class="minor-text" v-model="guildForm.about" hint="Sobre a Guilda" />
            </div>

            //placeholder pasta de guilda´
        </div>

        <div class="q-mx-auto">
          <q-btn color="red" @click="$router.push('/')" icon="close" size="xl" round />
          <q-btn color="green" @click="createGuild" class="q-ml-xl" icon="check" size="xl" round />
        </div>
    </q-page>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
export default {

  data () {
    return {
      guildForm: {
        icon: null,
        name: '',
        about: ''
      },
      newGuildId: null,
      userData: null
    }
  },

  async created () {
    try {
      await this.authenticate()
    } catch (error) {
    }
  },

  components: {
    NavigationMenu: () => import('../components/NavigationMenu.vue')
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions('auth', ['authenticate']),

    async createGuild () {
      if (this.guildForm.name === '') {
        this.$alertDialog('Insira um Nome para a Guilda', this)
        return
      }
      if (this.guildForm.about === '') {
        this.$alertDialog('Insira uma Descrição para a Guilda', this)
        return
      }

      try {
        await this.$store.dispatch('guilds-private/create', [this.guildForm])
        this.$q.notify({ message: 'Guilda fundada com sucesso!', color: 'green' })

        const newGuild = {
          query: {
            name: this.guildForm.name
          }
        }

        this.newGuildId = await this.$store.dispatch('guilds-private/find', [newGuild])

        this.userData.guildId = this.newGuildId

        await this.$store.dispatch('users-private/patch', [this.user._id, this.userData, this.params])
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
