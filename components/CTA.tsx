import React from "react";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="bg-blue-600 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Start Planning Your Next Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who are already planning their dream
            trips with our platform.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-blue-50 transition-colors">
            Get Started for Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
