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
      endCells: [],
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
        return "grey";
      } else {
        return eventList[0].color;
      }
    },
    isStartCell(day, rowIndex) {
      let days = this.daysOfWeek.slice(1);
      const searchCell = [days[day], rowIndex];
      const isInArray = this.startCells.some(
        (item) => JSON.stringify(item) === JSON.stringify(searchCell)
      );
      return isInArray;
    },
    isEndCell(day, rowIndex) {
      let days = this.daysOfWeek.slice(1);
      const searchCell = [days[day], rowIndex];
      const isInArray = this.endCells.some(
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
        const startTime = Math.floor(eventTime[0] / 2) + 1;
        const endTime = Math.floor(eventTime[1] / 2);

        // Map day to its index (Monday=0, Tuesday=1, ..., Sunday=6)
        let days = this.daysOfWeek.slice(1);
        let dayIndex = days.indexOf(eventDay);

        this.startCells.push([eventDay, startTime]);
        this.endCells.push([eventDay, endTime]);

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
          :height="36"
          :class="{
            fixBorderTopLeft: day === '',
            fixBorderTopRight: day === 'Sunday',
          }"
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
      :class="{ 'mt-1': rowIndex === 1 }"
    >
      <v-col class="pa-0">
        <v-sheet
          class="d-flex justify-center align-center font-weight-bold"
          color="grey-lighten-3"
          :height="36"
          :class="{
            fixBorderBottomLeft: rowIndex === 12,
          }"
        >
          ⏳ {{ getTimeForRow(rowIndex) }}
        </v-sheet>
      </v-col>

      <v-col
        class="pa-0 ml-1"
        v-for="(dayIndex, day) in daysOfWeek.slice(1)"
        :key="dayIndex"
        :class="{
          fixBorderBottomRight: rowIndex === 12,
        }"
      >
        <v-sheet
          v-if="hasEvent(day, rowIndex)"
          :color="getEventColor(day, rowIndex)"
          :height="36"
          :class="{
            startCell: this.isStartCell(day, rowIndex),
            endCell: this.isEndCell(day, rowIndex),
          }"
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
  border: 1px solid #808080;
  border-radius: 0.5rem;
}

.fixBorderTopLeft {
  border-top-left-radius: 0.5rem;
}

.fixBorderTopRight {
  border-top-right-radius: 0.5rem;
}
.fixBorderBottomLeft {
  border-bottom-left-radius: 0.5rem;
}

.fixBorderbottomRight {
  border-bottom-right-radius: 0.5rem;
}

.eventName {
  font-size: 12px;
  height: 100%;
  position: relative;
}

.startCell {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.endCell {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
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
