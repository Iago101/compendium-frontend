<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar class="bg-purple" style="height:70px">
        <q-toolbar-title>
          <div class="q-ml-xl cursor-pointer" @click="$router.push('/')">
            <h3 class="no-margin">
              𝕮𝖔𝖒𝖕𝖊𝖓𝖉𝖎𝖚𝖒
            </h3>
          </div>
        </q-toolbar-title>
        <q-separator dark vertical inset />
        <div class="q-mx-xl">
          <h4 class="no-margin">
            Ranking
          </h4>
        </div>
      <q-separator dark vertical inset />
      <div class="q-mx-xl">
          <h4 class="no-margin">
            Mesas
          </h4>
        </div>
      <q-separator dark vertical inset />
        <div class="q-mx-xl">
          <h4 class="no-margin">
          Guildas
          </h4>
        </div>
      <q-separator dark vertical inset />

        <div v-if="!this.isAuthenticated">

          <q-btn-dropdown
              stretch flat
              icon="perm_identity"
              text-color="white"
              color="purple"
              label="login"
              class="fit text-capitalize"
              size="18px"
            >

            <q-card class="q-pa-sm bg-yellow">
              <q-input square outlined dense label="E-mail" v-model="email" class="bg-purple-2 "/>

              <q-input square outlined dense label="Senha" type="password" v-model="password" class="bg-purple-2 q-mt-md"/>

              <q-btn @click="login()" color="yellow-9" class="q-mx-auto q-mt-md fit"> logar </q-btn>
              <q-btn @click="$router.push('/registration')" color="yellow-10" class="q-mx-auto q-mt-md fit"> Criar Conta </q-btn>
            </q-card>

          </q-btn-dropdown>
        </div>

          <div v-else>
           <q-btn-dropdown
              stretch flat
              text-color="white"
              icon="perm_identity"
              class="text-capitalize"
              color="purple"
              :label="user.name"
              size="18px"
            >
            <q-list class="bg-purple-2">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Meu Perfil</q-item-label>
                </q-item-section>
              </q-item>

                <q-separator />

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Minhas Pastas</q-item-label>
                </q-item-section>
              </q-item>

                <q-separator />

              <q-item clickable v-close-popup @click="logoutCompendium">
                <q-item-section>
                  <q-item-label>Deslogar</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            </q-btn-dropdown>

        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      loginScreen: false,
      email: null,
      password: null
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate', 'logout']),
    login () {
      this.authenticate({
        email: this.email,
        password: this.password,
        strategy: 'local'
      })
    },
    async logoutCompendium () {
      await this.logout()
      this.$router.go('/')
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  }
}
</script>
