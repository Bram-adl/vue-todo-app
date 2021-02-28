<template>
  <div class="flex-center">
    <div class="register-form">
      <h2>Register</h2>

      <form action="#" @submit.prevent="register">
        <div class="server-error" v-if="error">
          <div v-for="(err, key) in error" :key="key">
            {{ err[0] }}
          </div>
        </div>
        
        <div class="form-control">
          <label for="name">Name</label>
          <input type="name" name="name" id="name" class="login-input" v-model="name">
        </div>

        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" class="login-input" v-model="email">
        </div>

        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" class="login-input" v-model="password">
        </div>

        <div class="form-control">
          <button type="submit" class="btn-submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',

  data: function () {
    return {
      name: '',
      email: '',
      password: '',

      error: '',
    };
  },

  methods: {
    register: function () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ name: 'Login' });
        })
        .catch(error => {
          this.error = Object.values(error.response.data.errors);
        });
    },
  },
}
</script>

<style lang="scss">
.register-form {
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