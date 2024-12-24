"use client";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { ThemeProvider } from 'next-themes';

const ECommerce: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [availableDays, setAvailableDays] = useState<any[]>([
    { day: "Monday", available: true, slots: ["9 AM - 12 PM", "1 PM - 5 PM"], date: "" },
    { day: "Tuesday", available: false, slots: [], date: "" },
    { day: "Wednesday", available: true, slots: ["9 AM - 12 PM", "1 PM - 5 PM"], date: "" },
    { day: "Thursday", available: false, slots: [], date: "" },
    { day: "Friday", available: true, slots: ["9 AM - 12 PM", "1 PM - 5 PM"], date: "" },
    { day: "Saturday", available: false, slots: [], date: "" },
    { day: "Sunday", available: false, slots: [], date: "" },
  ]);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Get the current date
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-ZA", {
      day: "2-digit",    // Displays day as 2 digits
      month: "short",    // Displays month as short form (e.g., Dec)
      year: "numeric",   // Displays year as 4 digits (e.g., 2025)
    });
    setCurrentDate(formattedDate);

    // Update availableDays with actual dates for the week
    const updatedDays = availableDays.map((day) => {
      const currentDay = new Date();
      const currentDayIndex = currentDay.getDay();
      const dayIndex = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].indexOf(day.day);

      // Calculate the difference in days to the target day
      const diff = (dayIndex - currentDayIndex + 7) % 7;
      currentDay.setDate(currentDay.getDate() + diff);  // Set the correct date

      const formattedDayDate = currentDay.toLocaleDateString("en-ZA", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return { ...day, date: formattedDayDate };
    });

    setAvailableDays(updatedDays);
  }, []);

  const handleBookingAction = (bookingId: number, action: string) => {
    if (action === "accept") {
      setBookings(prevBookings => prevBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'Accepted' } : booking
      ));
    } else if (action === "reject") {
      setBookings(prevBookings => prevBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'Rejected' } : booking
      ));
    }
  };

  const addEarnings = (amount: number) => {
    setEarnings(prevEarnings => prevEarnings + amount);
  };

  const toggleAvailability = (day: string) => {
    setAvailableDays((prevDays) =>
      prevDays.map((item) =>
        item.day === day ? { ...item, available: !item.available } : item
      )
    );
  };

  const handleSlotChange = (day: string, slot: string) => {
    setAvailableDays((prevDays) =>
      prevDays.map((item) =>
        item.day === day
          ? {
              ...item,
              slots: item.slots.includes(slot)
                ? item.slots.filter((s) => s !== slot)
                : [...item.slots, slot],
            }
          : item
      )
    );
  };

  const saveChanges = () => {
    alert("Availability saved successfully!");
  };

  const resetChanges = () => {
    setAvailableDays([
      { day: "Monday", available: true, slots: ["9 AM - 12 PM", "1 PM - 5 PM"], date: "" },
      { day: "Tuesday", available: false, slots: [], date: "" },
      { day: "Wednesday", available: true, slots: ["9 AM - 12 PM", "1 PM - 5 PM"], date: "" },
      { day: "Thursday", available: false, slots: [], date: "" },
      { day: "Friday", available: true, slots: ["9 AM - 12 PM", "1 PM - 5 PM"], date: "" },
      { day: "Saturday", available: false, slots: [], date: "" },
      { day: "Sunday", available: false, slots: [], date: "" },
    ]);
  };

  return (
    <div className="pt-20 bg-gray-900 dark:bg-gray-900 min-h-screen">
      <br />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="py-6 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg shadow-lg">
          <h1 className="text-center text-4xl font-extrabold text-white">Dashboard</h1>
          {/* Display Current Date */}
          <p className="text-center text-lg text-gray-200 mt-2">{currentDate}</p>
        </header>

        {/* Booking Management Section */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-gray-800 text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-bold text-indigo-400">{booking.service}</h3>
                <p className="text-sm mt-2 text-gray-300">Requested by: {booking.client}</p>
                <p className="text-sm text-gray-400">Status: {booking.status}</p>
                <div className="mt-4 flex justify-between space-x-4">
                  <button
                    className="py-2 px-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition ease-in-out duration-300 transform hover:scale-105"
                    onClick={() => handleBookingAction(booking.id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="py-2 px-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition ease-in-out duration-300 transform hover:scale-105"
                    onClick={() => handleBookingAction(booking.id, "reject")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 col-span-full">No new bookings</div>
          )}
        </section>

        {/* Earnings Section */}
        <section className="mt-8 bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-white">Earnings</h3>
            <button
              onClick={() => addEarnings(100)} // Add a fixed earnings value as an example
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Add Earnings
            </button>
          </div>
          <p className="text-4xl mt-6 text-indigo-400 font-bold">R{earnings}</p>
          <p className="text-gray-400 mt-4 text-sm">Track completed jobs and payments</p>
        </section>

        {/* Profile Management Section */}
        <section className="mt-8 bg-gradient-to-r from-pink-500 to-orange-500 p-8 rounded-lg shadow-xl text-white">
          <h3 className="text-2xl font-semibold">Profile</h3>
          <div className="mt-6 space-y-4">
            <p className="text-lg">Name: Nobantu Ndlovu</p>
            <p className="text-lg">Service: Freelance Web Developer</p>
            <p className="text-lg">Availability: 9 AM - 5 PM, Mon - Fri</p>
            <button className="py-2 px-6 bg-teal-600 rounded-full hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105">
              Edit Profile
            </button>
          </div>
        </section>

          {/* Communication Tools */}
      <section className="mt-6">
        <h3 className="text-xl font-medium text-black dark:text-white">Communication Tools</h3>
        <div className="mt-4 flex space-x-4">
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md">
            Chat with Client
          </button>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-md">
            Call Client
          </button>
        </div>
      </section>

        {/* Availability Management Section */}
        <section className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 p-8 rounded-lg shadow-xl text-white">
          <h3 className="text-2xl font-semibold">Manage Your Availability</h3>
          <p className="mt-4 text-gray-200">Set your availability for each day, with specific time slots.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableDays.map((day) => (
              <div
                key={day.day}
                className={`bg-${day.available ? "green" : "gray"}-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-white">
                    {day.day} ({day.date})
                  </h4>
                  <button
                    onClick={() => toggleAvailability(day.day)}
                    className={`px-4 py-2 rounded-full text-white ${day.available ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                  >
                    {day.available ? "Available" : "Unavailable"}
                  </button>
                </div>
                {day.available && (
                  <div className="mt-4">
                    <p className="text-gray-200">Select Available Slots:</p>
                    <div className="mt-2">
                      {["9 AM - 12 PM", "1 PM - 5 PM"].map((slot) => (
                        <div key={slot} className="flex items-center space-x-3 mt-2">
                          <input
                            type="checkbox"
                            id={`${day.day}-${slot}`}
                            checked={day.slots.includes(slot)}
                            onChange={() => handleSlotChange(day.day, slot)}
                            className="text-green-600"
                          />
                          <label htmlFor={`${day.day}-${slot}`} className="text-gray-200">{slot}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={resetChanges}
              className="px-6 py-2 bg-gray-600 rounded-full text-white hover:bg-gray-700 transition-all duration-300"
            >
              Reset
            </button>
            <button
              onClick={saveChanges}
              className="px-6 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </section><br/><br/>
      </div>
    </div>
  );
};

export default ECommerce;
