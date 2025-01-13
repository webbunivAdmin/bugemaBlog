import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row w-full py-8 items-center justify-between text-[14px] text-gray-700 dark:text-gray-500'>
      <p className="text-sm md:text-base">
      © {new Date().getFullYear()} 
      <span className="font-semibold text-blue-400"> Bugema University</span>. All rights reserved.
    </p>

      <dir className='flex gap-5'>
        <Link to='/contact'>Contact</Link>
        <Link to='/'>Terms of Service</Link>
        <Link to='/' target='_blank'>
          Privacy Policy
        </Link>
      </dir>
    </div>
  );
};

export default Footer;
