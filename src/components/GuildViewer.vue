<template>
    <div class=" row bg-purple-2 sheet guild" v-if="guild">
        <div class="col-11 row">
            <div class="col-3 row q-pa-sm" v-if="guild.icon" style="max-height:200px">
              <q-card class="col-12 " >
              <div >
                <q-img
                  :src="guild.icon"
                  style="max-height: 200px"
                  contain
                />
              </div>
              </q-card>
            </div>

            <q-card class="col-9 title q-mt-sm">
              <div class="q-mt-sm">
                <q-input
                    class="q-ml-md"
                    borderless
                    readonly
                    input-class="title"
                    v-model="guild.name"
                />
                <q-input
                    class="q-ml-md"
                    borderless
                    readonly
                    autogrow
                    style="height:260px"
                    type="textarea"
                    input-class="minor-text"
                    v-model="guild.about"
                 />
              </div>
            </q-card>

            //placeholder pasta de guilda
        </div>
        <div>
            <q-btn color="red" class="q-mt-sm q-ml-md" round icon="logout" @click="leaveGuild" />
        </div>
      </div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
export default {

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
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions('auth', ['authenticate']),

    leaveGuild () {
      // placeholder pra quando tiver invites
      // sair da guilda
      // deletar guilda caso for o dono / passar liderança
    }
  }
}
</script>
