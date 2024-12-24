"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Import the useRouter hook

const Onboarding = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [step, setStep] = useState(1); // Track the current step
  const [userProfileImage, setUserProfileImage] = useState(null); // Can be a URL or file path
  const [userName, setUserName] = useState(''); // User's full name
  const [userTagline, setUserTagline] = useState(''); // Profession or tagline
  const [userBio, setUserBio] = useState(''); // Short bio
  const [workHours, setWorkHours] = useState(''); // Work hours like "Monday-Friday, 9 AM - 5 PM"
  const [appointmentDetails, setAppointmentDetails] = useState(''); // Appointment availability details
  const [certifications, setCertifications] = useState(''); // Certifications or documents uploaded


  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };
  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  const handleSkip = () => {
    // Navigate to the dashboard page when the "Skip" button is clicked
    router.push("/dashboard");
  };

  return (
    <>
      {/* Onboarding Steps */}
      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30 pt-20 lg:pt-25 xl:pt-30">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <Image
                src="/images/about/about-light-01.png"
                alt="Onboarding Illustration"
                className="dark:hidden"
                fill
              />
              <Image
                src="/images/about/about-dark-01.png"
                alt="Onboarding Illustration"
                className="hidden dark:block"
                fill
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              {/* Step 1: Welcome Screen */}
              {step === 1 && (
                <>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Welcome to Hayami!
                  </h2>
                  <p>
                    Connect with more customers and grow your business with ease. Let's get started!
                  </p>
                  <div className="mt-8 flex justify-center gap-6">
                    <button
                      onClick={handleNextStep}
                      className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                    >
                      Get Started
                    </button>
                    <button
                      onClick={handleSkip}
                      className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Skip
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Profile Creation */}
              {step === 2 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Set Up Your Service Profile
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Complete Your Profile
                  </h2>
                  <p>
                    Let’s complete your profile. Tell us a little more about yourself and the services you provide.
                  </p>

                  <form className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter your business name (or personal name if you are freelancing)"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Profile Picture / Logo Upload
                      </label>
                      <input
                        type="file"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Save & Continue
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 3: Services Offered */}
              {step === 3 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Offer Your Services
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Services You Offer
                  </h2>
                  <p>
                    Select the services you provide and set your pricing.
                  </p>
                  <form className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Service Category
                      </label>
                      <select className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                        <option>Plumbing</option>
                        <option>Hairdressing</option>
                        <option>Mechanic</option>
                        <option>Laundry Services</option>
                      </select>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Pricing Options
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter your pricing or 'Contact for Quote'"
                      />
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                    <button
                          type="button"
                          onClick={handlePreviousStep}
                          className="w-1/2 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                        >
                          Previous
                        </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Save & Continue
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 4: Location */}
              {step === 4 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Set Your Location
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Where Are You Based?
                  </h2>
                  <p>
                    Enter your business address and specify the area you serve.
                  </p>
                  <form className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Business Address
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter your business address"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Service Radius
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter service area (e.g., 10km)"
                      />
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                    <button
                          type="button"
                          onClick={handlePreviousStep}
                          className="w-1/2 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                        >
                          Previous
                        </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Save & Continue
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 5: Availability */}
              {step === 5 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Set Your Availability
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Work Hours & Appointment Scheduling
                  </h2>
                  <p>
                    Set your availability and allow customers to book directly if needed.
                  </p>
                  <form className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Work Hours
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="e.g., Monday-Friday, 9 AM - 5 PM"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Appointment Scheduling
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter appointment details"
                      />
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                    <button
                          type="button"
                          onClick={handlePreviousStep}
                          className="w-1/2 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                        >
                          Previous
                        </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Save & Continue
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 6: Certifications and Documents */}
              {step === 6 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Certifications & Documents
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Professional Documents
                  </h2>
                  <p>
                    Upload relevant certifications or licenses to increase your credibility.
                  </p>
                  <form className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Upload Certification
                      </label>
                      <input
                        type="file"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Upload ID (for verification)
                      </label>
                      <input
                        type="file"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                      <button
                          type="button"
                          onClick={handlePreviousStep}
                          className="w-1/2 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                        >
                          Previous
                        </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Save & Continue
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 7: Payment Information */}
              {step === 7 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Payment Information
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Payout Information
                  </h2>
                  <p>
                    Provide your payment details for processing payouts.
                  </p>
                  <form className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter your bank account details"
                      />
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-black dark:text-white">
                        PayPal Email (Optional)
                      </label>
                      <input
                        type="email"
                        className="mt-2 block w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                        placeholder="Enter PayPal email"
                      />
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="w-1/2 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Save & Continue
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 8: Terms and Conditions */}
              {step === 8 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Terms and Conditions
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Agreement to Terms
                  </h2>
                  <p>
                    Please read and agree to the terms before proceeding.
                  </p>
                  <form className="mt-8 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white">
                        Terms of Service
                      </label>
                      <input
                        type="checkbox"
                        className="mt-2 w-4 h-4 border border-gray-300 dark:border-gray-700 rounded-md"
                      />
                      <span className="ml-2">I agree to the terms of service.</span>
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="w-1/2 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Agree & Continue
                      </button>
                      <button
                        type="button"
                        onClick={handleSkip}
                        className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </>
              )}

              {/* Step 9: Preview Profile */}
              {step === 9 && (
                <>
                  <span className="font-medium uppercase text-black dark:text-white">
                    Preview Profile
                  </span>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    Preview Your Profile
                  </h2>
                  <p>
                    Take a look at your profile as users will see it.
                  </p>

                  <div className="mt-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200">
                          {/* Profile picture preview */}
                          <img src={userProfileImage || 'default-avatar.png'} alt="Profile" className="w-1/2 h-full object-cover rounded-full" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white">{userName || 'Your Name'}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{userTagline || 'Your tagline or profession'}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-black dark:text-white">About</h4>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{userBio || 'Short bio about yourself.'}</p>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-black dark:text-white">Work Hours</h4>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{workHours || 'Monday - Friday, 9 AM - 5 PM'}</p>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-black dark:text-white">Appointments</h4>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{appointmentDetails || 'Available for appointments by request.'}</p>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-black dark:text-white">Certifications</h4>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">{certifications || 'Uploaded certifications will appear here.'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center gap-6">
                        {/* Previous button */}
                        <button
                          type="button"
                          onClick={handlePreviousStep}
                          className="w-1/2 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600"
                        >
                          Previous
                        </button>

                        {/* Next/Finish button */}
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                        >
                          Save & Finish
                        </button>
                    </div>
                  </div>
                </>
              )}


              {/* Add more steps here (e.g., Location, Availability, Payment Information, etc.) */}

              {/* Final Step: Completion */}
              {step === 10 && (
                <>
                  <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                    You're all set!
                  </h2>
                  <p>
                    Start connecting with customers and growing your business.
                  </p>
                  <div className="mt-8 flex justify-center gap-6">
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                    >
                      Start Exploring
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Onboarding;
