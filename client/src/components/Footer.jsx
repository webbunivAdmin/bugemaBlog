import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRss } from "react-icons/fa";

const FooterLink = ({ to, children }) => (
  <li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
  >
    <Icon size={24} />
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">About Us</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bugema University Blog is your source for the latest news, research, and events from our vibrant academic
              community.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Categories</h3>
            <ul className="space-y-2">
              <FooterLink to="/category/academics">Academics</FooterLink>
              <FooterLink to="/category/research">Research</FooterLink>
              <FooterLink to="/category/campus-life">Campus Life</FooterLink>
              <FooterLink to="/category/events">Events</FooterLink>
              <FooterLink to="/category/alumni">Alumni</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <SocialIcon Icon={FaFacebook} href="https://facebook.com/bugemauniversity" />
              <SocialIcon Icon={FaTwitter} href="https://twitter.com/bugemauniversity" />
              <SocialIcon Icon={FaInstagram} href="https://instagram.com/bugemauniversity" />
              <SocialIcon Icon={FaLinkedin} href="https://linkedin.com/school/bugemauniversity" />
              <SocialIcon Icon={FaRss} href="/rss.xml" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">Subscribe to our newsletter for updates:</p>
            <form className="mt-2 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Bugema University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
