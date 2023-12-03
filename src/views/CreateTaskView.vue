<script>
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import db from "../../firebase/init.js";

export default {
  data() {
    return {
      eventDay: null,
      eventName: null,
      eventTypes: [
        {
          name: "Birthday",
          selected: false,
          color: "#FF6E6E",
        },
        {
          name: "Holiday",
          selected: false,
          color: "#FFB966",
        },
        {
          name: "Training",
          selected: false,
          color: "#FFD700",
        },
        {
          name: "Study",
          selected: false,
          color: "#B7E1AF",
        },
        {
          name: "Customized",
          selected: false,
          color: "#AED9E0",
        },
        {
          name: "project",
          selected: false,
          color: "#CAA9E4",
        },
        {
          name: "Academic",
          selected: false,
          color: "#BC8F8F",
        },
        {
          name: "Task",
          selected: false,
          color: "#FFD8B1",
        },
      ],
      range: [0, 24],
      events: [],
    };
  },
  methods: {
    async submitForm() {
      const eventData = {
        eventDay: this.eventDay,
        eventName: this.eventName,
        eventTime: this.range,
        events: this.eventTypes.filter((event) => event.selected),
      };

      const [eventStartTime, eventEndTime] = this.range; // [a, b]

      // Get all events from that chosen day
      const sameDayEvents = this.events.filter(
        (event) => event.eventDay === this.eventDay
      );
      let isTimeOverlap = false;

      for (const event of sameDayEvents) {
        const [startTime, endTime] = event.eventTime; // [c, d]
        if (startTime < eventEndTime && eventStartTime < endTime) {
          isTimeOverlap = true;
          break;
        }
      }

      if (isTimeOverlap) {
        alert("You have other events in this time range!");
        return;
      }

      try {
        await addDoc(collection(db, "Task"), eventData);
        alert("You have successfully created a new event!");
        this.resetForm();
      } catch (error) {
        console.error("Error adding documents: ", error);
      }
    },
    resetForm() {
      this.eventDay = null;
      this.eventName = null;
      this.range = [0, 24];
      this.eventTypes.forEach((event) => (event.selected = false));
    },
  },
  mounted() {
    onSnapshot(collection(db, "Task"), (querySnapshot) => {
      querySnapshot.forEach((task) => {
        this.events.push({ id: task.id, ...task.data() });
      });
    });
  },
};
</script>

<template>
  <h1>Create a new Task</h1>
  <v-sheet rounded class="pa-6 ma-4" width="600">
    <v-sheet rounded width="500" class="mx-auto transparent-sheet">
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="eventName" label="Event name"></v-text-field>
        <v-select
          v-model="eventDay"
          label="Select Week day"
          :items="[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ]"
        ></v-select>
        <p>Choose your time:</p>
        <v-range-slider
          v-model="range"
          :max="24"
          :min="0"
          :step="2"
          hide-details
          class="align-center mt-2"
        >
          <template v-slot:prepend>
            <v-text-field
              v-model="range[0]"
              hide-details
              single-line
              type="number"
              variant="outlined"
              density="compact"
              style="width: 70px"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              v-model="range[1]"
              hide-details
              single-line
              type="number"
              variant="outlined"
              style="width: 70px"
              density="compact"
            ></v-text-field>
          </template>
        </v-range-slider>

        <v-row class="mt-3">
          <v-col
            v-for="(eventType, index) in eventTypes"
            :key="eventType"
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="eventTypes[index].selected"
              :label="eventTypes[index].name"
              :color="eventTypes[index].color"
              hide-details
            ></v-checkbox>
          </v-col>
        </v-row>

        <v-sheet rounded width="100" class="mx-auto transparent-sheet">
          <v-btn variant="outlined" type="submit" block class="mt-2">
            Submit
          </v-btn>
        </v-sheet>
      </v-form>
    </v-sheet>
  </v-sheet>
</template>

<style scoped>
.transparent-sheet {
  background-color: transparent !important;
}
</style>
