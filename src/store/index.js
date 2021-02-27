import Vue from 'vue';
import VueX from 'vuex';

Vue.use(VueX);

export const store = new VueX.Store({
  state: {
    filter: 'all',

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
    addTodo: function (state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
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
    addTodo: function (context, todo) {
      setTimeout(() => {
        context.commit('addTodo', todo);
      }, 1000);
    },
    
    finishEditTodo: function (context, todo) {
      context.commit('finishEditTodo', todo);
    },

    removeTodo: function (context, id) {
      context.commit('removeTodo', id);
    },

    changeFilter: function (context, filter) {
      context.commit('changeFilter', filter);
    },

    checkAllTodos: function (context, checked) {
      context.commit('checkAllTodos', checked);
    },

    clearCompletedTodos: function (context) {
      context.commit('clearCompletedTodos');
    },
  },
});
