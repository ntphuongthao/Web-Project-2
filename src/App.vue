<script setup>
import NavigationBar from "./components/NavigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <v-container
    fluid
    class="flex-column bg-surface-variant fill-height flex-nowrap"
  >
    <RouterView />
    <NavigationBar />
  </v-container>
</template>

<style scoped>
.flex-column {
  flex-direction: column;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
