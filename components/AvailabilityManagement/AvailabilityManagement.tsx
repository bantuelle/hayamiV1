import React, { useState } from "react";
import { DatePicker, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "antd/dist/reset.css"; // Ensure you have antd styles imported

const AvailabilityManagement: React.FC = () => {
  const [availability, setAvailability] = useState<
    { date: Dayjs; startTime: Dayjs; endTime: Dayjs }[]
  >([]);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const addAvailability = () => {
    if (selectedDate && startTime && endTime) {
      setAvailability([
        ...availability,
        { date: selectedDate, startTime, endTime },
      ]);
      // Reset inputs after adding
      setSelectedDate(null);
      setStartTime(null);
      setEndTime(null);
    }
  };

  const removeAvailability = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-md">
      <h3 className="text-xl font-bold mb-4">Manage Your Availability</h3>

      {/* Date and Time Pickers */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Date:</label>
        <DatePicker
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="w-full mb-4"
        />

        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block mb-2 font-medium">Start Time:</label>
            <TimePicker
              value={startTime}
              onChange={(time) => setStartTime(time)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium">End Time:</label>
            <TimePicker
              value={endTime}
              onChange={(time) => setEndTime(time)}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={addAvailability}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={!selectedDate || !startTime || !endTime}
        >
          Add Availability
        </button>
      </div>

      {/* Display Added Availabilities */}
      <div>
        <h4 className="text-lg font-medium mb-3">Your Availability:</h4>
        {availability.length > 0 ? (
          <ul className="space-y-3">
            {availability.map((slot, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
              >
                <div>
                  <p>
                    <strong>Date:</strong> {slot.date.format("YYYY-MM-DD")}
                  </p>
                  <p>
                    <strong>Time:</strong> {slot.startTime.format("HH:mm")} -{" "}
                    {slot.endTime.format("HH:mm")}
                  </p>
                </div>
                <button
                  onClick={() => removeAvailability(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No availability added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AvailabilityManagement;
