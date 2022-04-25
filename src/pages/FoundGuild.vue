<template>
    <q-page class="row bg-indigo-2 sheet guild">
        <div class="col-2">
          <navigation-menu />
        </div>

        <div class="col-10 row justify-around" v-if="!isAuthenticated">
            <q-icon name="account_circle" class="col-12" size="20vw" color="indigo" />
            <h3 class="text-center text-indigo-9 q-mt-none" > Logue para continuar </h3>
        </div>

        <div class="col-10 row" v-if="isAuthenticated && !user.guildId">
        <div class="col-10 row">
            <div class="col-3 row q-pa-sm" style="max-height:300px">
              <q-card class="col-12" >

              <div v-if="guildForm.icon">
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

              <div class="col-12 q-my-auto">
                URL do ícone:
                <q-input dense v-model="guildForm.icon"/>
              </div>

              </q-card>
            </div>

            <q-card class="col-9 title q-mt-xl">
              <div class="q-mt-sm">
                <q-input class="q-ml-md" input-class="title" v-model="guildForm.name" hint="Nome da Guilda" />
                <q-input
                  class="q-ml-md"
                  autogrow
                  style="max-height:260px"
                  type="textarea"
                  input-class="minor-text"
                  v-model="guildForm.about"
                  hint="Sobre a Guilda"
                 />
              </div>
            </q-card>

            //placeholder pasta de guilda´
        </div>

        <div class="q-mx-auto">
          <q-btn color="red" @click="$router.push('/')" icon="close" size="xl" round />
          <q-btn color="green" @click="createGuild" class="q-ml-xl" icon="check" size="xl" round />
        </div>
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
      }
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
        this.$router.push({ name: 'guildPage', params: { id: this.user.guildId } })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
