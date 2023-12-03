<script>
import db from "../../firebase/init.js";
import { collection, doc, onSnapshot, deleteDoc } from "firebase/firestore";

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
        Array.from({ length: 8 }, () => null)
      ),
      startCells: [],
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
      return this.grid[rowIndex][day] !== null;
    },
    getEventName(day, rowIndex) {
      return this.grid[rowIndex][day].eventName;
    },
    getEventColor(day, rowIndex) {
      const eventList = this.grid[rowIndex][day].events;
      if (eventList.length === 0) {
        return "fff";
      } else {
        return eventList[0].color;
      }
    },
    isStartCell(day, rowIndex) {
      let days = this.daysOfWeek.slice(1);
      const searchCell = [days[day], rowIndex - 1];
      const isInArray = this.startCells.some(
        (item) => JSON.stringify(item) === JSON.stringify(searchCell)
      );
      return isInArray;
    },
    async deleteEvent(day, rowIndex) {
      await deleteDoc(doc(db, "Task", this.grid[rowIndex][day].id));
      location.reload();
    },
    markBusyCells() {
      for (let event of this.events) {
        const { eventTime, eventDay } = event;
        const startTime = Math.floor(eventTime[0] / 2);
        const endTime = Math.floor(eventTime[1] / 2);

        // Map day to its index (Monday=0, Tuesday=1, ..., Sunday=6)
        let days = this.daysOfWeek.slice(1);
        let dayIndex = days.indexOf(eventDay);

        this.startCells.push([eventDay, startTime]);
        // Mark cells as busy
        for (let i = startTime; i <= endTime; i++) {
          this.grid[i][dayIndex] = event;
        }
      }
    },
  },
  mounted() {
    onSnapshot(collection(db, "Task"), (querySnapshot) => {
      querySnapshot.forEach((task) => {
        this.events.push({ id: task.id, ...task.data() });
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

      <v-col
        class="pa-0"
        v-for="(dayIndex, day) in daysOfWeek.slice(1)"
        :key="dayIndex"
      >
        <v-sheet
          v-if="hasEvent(day, rowIndex)"
          :color="getEventColor(day, rowIndex)"
          :height="40"
        >
          <p class="eventName d-flex justify-center align-center">
            <span
              v-if="this.isStartCell(day, rowIndex)"
              class="cross"
              @click="deleteEvent(day, rowIndex)"
              >❌</span
            >
            {{ getEventName(day, rowIndex) }}
          </p>
        </v-sheet>
        <v-sheet v-else>
          <p class="d-flex justify-center align-center">🆓</p>
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

.eventName {
  font-size: 12px;
  height: 100%;
  position: relative;
}

.cross {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  width: 20px;
  border: 1px solid black;
  text-align: center;
  right: -8px;
  top: -8px;
}
</style>
