<template>
<div>
  <div v-if="status===null" @click="onAdd">
      <q-chip class="cursor-pointer" icon="add" text-color="black">
          {{tag.name}}
      </q-chip>
  </div>
  <div v-if="status==='tagged'" @click="onRemove">
      <q-chip class="cursor-pointer" icon="close" text-color="blue">
          {{tag.name}}
      </q-chip>
  </div>
  <div v-if="status==='display'" @click="onFilter">
      <q-chip class="cursor-pointer" icon="search" text-color="blue">
          {{tag.name}}
      </q-chip>
  </div>
</div>
</template>
<script>
export default {
  props: {
    tag: null,
    status: null
  },

  methods: {
    onAdd (event) {
      this.$emit('addtag')
    },
    onRemove (event) {
      this.$emit('removetag')
    },
    onFilter (event) {
      this.$emit('filter')
    }
  }
}
</script>
