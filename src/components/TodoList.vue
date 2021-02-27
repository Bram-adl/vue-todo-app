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
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :index="index" 
        :checkAll="!anyRemaining" />
    </transition-group>

    <div class="extra-container">
      <TodoItemCheckAll :anyRemaining="anyRemaining" />

      <TodoItemRemaining :remaining="remaining" />
    </div>

    <div class="extra-container">
      <TodoListFilters />

      <div>
        <transition name="fade">
          <TodoListClear :showClearCompletedButton="showClearCompletedButton" />
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
      
      todos: [
        {
          id: 1,
          title: 'Learn VueJS',
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: 'Learn VueX',
          completed: false,
          editing: false,
        },
      ],

      filter: 'all',
    };
  },

  created: function () {
    this.eventBus.$on('removedTodo', (index) => this.removeTodo(index));
    this.eventBus.$on('finishedEditTodo', (data) => this.finishEditTodo(data));
    this.eventBus.$on('checkedAllTodos', (anyRemaining) => this.checkAllTodos(anyRemaining));
    this.eventBus.$on('changedFilter', (filter) => this.filter = filter);
    this.eventBus.$on('clearedCompletedTodos', () => this.clearCompletedTodos());
  },

  beforeDestroy: function () {
    this.eventBus.$off('removedTodo', (index) => this.removeTodo(index));
    this.eventBus.$off('finishedEditTodo', (data) => this.finishEditTodo(data));
    this.eventBus.$off('checkedAllTodos', (anyRemaining) => this.checkAllTodos(anyRemaining));
    this.eventBus.$off('changedFilter', (filter) => this.filter = filter);
    this.eventBus.$off('clearedCompletedTodos', () => this.clearCompletedTodos());
  },

  computed: {
    remaining: function () {
      return this.todos.filter(todo => !todo.completed).length;
    },

    anyRemaining: function () {
      return this.remaining != 0;
    },

    todosFiltered: function () {
      if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed);
      }

      return this.todos;
    },

    showClearCompletedButton: function () {
      return this.todos.filter(todo => todo.completed).length > 0;
    },
  },

  methods: {
    addTodo: function () {
      // Prevent user for inserting empty todo
      if (!this.newTodo.trim().length) return;
      
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      });

      this.newTodo = '';
      this.idForTodo++;
    },

    finishEditTodo: function ({index, todo}) {
      this.todos.splice(index, 1, todo);
    },

    removeTodo: function (index) {
      this.todos.splice(index, 1);
    },

    checkAllTodos: function () {
      this.todos.forEach(todo => todo.completed = event.target.checked);
    },

    clearCompletedTodos: function () {
      this.todos = this.todos.filter(todo => !todo.completed);
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

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 14px;
  margin-bottom: 14px;
  border-top: 1px solid lightgrey;

  font-size: 16px;
}

button {
  font-size: 14px;

  background-color: white;
  border: 1px solid lightgrey;

  margin-right: 2px;
  appearance: none;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>