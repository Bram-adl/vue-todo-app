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

      <div class="todo-remove" @click="removeTodo(index)">
        &times;
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

    index: {
      type: Number,
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

  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : false;
    },
  },

  methods: {
    editTodo: function () {
      this.beforeEditCache = this.title;
      this.editing = true;
    },

    finishEditTodo: function () {
      // Prevent user for inserting empty todo
      if (!this.title.trim().length) {
        this.title = this.beforeEditCache;
      }
      
      this.editing = false;

      this.$emit('finishedEditTodo', {
        index: this.index,
        todo: {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing,
        },
      });
    },

    cancelEditTodo: function () {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    
    removeTodo: function (index) {
      this.$emit('removedTodo', index);
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