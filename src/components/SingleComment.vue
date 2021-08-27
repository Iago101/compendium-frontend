<template>
    <div class="row" v-if="comment">
        <div class="row col-12 sheet q-mt-lg">
            <q-avatar color="red" class="q-ml-xl q-my-md" text-color="black"> A </q-avatar>
            <div class="col-7">
                <div class="minor-text q-ml-md col-7">{{comment.name}}</div>
                <q-input readonly v-model="comment.text" borderless dense class="col-5 q-ml-md border minor-text bg-white" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    comment: null
  }
}
</script>
