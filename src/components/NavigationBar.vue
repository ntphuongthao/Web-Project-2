<script setup>
import { RouterLink } from "vue-router";
import {
  mdiHomeCircle,
  mdiInformation,
  mdiPlusCircle,
  mdiCalendarMonth,
} from "@mdi/js";
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation grow color="primary" horizontal>
      <v-btn>
        <RouterLink to="/">
          <div>
            <v-icon
              color="success"
              size="x-large"
              :icon="mdiInformation"
            ></v-icon>
          </div>
          <p>Home</p>
        </RouterLink>
      </v-btn>

      <v-btn>
        <RouterLink to="/create-task">
          <div>
            <v-icon color="success" size="x-large" :icon="mdiPlusCircle">
            </v-icon>
          </div>
          <p>Create Task</p>
        </RouterLink>
      </v-btn>

      <v-btn>
        <RouterLink to="/timetable">
          <v-icon
            color="success"
            size="x-large"
            :icon="mdiCalendarMonth"
          ></v-icon>
          <p>Time Table</p>
        </RouterLink>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
