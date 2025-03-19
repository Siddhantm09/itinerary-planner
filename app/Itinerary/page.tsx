import React from "react";
import ItineraryBuilder from "./_components/ItineraryBuilder";

const page = () => {
  return (
    <div className="max-w-[80%] mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Trip Itinerary Builder
      </h1>
      <p className="text-lg text-center mb-8">
        Create and organize your daily travel activities with ease
      </p>
      <ItineraryBuilder />
    </div>
  );
};

export default page;
