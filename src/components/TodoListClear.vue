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

  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    clearCompletedTodos: function () {
      this.eventBus.$emit('clearedCompletedTodos');
    }
  }
}
</script>

<style>

</style>