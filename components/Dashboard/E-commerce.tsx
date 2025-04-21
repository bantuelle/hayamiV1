"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, DollarSign, CalendarDays, MessageSquare,PlusCircle,Settings, Pencil, Trash2,} from "lucide-react";
import { Dialog } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Booking = {
  id: number;
  customer: string;
  date: string;
  time: string;
  amount: number;
};

const ECommerce = () => {
  const { theme } = useTheme();

  const [profile, setProfile] = useState({
    name: "Business Name",
    email: "business@example.co.za",
    phone: "+27 83-652-7922",
    location: "Durban, KwaZulu Natal",   
    accountNumber: "640352600",
    bankName: "First National Bank",
  });
  
  const [availability, setAvailability] = useState([
    { day: "Monday", slots: ["9:00", "10:00", "11:00"] },
    { day: "Tuesday", slots: ["9:00", "10:00", "11:00"] },
    { day: "Wednesday", slots: ["9:00", "10:00", "11:00"] },
    { day: "Thursday", slots: [] }, //no slots = unavailable
    { day: "Friday", slots: ["10:00", "11:00"] },
    { day: "Saturday", slots: [] },
    { day: "Sunday", slots: ["9:00"] },
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const [bookings, setBookings] = useState([
    { id: 1, customer: "John Doe", date: "2025-04-21", time: "9:00", amount: 100 },
    { id: 2, customer: "Jane Smith", date: "2025-04-22", time: "10:00", amount: 150 },
  ]);
  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const bookedSlots = {
    "2025-04-21": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"], //fully booked
    "2025-04-22": ["14:00", "15:00"], //partially booked
    "2025-04-23": [], //fully available
  };

  //get the available slots for a specific date
  const getAvailableSlots = (date: Date | null) => {
    if (!date) return [];

    const dateStr = date.toISOString().split("T")[0];
    const bookedForDate = bookedSlots[dateStr] || [];
    
    return timeSlots.filter(slot => !bookedForDate.includes(slot));
  };

  const availableSlots = getAvailableSlots(selectedDate);

  //check if a date has available slots
  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return bookedSlots[dateStr]?.length < timeSlots.length;
  };

  //customising day styles based on availability
  const getDayClassName = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    const bookedForDate = bookedSlots[dateStr] || [];

    if (bookedForDate.length === timeSlots.length) {
      return "bg-red-500 text-white"; //fully booked
    } else if (bookedForDate.length > 0) {
      return "bg-yellow-400 text-black"; //partially booked
    } else {
      return "bg-green-200 text-black"; //fully available
    }
  };

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [withdrawals, setWithdrawals] = useState<number[]>([]);
  const revenue = bookings.reduce((acc, cur) => acc + cur.amount, 0);
  const availableBalance = revenue - withdrawals.reduce((a, b) => a + b, 0);
  const [gallery, setGallery] = useState<File[]>([]);

  const handleProfileUpdate = () => {
    toast.success("Profile Updated!", {
      duration: 4000,
      position: "top-center",
    });
  };

  const handleWithdraw = () => {
    if (availableBalance <= 0) {
      toast.error("No funds available.");
      return;
    }
    const amount = Math.min(availableBalance, 200);
    setWithdrawals((prev) => [...prev, amount]);
    toast.success("Withdrawal of "+ "R"+`${amount}`+ " has been requested!", {
      duration: 4000,
      position: "top-center",
    });
  };

  const handleManageBooking = (booking) => {
    setSelectedBooking({ ...booking });
    setIsModalOpen(true);
  };

  const handleBookingChange = (field: keyof Booking, value: string | number) => {
    setSelectedBooking((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
  };
  
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGallery(Array.from(e.target.files));
    }
  };
  const handleSaveBooking = () => {
    if (!selectedBooking) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === selectedBooking.id ? selectedBooking : b))
    );
    toast.success("Booking updated");
    setIsModalOpen(false);
  };
  
  const handleDeleteBooking = () => {
    if (!selectedBooking) return;  // Ensure there's a selectedBooking
    setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id));
    toast.success("Booking deleted");
    setIsModalOpen(false);
  };
  

  const isToday = (dateStr: string) => {
    const today = new Date().toISOString().split("T")[0];
    return dateStr === today;
  };
 const isLoggedIn = true
  return (
      <div className="min-h-screen flex flex-col items-center pt-40 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="w-full max-w-4xl px-6 text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-wide">Business Dashboard</h1>
          <p className="text-lg mt-2">Manage your business profile, services, and bookings</p>
        </header>

        <section className="w-full max-w-4xl px-6 mb-12">
          <h2 className="text-3xl font-semibold mb-6">Your Earnings</h2>
          <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <DollarSign className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl font-bold">Total: R{revenue}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available Balance: <strong>R{availableBalance}</strong>
            </p>
            <button
              onClick={handleWithdraw}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow w-fit"
            >
              Withdraw Funds
            </button>
          </div>
        </section>

        <section className="w-full max-w-4xl px-6 mb-12">
      <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            value={profile.location}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            placeholder="Enter your location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account Number</label>
          <input
            value={profile.accountNumber}
            onChange={(e) =>
              setProfile({ ...profile, accountNumber: e.target.value })
            }
            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            placeholder="Enter your account numberr"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bank Name</label>
          <input
            value={profile.bankName}
            onChange={(e) => setProfile({ ...profile, bankName: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            placeholder="Enter your bank name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gallery</label>
          <input
            type="file"
            multiple
            onChange={handleGalleryChange}
            className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
            placeholder="Upload images"
          />
          <div className="mt-4">
            <h4 className="text-sm font-medium">Selected Images:</h4>
            <div className="flex gap-4 mt-2">
              {gallery.length > 0 ? (
                gallery.map((image, index) => (
                  <div key={index} className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`gallery-image-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <p>No images selected</p>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleProfileUpdate}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
        >
          Save Changes
        </button>
      </div>
    </section>

    <section className="w-full max-w-4xl px-6 mb-12">
    <div className="w-full max-w-4xl px-6 mb-12">
      <h2 className="text-2xl font-semibold mb-6">Availability</h2>
      <div className="p-4 space-y-4 max-w-sm mx-auto">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedTime(""); // reset time when date changes
          }}
          filterDate={(date) => getAvailableSlots(date).length > 0}
          placeholderText="Select a date"
          className="border px-4 py-2 rounded w-full"
        />

        {selectedDate && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots[selectedDate.toISOString().split("T")[0]]?.includes(slot);
              const isSelected = selectedTime === slot;
              const isAvailable = !isBooked;

              return (
                <button
                  key={slot}
                  onClick={() => isAvailable && setSelectedTime(slot)} // Only allow selection of available slots
                  className={`px-2 py-1 border rounded ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : isBooked
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed" // Booked slots (unavailable)
                      : "hover:bg-blue-100" // Available slots (hover effect)
                  }`}
                  disabled={isBooked} // Disable clicked booked slots
                >
                  {slot}
                </button>
              );
            })}
            {availableSlots.length === 0 && (
              <p className="text-sm text-gray-500 col-span-3">No slots available</p>
            )}
          </div>
        )}

        {selectedDate && selectedTime && (
          <p className="text-green-600 font-medium mt-4">
            Booking selected: {selectedDate.toLocaleDateString()} at {selectedTime}
          </p>
        )}
      </div>
    </div>
    </section>

        <section className="w-full max-w-4xl px-6 mb-12">
          <h2 className="text-3xl font-semibold mb-6">Your Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className={`border-t border-gray-200 dark:border-gray-700 ${isToday(booking.date) ? "bg-yellow-100 dark:bg-yellow-800" : ""}`}
                  >
                    <td className="py-3 px-4">{booking.customer}</td>
                    <td className="py-3 px-4">{booking.date}</td>
                    <td className="py-3 px-4">R{booking.amount}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleManageBooking(booking)}
                        className="text-blue-600 hover:underline"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
            <Dialog.Title className="text-2xl font-semibold text-center mb-6">Booking Information</Dialog.Title>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Customer</label>
                  <input
                    id="booking-customer"
                    placeholder="Customer name"
                    className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    value={selectedBooking?.customer || ""}
                    onChange={(e) => handleBookingChange("customer", e.target.value)}
                
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="Amount"
                    className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    value={selectedBooking?.amount || 0}
                    onChange={(e) => handleBookingChange("amount", Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={handleDeleteBooking}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleSaveBooking}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
  );
};

export default ECommerce;