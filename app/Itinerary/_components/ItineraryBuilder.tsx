"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Trash2, Clock } from "lucide-react";
import { AlertWithIcon } from "@/components/ui/Alert";
import { RootState, useAppDispatch, useAppSelector } from "@/app/lib/store";
import {
  addActivity,
  addCustomActivity,
  addDay,
  removeActivity,
  removeDay,
  setSelectedLocation,
  updateActivityTime,
} from "@/app/lib/slice/itinerarySlice";
import { Place } from "@/app/lib/interface";
import PlaceSearch from "./searchArea";

const ItineraryBuilder = () => {
  const dispatch = useAppDispatch();
  const { locations, selectedLocation, itinerary } = useAppSelector(
    (state: RootState) => state.itinerarySlice
  );

  const handleLocationChange = (locationId: string) => {
    const location = locations.find((l) => l.id === locationId);
    dispatch(setSelectedLocation(location || null));
  };

  const handleAddDay = (date: string) => {
    dispatch(addDay({ date }));
  };

  const handleAddActivity = (dayId: string, place?: Place) => {
    dispatch(addActivity({ dayId, place }));
  };

  const handlePlaceSelect = (place: Place) => {
    if (itinerary.length === 0) {
      handleAddDay(new Date().toISOString().split("T")[0]);
    }
    const lastDayId = itinerary[itinerary.length - 1]?.id;
    handleAddActivity(lastDayId, place);
  };

  return (
    <div className="container mx-auto px-4 py-6 h-screen max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Itinerary Builder */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl font-bold">
                Location-based Itinerary Builder
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Location Selector */}
                <div className="flex-grow">
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={selectedLocation?.id || ""}
                    onChange={(e) => handleLocationChange(e.target.value)}
                  >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}, {location.country}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Date Input */}
                {selectedLocation && (
                  <Input
                    type="date"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddDay(e.target.value);
                      }
                    }}
                    className="w-full sm:w-48"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[calc(100vh-16rem)]">
              {/* Empty State */}
              {itinerary.length === 0 && selectedLocation && (
                <AlertWithIcon variant="info" className="mb-4">
                  <p>Start by adding a day to your itinerary!</p>
                </AlertWithIcon>
              )}

              {/* Itinerary Days */}
              <div className="space-y-4">
                {itinerary.map((day) => (
                  <Card key={day.id} className="border-2">
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{day.date}</CardTitle>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => dispatch(removeDay(day.id))}
                          className="h-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-end mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const activityName = prompt("Enter activity name:");
                            const activityDetails = prompt(
                              "Enter activity details (optional):"
                            );
                            const activityTime = prompt(
                              "Enter activity time (optional, HH:MM):"
                            );

                            if (activityName) {
                              dispatch(
                                addCustomActivity({
                                  dayId: day.id,
                                  name: activityName,
                                  details: activityDetails || undefined,
                                  time: activityTime || undefined,
                                })
                              );
                            }
                          }}
                          className="text-xs"
                        >
                          + Custom Activity
                        </Button>
                      </div>
                      {day.activities.length === 0 ? (
                        <p className="text-muted-foreground text-sm">
                          No activities added yet
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {day.activities.map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                            >
                              <div className="flex items-center gap-2 min-w-[120px]">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="time"
                                  value={activity.time}
                                  onChange={(e) =>
                                    dispatch(
                                      updateActivityTime({
                                        dayId: day.id,
                                        activityId: activity.id,
                                        time: e.target.value,
                                      })
                                    )
                                  }
                                  className="h-8 w-50"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium text-sm">
                                  {activity.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.details}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  dispatch(
                                    removeActivity({
                                      dayId: day.id,
                                      activityId: activity.id,
                                    })
                                  )
                                }
                                className="h-8 hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Place Search */}
        <div className="md:col-span-1">
          <PlaceSearch onPlaceSelect={handlePlaceSelect} />
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
