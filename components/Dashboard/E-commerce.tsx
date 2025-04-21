"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, DollarSign, CalendarDays, MessageSquare,PlusCircle,Settings, Pencil, Trash2,} from "lucide-react";
import { Dialog } from "@headlessui/react";
import Navbar from "@/components/Header";

type Booking = {
  id: number;
  customer: string;
  date: string;
  amount: number;
};

const ECommerce = () => {
  const { theme } = useTheme();

  const [profile, setProfile] = useState({
    name: "Business Name",
    email: "business@example.co.za",
    phone: "+27 83-652-7922",
  });

  const [availability, setAvailability] = useState([
    { day: "Monday", available: true },
    { day: "Tuesday", available: false },
    { day: "Wednesday", available: true },
    { day: "Thursday", available: false },
    { day: "Friday", available: true },
    { day: "Saturday", available: false },
    { day: "Sunday", available: true },
  ]);

  const [bookings, setBookings] = useState([
    { id: 1, customer: "John Doe", date: "2025-04-21", amount: 100 },
    { id: 2, customer: "Jane Smith", date: "2025-04-22", amount: 150 },
  ]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [withdrawals, setWithdrawals] = useState<number[]>([]);
  const revenue = bookings.reduce((acc, cur) => acc + cur.amount, 0);
  const availableBalance = revenue - withdrawals.reduce((a, b) => a + b, 0);

  const handleProfileUpdate = () => {
    toast.success("Profile Updated!", {
      duration: 4000,
      position: "top-center",
    });
  };
  const handleAvailabilityChange = (day: string) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, available: !item.available } : item
      )
    );
    toast("Availability Updated for" + " "+day+"!");
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
  
  
  const handleSaveBooking = () => {
    if (!selectedBooking) return;  // Ensure there's a selectedBooking
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
     <>
     {!isLoggedIn && <Navbar />}

  <div
    className={`min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${
      isLoggedIn ? "pt-12" : "pt-40"
    }`}
  >
  {isLoggedIn && (
    <div className="absolute top-4 right-6">
      <button
        onClick={() => {
          toast("Logged out");
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
      >
        Log out
      </button>
    </div>
  )}

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
                placeholder="Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                placeholder="Email address"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                placeholder="Phone No."
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-gray-100 dark:bg-gray-700 p-2 rounded"
              />
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
          <h2 className="text-3xl font-semibold mb-6">Availability</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availability.map((day) => (
              <button
                key={day.day}
                onClick={() => handleAvailabilityChange(day.day)}
                className={`px-4 py-3 rounded-xl shadow-md font-medium flex items-center justify-center gap-2 transition-transform duration-200 active:scale-95
                  ${day.available ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white`}
              >
                <CheckCircle className="w-5 h-5" />
                {day.day}: {day.available ? "Available" : "Unavailable"}
              </button>
            ))}
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
              <Dialog.Title className="text-xl font-semibold mb-4">Manage Booking</Dialog.Title>
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
    </div>
    </>
  );
};

export default ECommerce;