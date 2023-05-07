<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  components: {
    RouterView
  }
}
</script>

<template>
  <header class="navbar m-4 w-auto rounded-lg bg-base-300">
    <div class="navbar-start"></div>
    <div class="navbar-center">
      <router-link to="/" class="btn btn-ghost normal-case text-xl">eXAMcreate</router-link>
    </div>
    <div class="navbar-end"></div>
  </header>

  <main class="p-4">
    <RouterView />
  </main>

  <footer class="footer footer-center rounded-lg m-4 p-4 w-auto bg-base-300 text-base-content">
    <div>
      <p>
        Copyright © 2023, made with ❤ by
        <a href="https://github.com/mweiershaeuser" target="_blank" class="hover:underline"
          >Melvin Weiershäuser</a
        >
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
