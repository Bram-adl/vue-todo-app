<template>
  <div id="app">
    <ul class="nav">
        <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
        
        <template v-if="isLoggedIn">
          <li><router-link :to="{ name: 'Todo' }">Todo</router-link></li>
        </template>

        <li><router-link :to="{ name: 'About' }">About</router-link></li>

        <template v-if="!isLoggedIn">
          <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li><router-link :to="{ name: 'Register' }">Register</router-link></li>
        </template>
        <template v-else>
          <li><router-link :to="{ name: 'Logout' }">Logout</router-link></li>
        </template>
    </ul>

    <div>
      <transition 
        enter-active-class="animate__animated animate__fadeIn animate__faster" 
        leave-active-class="animate__animated animate__fadeOut animate__faster"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Master',

  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 24px;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.nav {
  display: flex;
  list-style-type: none;
  padding: 15px 0;
  margin: 0;
  justify-content: flex-end;
  background: #f5f8fa;
  border-bottom: 1px solid lightgray;
  margin-bottom: 24px;
}

.nav a {
  color: #636b6f;
  padding: 0px 25px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1rem;
  text-decoration: none;
  text-transform: uppercase;
}

.server-error {
  margin-bottom: 12px;
  font-size: 16px;
  padding: 10px 16px;
  color: #a94442;
  background: #f3dede;
  border-radius: 4px;
}
</style>