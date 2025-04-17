'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const BusinessesPage = () => {
  const searchParams = useSearchParams();
  const service = searchParams.get('service');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
   if (service) {
      async function fetchBusinesses() {
        setLoading(true);
        try {
          const response = await axios.get('/api/businesses', {
            params: { service },
          });
          if (response.data.length === 0) {
            setError(true); //ttrigger error if no businesses are found
          } else {
            setBusinesses(response.data);
          }
        } catch (err) {
          console.error('Error fetching businesses:', err);
          setError(true); //if error occurs during fetching
        } finally {
          setLoading(false);
        }
      }

      fetchBusinesses();
    }
  }, [service]);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="spinner-border text-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (!service) {
    return <div className="p-8 text-center">No service selected</div>;
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Sorry, we couldn't find any businesses for "{service}".
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-300 mb-6">
          Don't worry, try searching for a different service or try again later.
        </p>
        <button
          onClick={() => window.location.href = '/homepage'}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
        >
          Go Back to Homepage
        </button>
      </div>
    );
  }

  if (!service) {
    return <div>No service selected</div>;
  }
 return (
  <div className="pt-24 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-10">
      Businesses Offering: {service}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-xl transition"
        >
          {/* Image Placeholder or Gallery.. */}
          <div className="mb-4">
            <img
              src={business.image || "/placeholder.jpg"}
              alt={business.name}
              className="w-full h-40 object-cover rounded-xl"
            />
          </div>

          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {business.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {business.description}
          </p>
          <div className="text-sm text-gray-500 mt-2">
            📍 {business.location || "Unknown Location"} <br />
            📞 {business.tel || "No number"}
          </div>

          {/* Rating */}
          <div className="flex items-center mt-3">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < (business.rating || 4) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.423 4.38h4.6c.969 0 1.371 1.24.588 1.81l-3.723 2.707 1.422 4.38c.3.922-.755 1.688-1.54 1.118L10 14.347l-3.72 2.975c-.785.57-1.84-.196-1.54-1.118l1.422-4.38-3.722-2.707c-.784-.57-.38-1.81.588-1.81h4.6l1.423-4.38z" />
                </svg>
              ))}
          </div>

          {/* CTA */}
          <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium">
            Book Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

};

export default BusinessesPage;
