<template>
    <q-chip text-color="black">
        {{tag.name}}
    </q-chip>
</template>
<script>
export default {
  props: {
    tag: null
  }
}
</script>
