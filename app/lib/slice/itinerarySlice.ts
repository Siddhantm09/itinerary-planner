"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyItinerary, Place } from "../interface";
import { locations } from "./constants";
interface Location {
  id: string;
  name: string;
  country: string;
}
// Define the shape of the initial state
interface ItineraryState {
  selectedLocation: Location | null;
  itinerary: DailyItinerary[];
  locations: Location[];
}

// Initial state
const initialState: ItineraryState = {
  selectedLocation: null,
  itinerary: [],
  locations: locations,
};

export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    // Set the selected location
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      state.selectedLocation = action.payload;
    },

    // Add a new day to the itinerary
    addDay: (state, action: PayloadAction<{ date: string }>) => {
      if (!state.selectedLocation) return;

      const newDay: DailyItinerary = {
        id: Date.now().toString(),
        date: action.payload.date,
        activities: [],
      };

      state.itinerary.push(newDay);
    },

    // Remove a day from the itinerary
    removeDay: (state, action: PayloadAction<string>) => {
      state.itinerary = state.itinerary.filter(
        (day) => day.id !== action.payload
      );
    },

    // Add an activity to a specific day
    addActivity: (
      state,
      action: PayloadAction<{
        dayId: string;
        place?: Place;
      }>
    ) => {
      const { dayId, place } = action.payload;
      const dayToUpdate = state.itinerary.find((day) => day.id === dayId);

      if (dayToUpdate) {
        dayToUpdate.activities.push({
          id: Date.now().toString(),
          time: "",
          type: place?.type ?? "",
          name: place?.name ?? "",
          details: place?.description ?? "",
        });
      }
    },
    // Add this reducer to the existing reducers in itinerarySlice
    addCustomActivity: (
      state,
      action: PayloadAction<{
        dayId: string;
        name: string;
        details?: string;
        time?: string;
      }>
    ) => {
      const { dayId, name, details, time } = action.payload;
      const dayToUpdate = state.itinerary.find((day) => day.id === dayId);

      if (dayToUpdate) {
        dayToUpdate.activities.push({
          id: Date.now().toString(),
          type: "custom",
          name,
          details: details || "",
          time: time || "",
        });
      }
    },
    // Remove an activity from a specific day
    removeActivity: (
      state,
      action: PayloadAction<{
        dayId: string;
        activityId: string;
      }>
    ) => {
      const { dayId, activityId } = action.payload;
      const dayToUpdate = state.itinerary.find((day) => day.id === dayId);

      if (dayToUpdate) {
        dayToUpdate.activities = dayToUpdate.activities.filter(
          (activity) => activity.id !== activityId
        );
      }
    },

    // Update activity time
    updateActivityTime: (
      state,
      action: PayloadAction<{
        dayId: string;
        activityId: string;
        time: string;
      }>
    ) => {
      const { dayId, activityId, time } = action.payload;
      const dayToUpdate = state.itinerary.find((day) => day.id === dayId);

      if (dayToUpdate) {
        const activityToUpdate = dayToUpdate.activities.find(
          (activity) => activity.id === activityId
        );

        if (activityToUpdate) {
          activityToUpdate.time = time;
        }
      }
    },

    // Clear entire itinerary
    clearItinerary: (state) => {
      state.itinerary = [];
      state.selectedLocation = null;
    },
  },
});

// Export actions
export const {
  setSelectedLocation,
  addDay,
  removeDay,
  addActivity,
  removeActivity,
  updateActivityTime,
  clearItinerary,
  addCustomActivity, // Add this line
} = itinerarySlice.actions;
// Export reducer
export default itinerarySlice.reducer;
