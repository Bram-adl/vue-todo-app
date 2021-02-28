import Vue from 'vue';
import VueX from 'vuex';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost/laravel-todo-api/public/api';

Vue.use(VueX);

export const store = new VueX.Store({
  state: {
    filter: 'all',

    todos: [],
  },

  getters: {
    remaining: function (state) {
      return state.todos.filter(todo => !todo.completed).length;
    },

    anyRemaining: function (state, getters) {
      return getters.remaining != 0;
    },

    todosFiltered: function (state) {
      if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed);
      }

      return state.todos;
    },

    showClearCompletedButton: function (state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    },
  },

  mutations: {
    getTodos: function (state, todos) {
      state.todos = todos;
    },
    
    addTodo: function (state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      });
    },

    finishEditTodo: function (state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id);

      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
      });
    },

    removeTodo: function (state, id) {
      const index = state.todos.findIndex(todo => todo.id === id);

      state.todos.splice(index, 1);
    },

    changeFilter: function (state, filter) {
      state.filter = filter;
    },

    checkAllTodos: function (state, checked) {
      state.todos.forEach(todo => todo.completed = checked);
    },

    clearCompletedTodos: function (state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
  },

  actions: {
    getTodos: function (context) {
      axios.get('/todos')
        .then(response => {
          context.commit('getTodos', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    addTodo: function (context, todo) {
      axios.post('/todos', {
        title: todo.title,
        completed: false,
      })
        .then(response => {
          context.commit('addTodo', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    finishEditTodo: function (context, todo) {
      axios.patch('/todos/' + todo.id, {
        title: todo.title,
        completed: todo.completed,
      })
        .then(response => {
          context.commit('finishEditTodo', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    removeTodo: function (context, id) {
      axios.delete('/todos/' + id)
        .then(() => {
          context.commit('removeTodo', id);
        })
        .catch(error => {
          console.log(error);
        });
    },

    checkAllTodos: function (context, checked) {
      axios.patch('/todosCheckAll', {
        completed: checked,
      })
        .then(() => {
          context.commit('checkAllTodos', checked);
        })
        .catch(error => {
          console.log(error);
        });
    },

    clearCompletedTodos: function (context) {
      const completed = store.state.todos
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      
      axios.delete('/todosDeleteCompleted', {
        data: {
          todos: completed,
        },
      })
        .then(() => {
          context.commit('clearCompletedTodos');
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
});
