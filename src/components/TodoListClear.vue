<template>
  <button
    v-if="showClearCompletedButton"
    @click="clearCompletedTodos"
  >
    Clear Completed
  </button>
</template>

<script>
export default {
  name: 'TodoListClear',

  computed: {
    showClearCompletedButton: function () {
      return this.$store.getters.showClearCompletedButton;
    },
  },

  methods: {
    clearCompletedTodos: function () {
      this.$store.dispatch('clearCompletedTodos');
    }
  }
}
</script>

<style>

</style>