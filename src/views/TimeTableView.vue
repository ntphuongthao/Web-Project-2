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
  <v-sheet :elevation="10" :height="600" :width="1200">
    <Tooltip />
    <Calendar />
  </v-sheet>
</template>
