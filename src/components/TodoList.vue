<template>
  <div>
    <input 
      type="text" 
      class="todo-input" 
      placeholder="Add todos" 
      v-model="newTodo"
      @keyup.enter="addTodo">
    
    <transition-group 
      enter-active-class="animate__animated animate__fadeInUp" 
      leave-active-class="animate__animated animate__fadeOutDown"
    >
      <TodoItem 
        v-for="(todo) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!anyRemaining" />
    </transition-group>

    <div class="extra-container">
      <TodoItemCheckAll />

      <TodoItemRemaining />
    </div>

    <div class="extra-container">
      <TodoListFilters />

      <div>
        <transition name="fade">
          <TodoListClear />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoItemRemaining from './TodoItemRemaining';
import TodoItemCheckAll from './TodoItemCheckAll';
import TodoListFilters from './TodoListFilters';
import TodoListClear from './TodoListClear';

export default {
  name: 'TodoList',

  components: {
    TodoItem,
    TodoItemRemaining,
    TodoItemCheckAll,
    TodoListFilters,
    TodoListClear,
  },

  data: function () {
    return {
      newTodo: '',
      
      idForTodo: 3,
    };
  },

  created: function () {
    this.$store.dispatch('getTodos');
  },

  computed: {
    anyRemaining: function () {
      return this.$store.getters.anyRemaining;
    },

    todosFiltered: function () {
      return this.$store.getters.todosFiltered;
    },
  },

  methods: {
    addTodo: function () {
      if (!this.newTodo.trim().length) return;
      
      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      });

      this.newTodo = '';
      this.idForTodo++;
    }, 
  }
}
</script>

<style lang="scss">
.todo-input {
  width: 100%;
  
  padding: 10px 18px;
  margin-bottom: 16px;
  
  font-size: 18px;

  &:focus {
    outline: none;
  }
}
</style>