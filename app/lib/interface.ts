export interface Location {
  id: string;
  name: string;
  country: string;
}

export interface Place {
  id: string;
  name: string;
  state: string;
  type: string;
  description: string;
  rating?: number;
  famousFor: string[];
}

export interface Activity {
  id: string;
  time: string;
  type: string;
  name: string;
  details?: string;
  transportMode?: string;
  distance?: string;
  address?: string;
}

export interface DailyItinerary {
  id: string;
  date: string;
  activities: Activity[];
}
