<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  name: 'App',

  components: {
    TodoList,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
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

  padding: 4px;

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
