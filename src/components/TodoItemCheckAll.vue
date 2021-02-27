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

  props: {
    anyRemaining: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    checkAllTodos: function () {
      this.eventBus.$emit('checkedAllTodos', this.anyRemaining);
    },
  },
}
</script>

<style>

</style>