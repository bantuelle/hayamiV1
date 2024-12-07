// AppointmentsManagement.tsx
import React from "react";

const AppointmentsManagement: React.FC = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-md">
      <h3 className="text-xl font-bold">Your Appointments</h3>
      <div className="mt-4">
        <ul>
          <li>Appointment 1 - Date & Time</li>
          <li>Appointment 2 - Date & Time</li>
          <li>Appointment 3 - Date & Time</li>
        </ul>
      </div>
    </div>
  );
};

export default AppointmentsManagement;
