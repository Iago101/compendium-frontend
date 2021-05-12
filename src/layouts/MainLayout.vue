<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div v-if="!this.isAuthenticated">
          <q-expansion-item
            popup
            v-if="!this.isAuthenticated"
            icon="perm_identity"
            label="Realize o Login"
            color="primary"
          >
            <q-card v-model="loginScreen" class="bg-primary">
              <q-input square outlined dense label="E-mail" v-model="email" class="bg-white"/>
              <q-input square outlined dense label="Senha" v-model="password" class="bg-white"/>
              <q-btn @click="login()" color="green" class="q-mx-auto"> logar </q-btn>
            </q-card>
          </q-expansion-item>

        </div>

        <div v-if="this.isAuthenticated">
          <!-- <q-expansion-item
            popup
            v-if="this.isAuthenticated"
            icon="perm_identity"
            label="auth/user/name"
            color="primary"
          >

            <q-card v-model="loginScreen" class="bg-primary">
              <q-input square outlined dense label="E-mail" v-model="email" class="bg-white"/>
              <q-input square outlined dense label="Senha" v-model="password" class="bg-white"/>
              <q-btn @click="login()" color="green" class="q-mx-auto"> logar </q-btn>
            </q-card>
          </q-expansion-item> -->

           <q-btn-dropdown
              icon="perm_identity"
              class=""
              color="purple"
              label="nome do usuario"
            >

            <div class="row no-wrap q-pa-md">
              <div class="column">
                teste
              </div>
            </div>
          </q-btn-dropdown>

        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import EssentialLink from 'components/EssentialLink.vue'

// const linksData = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ]

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      // essentialLinks: linksData
      loginScreen: false,
      email: null,
      password: null
    }
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    login () {
      this.authenticate({
        email: this.email,
        password: this.password,
        strategy: 'local'
      })
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  }
}
</script>
