// import { Button } from "../ui/button";

import Button from "./Button";


export default function BecomeBlogger() {
  return (
    <section className="dark:bg-[#1C1535] dark:text-white text-black py-20 rounded-lg transition-all duration-300 bg-gray-100 ">
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl font-serif mb-6">Become a student blogger</h2>
        <p className="max-w-2xl mx-auto mb-8">
          If you are currently enrolled on a University and want to become a blogger, please contact
          us. Make sure you include information on where you are from, what you are studying, your student number and
          why you want to blog.
        </p>
        <Button
          className="border-2 border-red-500 dark:text-white text-black hover:bg-red-500 hover:text-white transition-colors"
        >
          Contact us
        </Button>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-500 opacity-20">
          <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </section>
  )
}

