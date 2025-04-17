'use client';

import React, { useState, useEffect } from "react";
import { FaSearch, FaTools, FaCode, FaPaintBrush, FaTruckMoving, FaBroom, FaCut } from "react-icons/fa";
import axios from "axios"; // Optional for using Axios instead of fetch
import { useRouter } from 'next/navigation';

interface Location {
  latitude: number;
  longitude: number;
}

interface Service {
  name: string;
  icon: JSX.Element;
}

export default function Homepage() {
  const router = useRouter(); //initialize useRouter for navigation
  const [location, setLocation] = useState<Location | null>(null);
  const [locationName, setLocationName] = useState<string>("Detecting...");
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
  const [suggestions, setSuggestions] = useState<Service[]>([]); // State for autocomplete suggestions

  const services: Service[] = [
    { name: "Furniture Moving", icon: <FaTruckMoving /> },
    { name: "Housekeeping", icon: <FaBroom /> },
    { name: "Hairdressing", icon: <FaCut /> },
    { name: "Web Design", icon: <FaPaintBrush /> },
    { name: "App Development", icon: <FaCode /> },
    { name: "General Repairs", icon: <FaTools /> },
  ];

  //fetch user location (same as your previous code)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocationName("Unable to detect location");
        }
      );
    } else {
      console.error("Geolocation not supported by browser");
      setLocationName("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    async function fetchLocationName() {
      if (location) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyAhHxQ0FpLQ-51Cbd50ek2rSbQfc-nxxB4`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch location name");
          }
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setLocationName(data.results[0].formatted_address);
          } else {
            setLocationName("Location name not found");
          }
        } catch (error) {
          console.error("Error fetching location name:", error);
          setLocationName("Error retrieving location name");
        }
      }
    }
    fetchLocationName();
  }, [location]);

  //handle click on service to navigate to the businesses page
  const handleServiceClick = (serviceName: string) => {
    //redirect to the businesses page with the selected service as a query param
    router.push(`/Businesses?service=${serviceName}`);
  };

  //handle search query change (same as your previous code)
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    //if search query is empty, return
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/autocomplete', {
        params: { input: query }
      });
    
      const result = response.data.map((service: string) => ({
        name: service,
        icon: <FaSearch /> 
      }));
    
      setSuggestions(result);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    }
  };

  //function to handle selecting a suggestion
  const handleSuggestionClick = (suggestion: Service) => {
    setSearchQuery(suggestion.name); //set the search query to the selected suggestion's name
    setSuggestions([]); //hide suggestions dropdown
    //redirect to the businesses page with the selected service
    router.push(`/businesses?service=${suggestion.name}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center transition-colors duration-300"
      style={{
        marginTop: "158px",
      }}
    >
      <header className="w-full max-w-4xl px-6 text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wide">
          Find Your Service
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          Get tailored recommendations based on your location
        </p>
      </header>

      <div className="text-gray-900 dark:text-gray-300 mb-6">
        <p>
          <strong>Detected Location:</strong> {locationName}
        </p>
      </div>

      <div className="relative w-full max-w-3xl px-6 mb-8">
        <input
          type="text"
          placeholder="Search for services..."
          className="w-full p-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-500 text-lg"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FaSearch className="absolute top-4 right-8 text-purple-500 dark:text-purple-400 text-2xl cursor-pointer" />

        {/* Display autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => handleSuggestionClick(suggestion)} // Add the click handler here
              >
                <span className="mr-4 text-purple-500">{suggestion.icon}</span>
                <span>{suggestion.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="w-full max-w-4xl px-6 mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Available Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transform transition hover:scale-105 cursor-pointer"
              onClick={() => handleServiceClick(service.name)} // Call handleServiceClick on service click
            >
              <span className="text-purple-500 dark:text-purple-400 text-5xl mb-4">
                {service.icon}
              </span>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
