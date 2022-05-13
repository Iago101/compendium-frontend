<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar class="bg-indigo-10" style="height:70px">
        <q-toolbar-title>
          <div class="q-ml-xl cursor-pointer" @click="$router.push('/')">
            <h3 class="no-margin">
              𝕮𝖔𝖒𝖕𝖊𝖓𝖉𝖎𝖚𝖒
            </h3>
          </div>
        </q-toolbar-title>
      <q-separator dark vertical inset />

        <div v-if="!this.isAuthenticated">

          <q-btn-dropdown
              stretch flat
              icon="perm_identity"
              text-color="white"
              color="indigo"
              label="login"
              class="fit text-capitalize"
              size="18px"
            >

            <q-card class="q-pa-sm bg-indigo">
              <q-input square outlined dense label="E-mail" v-model="email" class="bg-indigo-2 "/>

              <q-input square outlined dense label="Senha" type="password" v-model="password" class="bg-indigo-2 q-mt-md"/>

              <q-btn @click="login()" color="amber-7" class="q-mx-auto q-mt-md fit"> logar </q-btn>
              <q-btn @click="$router.push('/registration')" color="amber-9" class="q-mx-auto q-mt-md fit"> Criar Conta </q-btn>
            </q-card>

          </q-btn-dropdown>
        </div>

          <div v-else>
           <q-btn-dropdown
              stretch flat
              text-color="white"
              icon="perm_identity"
              class="text-capitalize"
              color="indigo"
              :label="user.name"
              size="18px"
            >
            <q-list class="bg-indigo-2">
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
