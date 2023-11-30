<script>
export default {
  data() {
    return {
      headers: [
        { title: "Time", value: "time" },
        { title: "Monday", value: "monday" },
        { title: "Tuesday", value: "tuesday" },
        { title: "Wednesday", value: "wednesday" },
        { title: "Thursday", value: "thursday" },
        { title: "Friday", value: "friday" },
        { title: "Saturday", value: "saturday" },
        { title: "Sunday", value: "sunday" },
      ],
      schedule: [],
    };
  },
  created() {
    // Generate a schedule for 24 hours across 7 days (Monday to Sunday)
    for (let hour = 0; hour < 24; hour += 2) {
      const time = `${hour.toString().padStart(2, "0")}:00 - ${(hour + 2)
        .toString()
        .padStart(2, "0")}:00`;
      const row = {
        time,
        monday: "", // Data for Monday
        tuesday: "", // Data for Tuesday
        wednesday: "", // Data for Wednesday
        thursday: "", // Data for Thursday
        friday: "", // Data for Friday
        saturday: "", // Data for Saturday
        sunday: "", // Data for Sunday
      };
      this.schedule.push(row);
    }
  },
};
</script>

<template>
  <div class="container">
    <v-sheet :elevation="10" :height="1000" :width="1600">
      <div class="calendar-container">
        <v-card width="90%">
          <v-card-title>Weekly Schedule</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="schedule"
              class="elevation-1"
              items-per-page="12"
              hide-default-footer
            >
              <template #bottom></template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.container,
.calendar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.calendar-container {
  height: 100%;
}
</style>
