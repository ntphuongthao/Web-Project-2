<script>
export default {
  data() {
    return {
      daysOfWeek: [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  methods: {
    // Function to generate time for each row based on row index
    getTimeForRow(rowIndex) {
      const hour = rowIndex * 2;
      const startHour = String(hour).padStart(2, "0");
      const endHour = String(hour + 2).padStart(2, "0");
      return `${startHour}:00 => ${endHour}:00`;
    },
  },
};
</script>

<template>
  <v-sheet :elevation="10" :height="600" :width="1200">
    <div class="container mt-16 ml-16">
      <v-row class="ma-0 pa-0">
        <v-col class="pa-0" v-for="(day, index) in daysOfWeek" :key="index">
          <v-sheet
            class="d-flex justify-center align-center"
            color="green-lighten-3"
            :height="30"
          >
            <p class="font-weight-black">{{ day }}</p>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row
        class="ma-0 pa-0"
        v-for="rowIndex in 11"
        :key="rowIndex"
        align="center"
      >
        <v-col class="pa-0">
          <v-sheet
            class="d-flex justify-center align-center font-weight-bold"
            color="grey-lighten-3"
            :height="40"
          >
            ⏳ {{ getTimeForRow(rowIndex) }}
          </v-sheet>
        </v-col>
        <v-col class="pa-0" v-for="n in 7" :key="n">
          <v-sheet class="d-flex justify-center align-center" :height="40">
            <p>Empty</p>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<style scoped>
.container {
  margin: 3rem;
}
</style>
