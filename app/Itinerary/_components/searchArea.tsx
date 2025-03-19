"use client";
import React, { useState, useMemo } from "react";
import { Search, Globe, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { INDIAN_PLACES } from "@/app/lib/slice/constants";
import { Place } from "@/app/lib/interface";

// Define interfaces

const PlaceSearch: React.FC<{
  onPlaceSelect: (place: Place) => void;
}> = ({ onPlaceSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return INDIAN_PLACES;

    const query = searchQuery.toLowerCase();
    return INDIAN_PLACES.filter(
      (place) =>
        place.name.toLowerCase().includes(query) ||
        place.state.toLowerCase().includes(query) ||
        place.type.toLowerCase().includes(query) ||
        place.famousFor.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-6 h-6" />
          Discover India
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Input
            placeholder="Search places, states, or activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((place) => (
              <div
                key={place.id}
                className="border rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onPlaceSelect(place)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{place.state}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">{place.type}</p>
                <p className="text-sm mb-2">{place.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {place.famousFor.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{place.rating}/5</span>
                  </div>
                  <Button size="sm">Add to Itinerary</Button>
                </div>
              </div>
            ))
          ) : (
            <Alert>
              <AlertDescription>
                No places found matching your search criteria.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceSearch;
