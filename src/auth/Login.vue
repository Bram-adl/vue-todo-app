<template>
  <div class="flex-center">
    <div class="login-form">
      <h2>Login</h2>

      <form action="#" @submit.prevent="login">
        <div class="server-error" v-if="error">
          {{ error }}
        </div>
        
        <div class="form-control">
          <label for="email">Username/Email</label>
          <input type="email" name="username" id="username" class="login-input" v-model="username">
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" class="login-input" v-model="password">
        </div>

        <div class="form-control">
          <button type="submit" class="btn-submit" :disabled="loading">
            <Loader v-if="loading" />
            
            <span v-else>Login</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue';

export default {
  name: 'Login',

  components: { 
    Loader
  },

  data: function () {
    return {
      username: '',
      password: '',

      error: '',
      loading: false,
    };
  },

  methods: {
    login: function () {
      this.loading = true;
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: 'Todo' });
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data;
          this.password = '';
        });
    },
  },
}
</script>

<style lang="scss">
.login-form {
  max-width: 600px;
  width: 100%;
}

h2 {
  text-align: center;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.form-control {
  margin-top: 16px;

  label {
    display: block;
    font-size: 20px;
    font-weight: bold;
  }

  input {
    border: 1px solid lightgrey;
    outline: none;
    background: none;

    width: 100%;
    padding: 12px 16px;
    margin: 12px 0 0 0;
  }

  .btn-submit {
    width: 100%;
    padding: 12px 16px;
    margin: 24px 0 0 0;

    background: lightgreen;
    color: white;
    border: none;
    outline: none;

    font-size: 16px;
    font-weight: bold;
    transition: .2s ease-out;
    cursor: pointer;

    &:hover {
      background: darken(lightgreen, 5%);
    }

    &:disabled {
      background: lighten(lightgreen, 5%);
      cursor: not-allowed;
    }
  }
}
</style>