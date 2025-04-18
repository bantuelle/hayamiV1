'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const BusinessesPage = () => {
  const [isClient, setIsClient] = useState(false);  //track if we're on the client
  const searchParams = useSearchParams();
  const service = searchParams.get('service');
  
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //tis ensures that useSearchParams runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && service) {
      const fetchBusinesses = async () => {
        setLoading(true);
        setError(false);

        try {
          const { data } = await axios.get('/api/businesses', {
            params: { service },
          });
          
          console.log('Fetched businesses data:', data);
          setBusinesses(data || []);
        } catch (err) {
          console.error('Error fetching businesses:', err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      fetchBusinesses();
    } else {
      setLoading(false);
    }
  }, [isClient, service]);

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
          Sorry, we couldn't fetch businesses for "{service}".
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-300 mb-6">
          Try again later or search for a different service.
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

  if (businesses.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          No businesses found for "{service}"
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mb-6">
          Please try a different service.
        </p>
        <button
          onClick={() => window.location.href = '/homepage'}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="pt-24 px-4 sm:px-8 min-h-screen flex flex-col items-center transition-colors duration-300"
      style={{
        marginTop: "158px",
      }}
    >
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-10">
        Businesses Offering: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 dark:from-purple-300 dark:via-blue-300 dark:to-pink-300">{service}</span> services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-xl transition"
          >
            <div className="mb-4">
              <img
                src={business?.image || "/placeholder.jpg"}
                alt={business?.name || "Business Image"}
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {business?.name || 'No Name Available'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {business?.description || 'No description available'}
            </p>
            <div className="text-sm text-gray-500 mt-2">
              📍 {business?.location || "Unknown Location"} <br />
              📞 {business?.tel || "No number available"}
            </div>

            <div className="flex items-center mt-3">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < (business?.rating || 4) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.423 4.38h4.6c.969 0 1.371 1.24.588 1.81l-3.723 2.707 1.422 4.38c.3.922-.755 1.688-1.54 1.118L10 14.347l-3.72 2.975c-.785.57-1.84-.196-1.54-1.118l1.422-4.38-3.722-2.707c-.784-.57-.38-1.81.588-1.81h4.6l1.423-4.38z" />
                  </svg>
                ))}
            </div>

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
