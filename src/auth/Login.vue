<template>
  <div class="flex-center">
    <div class="login-form">
      <h2>Login</h2>

      <form action="#" @submit.prevent="login">
        <div class="form-control">
          <label for="email">Username/Email</label>
          <input type="email" name="username" id="username" class="login-input" v-model="username">
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" class="login-input" v-model="password">
        </div>

        <div class="form-control">
          <button type="submit" class="btn-submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data: function () {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    login: function () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ name: 'Todo' });
        })
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
    cursor: pointer;
  }
}
</style>