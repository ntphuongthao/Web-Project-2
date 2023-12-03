<script>
import { mapState } from "pinia";
import { useEventStore } from "../stores/event.js";

export default {
  computed: {
    ...mapState(useEventStore, ["getEventTypes", "getEvents"]),
    eventTypes: {
      get() {
        return this.getEventTypes;
      },
    },
    events: {
      get() {
        return this.getEvents;
      },
    },
  },
};
</script>

<template>
  <div class="container">
    <v-row no-gutters>
      <v-col v-for="event in eventTypes" :key="event.name">
        <v-sheet
          rounded
          border
          :elevation="4"
          :color="event.color"
          class="d-flex justify-center align-center pa-1 ma-2"
        >
          <p class="font-weight-bold">{{ event.name }}</p>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.container {
  margin: 1rem;
}
</style>
