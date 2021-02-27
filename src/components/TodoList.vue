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
      <div 
        class="todo-item"
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
      >
        <div class="todo-item-left">
          <input type="checkbox" v-model="todo.completed">
          
          <div 
            class="todo-item-label" 
            :class="{ completed: todo.completed }" 
            v-if="!todo.editing" 
            @dblclick="editTodo(todo)"
          >
            {{ todo.title }}
          </div>

          <input 
            type="text" 
            v-model="todo.title" 
            class="todo-item-edit" 
            v-else
            v-focus
            @blur="doneEditTodo(todo)"
            @keyup.enter="doneEditTodo(todo)"
            @keyup.esc="cancelEditTodo(todo)">
        </div>

        <div class="todo-remove" @click="removeTodo(index)">
          &times;
        </div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <label>
          <input 
            type="checkbox" 
            :checked="!anyRemaining"
            @change="checkAllTodos">
          Check All
        </label>
      </div>

      <div>
        {{ remaining }} items left
      </div>
    </div>

    <div class="extra-container">
      <div>
        <button 
          :class="{ active: filter == 'all' }" 
          @click="filter = 'all'"
        >
          All
        </button>
        
        <button 
          :class="{ active: filter == 'active' }" 
          @click="filter = 'active'"
        >
          Active
        </button>

        <button 
          :class="{ active: filter == 'completed' }" 
          @click="filter = 'completed'"
        >
          Completed
        </button>
      </div>

      <div>
        <transition name="fade">
          <button
            v-if="showClearCompletedButton"
            @click="clearCompletedTodos"
          >
            Clear Completed
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',

  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
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

      beforeEditCache: '',

      filter: 'all',
    };
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
    }
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

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      todo.editing = true;
    },

    doneEditTodo: function (todo) {
      // Prevent user for inserting empty todo
      if (!todo.title.trim().length) {
        todo.title = this.beforeEditCache;
      }
      
      todo.editing = false;
    },

    cancelEditTodo: function (todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    },

    removeTodo: function (index) {
      this.todos.splice(index, 1);
    },

    checkAllTodos: function () {
      this.todos.forEach(todo => todo.completed = event.target.checked);
    },

    clearCompletedTodos: function () {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
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

.todo-item {
  margin-bottom: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  animation-duration: 0.3s;
}

.todo-remove {
  cursor: pointer;
  margin-left: 14px;

  &:hover {
    color: #000;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  margin-left: 12px;

  border: 1px solid white;
}

.todo-item-edit {
  width: 100%;

  padding: 10px;
  margin-left: 12px;
  border: 1px solid #ccc;

  color: #2c3e50;
  font-size: 24px;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
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