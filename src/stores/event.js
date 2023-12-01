import { defineStore } from "pinia";

export const useEventStore = defineStore("eventStore", {
  state: () => {
    return {
      eventTypes: [
        { name: "Birthday", color: "#FF6E6E" },
        { name: "Holiday", color: "#FFB966" },
        { name: "Training", color: "#FFFF99" },
        { name: "Study", color: "#B7E1AF" },
        { name: "Customized", color: "#AED9E0" },
        { name: "Project", color: "#CAA9E4" },
        { name: "Academic", color: "#FFB3D9" },
        { name: "Task", color: "#FFD8B1" },
      ],
      events: [],
    };
  },
  getters: {
    getEventTypes(state) {
      return state.eventTypes;
    },
    getEvents(state) {
      return state.events;
    },
  },
});
