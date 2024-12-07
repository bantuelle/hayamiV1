"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";  // Import the useRouter hook

const Onboarding = () => {
    const router = useRouter(); // Initialize the useRouter hook

  const handleSkip = () => {
    // Navigate to the dashboard page when the "Skip" button is clicked
    router.push("/dashboard");
  };
  return (
    <>
      {/* <!-- ===== Onboarding Start ===== --> */}
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
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-4 mr-4 inline-flex rounded-full bg-meta px-4.5 py-1 text-metatitle uppercase text-white ">
                  Onboarding
                </span>{" "}
                Set Up Your Service Profile
              </span>
              <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Complete Your Profile
              </h2>
              <p>
                To get started offering your services, let’s complete your profile. Tell us a little more about yourself and the services you provide.
              </p>

              <form className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Service Type
                  </label>
                  <select className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                    <option>Plumbing</option>
                    <option>Hairdressing</option>
                    <option>Mechanic</option>
                    <option>Laundry Services</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    placeholder="Enter your business name"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Location
                  </label>
                  <input
                    type="text"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    placeholder="Enter your location"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                  />
                </div>

                <div className="mt-8 flex justify-center gap-6">
                  <button
                    type="submit"
                    className="w-1/2 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                  >
                    Save & Continue
                  </button>
                  <button
                    type="button"
                    className="w-1/2 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Onboarding End ===== --> */}
    </>
  );
};

export default Onboarding;
