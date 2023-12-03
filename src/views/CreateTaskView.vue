<script>
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase/init.js";

export default {
  data() {
    return {
      eventDay: null,
      eventName: null,
      events: [
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
    };
  },
  methods: {
    async submitForm() {
      const eventData = {
        eventDay: this.eventDay,
        eventName: this.eventName,
        eventTime: this.range,
        events: this.events.filter((event) => event.selected),
      };
      try {
        const docRef = await addDoc(collection(db, "Task"), eventData);
        alert("You have successfully created a new event!");
        this.resetForm();
      } catch (error) {
        console.error("Error adding documents: ", error);
      }
    },
    resetForm() {
      this.eventDay = null;
      this.eventName = null;
      this.eventTime = [0, 24];
      this.events.forEach((event) => (event.selected = false));
    },
  },
};
</script>

<template>
  <h1>Create Task Page</h1>
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
            v-for="(event, index) in events"
            :key="event"
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="events[index].selected"
              :label="events[index].name"
              :color="events[index].color"
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
