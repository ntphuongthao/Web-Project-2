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
<<<<<<< HEAD
  <v-sheet :elevation="10" :height="600" :width="1200">
=======
  <v-sheet :elevation="10" :height="650" :width="1280">
>>>>>>> 8b46f77 (Restructured the TimeTableView into Calendar and Tooltip components)
    <Tooltip />
    <Calendar />
  </v-sheet>
</template>
