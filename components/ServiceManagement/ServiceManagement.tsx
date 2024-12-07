// ServiceManagement.tsx
import React from "react";

const ServiceManagement: React.FC = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-md">
      <h3 className="text-xl font-bold">Manage Your Services</h3>
      <div className="mt-4">
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Add New Service
        </button>
      </div>
      <ul className="mt-4">
        <li>Plumbing</li>
        <li>Hairdressing</li>
        <li>Mechanic</li>
        <li>Laundry Services</li>
      </ul>
    </div>
  );
};

export default ServiceManagement;
