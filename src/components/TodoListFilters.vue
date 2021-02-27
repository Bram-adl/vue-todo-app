<template>
  <div>
    <button 
      :class="{ active: filter == 'all' }" 
      @click="changeFilter('all')"
    >
      All
    </button>
    
    <button 
      :class="{ active: filter == 'active' }" 
      @click="changeFilter('active')"
    >
      Active
    </button>

    <button 
      :class="{ active: filter == 'completed' }" 
      @click="changeFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoListFilters',

  data: function () {
    return {
      filter: 'all',
    };
  },

  methods: {
    changeFilter: function (filter) {
      this.filter = filter;
      this.eventBus.$emit('changedFilter', this.filter);
    }
  }
}
</script>

<style>

</style>