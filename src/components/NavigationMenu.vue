<template>
    <div class="bg-white">
        <q-list padding bordered class="rounded-borders">
        <q-expansion-item
            expand-separator
            icon="folder"
            label="Pastas"
        >
            <q-card>
                <q-card-section @click="$router.push('/folders')" class="cursor-pointer bg-purple-2">
                    Ver Pastas
                </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-expansion-item
            expand-separator
            icon="emoji_objects"
            label="Idéias"
        >
            <q-card>
                <q-card-section @click="$router.push('/')" class="cursor-pointer bg-purple-2">
                    Ver Idéias
                </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-expansion-item
            expand-separator
            icon="favorite"
            label="Idéias Favoritas"
        >
            <q-card>
                <q-card-section @click="$router.push('/favorites')" class="cursor-pointer bg-purple-2">
                    Ver Idéias Favoritas
                </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-expansion-item
            expand-separator
            icon="shield"
            label="Guilda"
        >
            <q-card>
                <q-card-section v-if="isAuthenticated && user.guildId" @click="$router.push({name: 'guildPage', params: {id: user.guildId}})" class="cursor-pointer bg-purple-2">
                    Página da Guilda
                </q-card-section>

                <q-card-section class="cursor-pointer bg-purple-2">
                    Placeholder guildas
                </q-card-section>

                <q-card-section v-if="isAuthenticated && !user.guildId" @click="$router.push('/found-guild')" class="cursor-pointer bg-purple-2">
                    Fundar uma Guilda
                </q-card-section>
            </q-card>
        </q-expansion-item>

        <q-expansion-item
            v-if="isAuthenticated && user.permissions.includes('super_admin')"
            expand-separator
            icon="admin_panel_settings"
            label="Admin"
        >
            <q-card>
                <q-card-section @click="$router.push({name: 'reportsPage'})" class="cursor-pointer bg-purple-2">
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
    ...mapActions('auth', ['authenticate'])
  },
  data () {
    return {
    }
  }
}
</script>
