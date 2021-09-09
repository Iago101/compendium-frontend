<template>
    <q-page class=" row bg-purple-2 sheet guild">
        <div class="col-2">
            <navigation-menu />
        </div>

        <div class="col-10 row" v-if="isAuthenticated">
            <div class="col-3 row" style="max-height:300px">
              <div v-if="guildForm.icon" class="col-12">
                <q-btn
                  round
                  color="red
                  float-right"
                  @click="guildForm.icon=''"
                  icon="delete"
                />
                <q-img
                  :src="guildForm.icon"
                  style="max-height: 200px"
                  contain
                  class="no-margin no-padding"
                />
              </div>

              <div class="col-12 q-mt-none">
                URL do ícone:
                <q-input v-model="guildForm.icon"/>
              </div>
            </div>

            <div class="col-9 title q-mt-xl">
              <q-input input-class="title" v-model="guildForm.name" hint="Nome da Guilda" />
              <q-input type="textarea" input-class="minor-text" v-model="guildForm.about" hint="Sobre a Guilda" />
            </div>

            //placeholder pasta de guilda´
        </div>

        <div class="q-mx-auto">
          <q-btn color="red" icon="close" size="xl" round />
          <q-btn color="green" class="q-ml-xl" icon="check" size="xl" round />
        </div>
    </q-page>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
export default {

  data () {
    return {
      guildForm: {
        icon: null
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
    ...mapActions('auth', ['authenticate'])
  }
}
</script>
