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

        </q-list>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  }
}
</script>
