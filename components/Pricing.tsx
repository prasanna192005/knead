import localFont from "next/font/local";
const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

export default function Pricing() {
  return (
    <div className="mt-48">
      <h1 className={`${satoshi.className} text-2xl text-center text-yellow-900`}>Pricing Plans</h1>
      <h1 className={`${satoshi.className} text-6xl text-center mt-4`}>Competitive Pricing</h1>

      <div className="flex flex-col md:flex-row mx-4 md:mx-20 mt-20 gap-8 justify-center">
        {/* Basic Plan */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 h-auto w-full md:w-1/3 flex flex-col items-center shadow-md hover:shadow-xl transition">
          <h1 className={`${satoshi.className} text-3xl text-yellow-900 font-[500]`}>Basic Plan</h1>
          <p className={`${satoshi.className} text-center mt-4 text-gray-700`}>
            Perfect for individuals starting their mental wellness journey.
          </p>
          <ul className="mt-4 text-gray-700 space-y-2 list-disc list-inside">
            <li>Access to AI chat support</li>
            <li>Basic mental wellness exercises</li>
            <li>Weekly progress tracking</li>
          </ul>
          <p className={`${satoshi.className} text-2xl font-bold mt-4`}>₹799/month</p>
          <button className="mt-14 px-6 py-2 bg-yellow-900 text-white rounded-2xl hover:bg-yellow-800 transition">
            Choose Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 h-auto w-full md:w-1/3 flex flex-col items-center shadow-md hover:shadow-xl transition">
          <h1 className={`${satoshi.className} text-3xl text-yellow-900 font-[600]`}>Premium Plan</h1>
          <p className={`${satoshi.className} text-center mt-4 text-gray-700`}>
            For those who want full access and personalized mental wellness support.
          </p>
          <ul className="mt-4 text-gray-700 space-y-2 list-disc list-inside">
            <li>24/7 AI therapist access</li>
            <li>Advanced exercises & meditation guides</li>
            <li>Personalized weekly insights</li>
            <li>Priority support</li>
          </ul>
          <p className={`${satoshi.className} text-2xl font-bold mt-4`}>₹2,499/month</p>
          <button className="mt-6 px-6 py-2 bg-yellow-900 text-white rounded-2xl hover:bg-yellow-800 transition">
            Choose Plan
          </button>
        </div>

        {/* Family Plan */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 h-auto w-full md:w-1/3 flex flex-col items-center shadow-md hover:shadow-xl transition">
          <h1 className={`${satoshi.className} text-3xl text-yellow-900 font-[500]`}>Family Plan</h1>
          <p className={`${satoshi.className} text-center mt-4 text-gray-700`}>
            Ideal for families who want to support each other’s mental wellness.
          </p>
          <ul className="mt-4 text-gray-700 space-y-2 list-disc list-inside">
            <li>Up to 5 family members</li>
            <li>AI therapist for each member</li>
            <li>Family progress tracking</li>
            <li>Group wellness exercises</li>
          </ul>
          <p className={`${satoshi.className} text-2xl font-bold mt-4`}>₹4,499/month</p>
          <button className="mt-6 px-6 py-2 bg-yellow-900 text-white rounded-2xl hover:bg-yellow-800 transition">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
}
