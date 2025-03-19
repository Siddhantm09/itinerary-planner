import React from "react";
import { Calendar, Users, Map, Bell } from "lucide-react";

const features = [
  {
    title: "Smart Calendar",
    description:
      "Organize your trip day by day with our intuitive calendar interface.",
    icon: Calendar,
  },
  {
    title: "Collaborative Planning",
    description: "Plan trips with friends and family in real-time.",
    icon: Users,
  },
  {
    title: "Interactive Maps",
    description: "Visualize your route and discover nearby attractions.",
    icon: Map,
  },
  {
    title: "Travel Alerts",
    description: "Stay updated with real-time notifications about your trip.",
    icon: Bell,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Everything You Need to Plan the Perfect Trip
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Powerful features to make trip planning a breeze
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
