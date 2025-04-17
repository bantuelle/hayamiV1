import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios'; 

const BusinessesPage = () => {
  const router = useRouter();
  const { service } = router.query; //get selected service from the URL
  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    if (service) {
      async function fetchBusinesses() {
        try {
          const response = await axios.get('/api/businesses', {
            params: { service }
          });
          setBusinesses(response.data);
        } catch (error) {
          console.error('Error fetching businesses:', error);
        }
      }

      fetchBusinesses();
    }
  }, [service]);

  return (
    <div
      className="min-h-screen flex flex-col items-center transition-colors duration-300"
      style={{
        marginTop: "158px",
      }}
    >

      <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Businesses Offering: {service}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business, index) => (
          <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{business.name}</h3>
            <p>{business.description}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default BusinessesPage;
