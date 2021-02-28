<template>
  <div class="todo-item">
    <div class="todo-item-left">
        <input 
          type="checkbox" 
          v-model="completed"
          @change="finishEditTodo">
        
        <div 
          class="todo-item-label" 
          :class="{ completed: completed }" 
          v-if="!editing" 
          @dblclick="editTodo"
        >
          {{ title }}
        </div>

        <input 
          type="text" 
          v-model="title" 
          class="todo-item-edit" 
          v-else
          v-focus
          @blur="finishEditTodo"
          @keyup.enter="finishEditTodo"
          @keyup.esc="cancelEditTodo">
      </div>

      <div>
        <button
          @click="pluralize"
        >
          Plural
        </button>
        
        <span class="todo-remove" @click="removeTodo">
          &times;
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    todo: {
      type: Object,
      required: true,
    },

    checkAll: {
      type: Boolean,
      required: true,
    },
  },

  data: function () {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: '',
    };
  },

  created: function () {
    this.eventBus.$on('pluralized', this.handlePluralize);
  },

  beforeDestroy: function () {
    this.eventBus.$off('pluralized', this.handlePluralize);
  },

  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
  },

  methods: {
    editTodo: function () {
      this.beforeEditCache = this.title;
      this.editing = true;
    },

    finishEditTodo: function () {
      if (!this.title.trim().length) {
        this.title = this.beforeEditCache;
      }
      
      this.editing = false;

      this.$store.dispatch('finishEditTodo', {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
      });
    },

    cancelEditTodo: function () {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    
    removeTodo: function () {
      this.$store.dispatch('removeTodo', this.id);
    },

    pluralize: function () {
      this.eventBus.$emit('pluralized');
    },

    handlePluralize: function () {
      this.title = this.title + 's';

      this.$store.dispatch('finishEditTodo', {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
      });
    }
  }
}
</script>

<style lang="scss">
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
</style>