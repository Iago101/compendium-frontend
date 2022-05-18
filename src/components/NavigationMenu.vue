<template>
    <div class="bg-white menu" style="height: 100%">
        <q-list padding bordered class="rounded-borders">

        <q-expansion-item
            expand-separator
            icon="emoji_objects"
            label="Idéias"
        >
            <q-card>
                <q-card-section @click="$router.push('/')" class="cursor-pointer bg-indigo-2">
                    Ver Idéias
                </q-card-section>
                <q-separator/>
                <q-card-section v-if="isAuthenticated" @click="$router.push('/')" class="cursor-pointer bg-indigo-2">
                    Ver Minhas Idéias
                </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-expansion-item
            v-if="isAuthenticated"
            expand-separator
            icon="favorite"
            label="Idéias Favoritas"
        >
            <q-card>
                <q-card-section @click="$router.push('/favorites')" class="cursor-pointer bg-indigo-2">
                    Ver Idéias Favoritas
                </q-card-section>
            </q-card>
        </q-expansion-item>
        <q-expansion-item
            expand-separator
            icon="folder"
            label="Pastas"
        >
            <q-card>
                <q-card-section @click="$router.push('/folders')" class="cursor-pointer bg-indigo-2">
                    Ver Pastas
                </q-card-section>
                <q-separator/>
                <q-card-section v-if="isAuthenticated" @click="$router.push('/my-folders')" class="cursor-pointer bg-indigo-2">
                    Ver Minhas Pastas
                </q-card-section>
                <q-separator/>
                <q-card-section v-if="isAuthenticated" @click="createFolder" class="cursor-pointer bg-indigo-2">
                    Criar uma pasta
                </q-card-section>

                <q-dialog v-model="prompt" persistent>
                    <q-card style="min-width: 350px">
                        <q-card-section class="bg-indigo-10">
                        <div class="text-h6 text-white">Nova Pasta</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                        <q-input dense v-model="folderData.name" autofocus @keyup.enter="prompt = false" />
                        </q-card-section>

                        <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancel" class="text-red" v-close-popup />
                        <q-btn flat label="criar pasta" @click="saveFolder" v-close-popup />
                        </q-card-actions>
                    </q-card>
                </q-dialog>

            </q-card>
        </q-expansion-item>

        <q-expansion-item
            disabled
            expand-separator
            icon="shield"
            label="Guilda"
        >
                <q-card-section class="cursor-pointer bg-indigo-2">
                    Mais novidades em breve!
                </q-card-section>
            <!-- <q-card>

                <q-card-section class="cursor-pointer bg-indigo-2">
                    Placeholder guildas
                </q-card-section>

                <q-card-section v-if="isAuthenticated && !user.guildId" @click="$router.push('/found-guild')" class="cursor-pointer bg-indigo-2">
                    Fundar uma Guilda
                </q-card-section>
            </q-card> -->
        </q-expansion-item>

        <q-expansion-item
            v-if="isAuthenticated && user.permissions && user.permissions.includes('super_admin')"
            expand-separator
            icon="admin_panel_settings"
            label="Admin"
        >
            <q-card>
                <q-card-section @click="$router.push({name: 'reportsPage'})" class="cursor-pointer bg-indigo-2">
                    Reports
                </q-card-section>
            </q-card>
        </q-expansion-item>

        </q-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions('auth', ['authenticate']),

    createFolder () {
      this.prompt = true
    },

    async saveFolder () {
      if (this.name === '') {
        this.$alertDialog('Insira um nome para a pasta', this)
      }
      try {
        this.folderData.userId = this.user._id
        this.folderData.privacy = 'public'
        await this.$store.dispatch('folders-private/create', [this.folderData])
        this.$q.notify({ message: 'Pasta criada com sucesso', color: 'green' })
      } catch (error) {
        console.error(error)
      }
    }
  },
  data () {
    return {
      alert: false,
      confirm: false,
      prompt: false,

      folderData: {
        name: null
      }
    }
  }
}

</script>

<style >

.menu {
    top:70px;
    position: fixed;
}
</style>
