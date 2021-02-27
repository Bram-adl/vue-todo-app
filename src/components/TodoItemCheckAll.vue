<template>
  <div>
    <label>
      <input 
        type="checkbox" 
        :checked="!anyRemaining"
        @change="checkAllTodos">
      Check All
    </label>
  </div>
</template>

<script>
export default {
  name: 'TodoItemCheckAll',

  computed: {
    anyRemaining: function () {
      return this.$store.getters.anyRemaining;
    },
  },

  methods: {
    checkAllTodos: function () {
      this.$store.dispatch('checkAllTodos', event.target.checked);
    },
  },
}
</script>

<style>

</style>