<template>
    <div class="row bg-purple-2 sheet guild" v-if="guild">
        <guild-card :guild="guild" />
      </div>
</template>
<script>

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
    GuildCard: () => import('./GuildCard.vue')
  }
}
</script>
