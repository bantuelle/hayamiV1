"use client";
import React, { useState, useEffect } from "react";

interface ProfileCardProps {
  isEditingInitial?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isEditingInitial = false }) => {
  const [isEditing, setIsEditing] = useState<boolean>(isEditingInitial);

  // Ensure that `isEditing` is only toggled on the client to avoid SSR hydration issues
  useEffect(() => {
    setIsEditing(isEditingInitial);
  }, [isEditingInitial]);

  return (
    <div className="bg-white p-6 shadow-lg rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Your Profile</h3>
        <button
          className="text-blue-500"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="mt-4">
        {/* Profile info display */}
        {!isEditing ? (
          <div>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +27 123 456 789</p>
          </div>
        ) : (
          <form>
            <div className="mt-4">
              <input
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div className="mt-4">
              <input
                type="email"
                className="block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4">
              <input
                type="tel"
                className="block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
