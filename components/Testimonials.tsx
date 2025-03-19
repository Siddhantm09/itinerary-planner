import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Travel Blogger",
    content:
      "This app has completely transformed how I plan my trips. The collaborative features are game-changing!",
    avatar: "/api/placeholder/64/64",
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    content:
      "The best travel planning tool Ive ever used. Simple, intuitive, and incredibly powerful.",
    avatar: "/api/placeholder/64/64",
  },
  {
    name: "Emma Williams",
    role: "Adventure Seeker",
    content:
      "I love how easy it is to organize complex itineraries. A must-have for any serious traveler!",
    avatar: "/api/placeholder/64/64",
  },
];

const Testimonials = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Loved by Travelers Worldwide
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See what our users have to say about their experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-current text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
