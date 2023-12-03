<script>
import Calendar from "../components/Calendar.vue";
import Tooltip from "../components/Tooltip.vue";

export default {
  components: {
    Calendar,
    Tooltip,
  },
};
</script>

<template>
  <div>
    <v-container align="center">
      <v-row>
        <v-col>
          <v-card class="pa-2">
            <v-card-title class="text-h5" style="color: rgb(0, 189, 0)"
              >Welcome to Your Calendar</v-card-title
            >
            <v-card-subtitle style="color: rgb(0, 189, 0)"
              >Stay organized and manage your schedule</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-sheet rounded :elevation="10" :height="570" :width="1280">
      <Tooltip />
      <Calendar />
    </v-sheet>
  </div>
</template>
