<template>
  <div>
    {{ remaining }} items left
  </div>
</template>

<script>
export default {
  name: 'TodoItemRemaining',

  props: {
    remaining: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style>

</style>