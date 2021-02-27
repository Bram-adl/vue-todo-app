<template>
  <div>
    {{ remaining }} items left
  </div>
</template>

<script>
export default {
  name: 'TodoItemRemaining',

  computed: {
    remaining: function () {
      return this.$store.getters.remaining;
    }
  }
}
</script>

<style>

</style>