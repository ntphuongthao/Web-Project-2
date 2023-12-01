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
  <v-sheet :elevation="10" :height="650" :width="1280">
    <Tooltip />
    <Calendar />
  </v-sheet>
</template>
