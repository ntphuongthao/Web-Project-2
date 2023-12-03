<script>
import db from "../../firebase/init.js";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  data() {
    return {
      events: [],
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
      grid: Array.from({ length: 13 }, () =>
        Array.from({ length: 8 }, () => 0)
      ),
    };
  },
  methods: {
    // Function to generate time for each row based on row index
    getTimeForRow(rowIndex) {
      const hour = (rowIndex - 1) * 2;
      const startHour = String(hour).padStart(2, "0");
      const endHour = String(hour + 2).padStart(2, "0");
      return `${startHour}:00 => ${endHour}:00`;
    },
    hasEvent(day, rowIndex) {
      return this.grid[rowIndex][day];
    },
    markBusyCells() {
      for (let event of this.events) {
        const { eventTime, eventDay } = event;
        const startTime = Math.floor(eventTime[0] / 2);
        const endTime = Math.floor(eventTime[1] / 2);

        // Map day to its index (Monday=0, Tuesday=1, ..., Sunday=6)
        let days = this.daysOfWeek.slice(1);
        let dayIndex = days.indexOf(eventDay);

        // Mark cells as busy
        for (let i = startTime; i <= endTime; i++) {
          this.grid[i][dayIndex] = 1;
        }
      }
      console.log("testing hereeeee", this.grid);
    },
  },
  mounted() {
    onSnapshot(collection(db, "Task"), (querySnapshot) => {
      querySnapshot.forEach((task) => {
        this.events.push(task.data());
      });
      this.markBusyCells();
    });
  },
};
</script>

<template>
  <div class="container">
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
      v-for="rowIndex in 12"
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

      <v-col class="pa-0" v-for="(dayIndex, day) in daysOfWeek" :key="dayIndex">
        <v-sheet class="d-flex justify-center align-center" :height="40">
          <!-- Check if there is an event on the specific day and time -->
          <template v-if="hasEvent(day, rowIndex)">
            <!-- Display the event representation -->
            <p>Event!</p>
          </template>
          <template v-else>
            <!-- If no event, display empty -->
            <p>🆓</p>
          </template>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.container {
  margin: 2rem;
  margin-top: 1rem;
}
</style>
