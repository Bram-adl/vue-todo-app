<template>
  <div></div>
</template>

<script>
export default {
  name: 'Logout',

  created: function () {
    this.$store.dispatch('clearTodos');
    
    this.$store.dispatch('logout')
      .then(() => {
        this.$router.push({ name: 'Home' });
      });
  }
}
</script>

<style>

</style>