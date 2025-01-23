import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FaFacebook, FaInstagram, FaTwitterSquare, FaYoutube, FaBars, FaTimes } from "react-icons/fa"
import useStore from "../store"
import Logo from "./Logo"
import ThemeSwitch from "./Switch"
import { Search } from "lucide-react"

function getInitials(fullName) {
  const names = fullName.split(" ")
  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase())
  return initials.join("")
}

const NavLink = ({ to, children, onClick }) => (
  <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  </motion.li>
)

const SocialIcon = ({ Icon, href, color }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className={`text-2xl ${color}`}
  >
    <Icon />
  </motion.a>
)

const Navbar = () => {
  const { user, signOut } = useStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("userInfo")
    signOut()
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300  ${
        isScrolled ? "shadow-md py-2" : "py-4"
      }`}
    >
      <div className="mx-auto px-4">
        <div className="flex items-start justify-between">
        <Logo className="w-6 h-6 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18" />

          <div className="hidden md:flex items-center space-x-8">
          <Search className="w-6 h-6 dark:text-white text-blue-800" />
            <ul className="flex space-x-6">
              <NavLink to="/" className="text-base font-semibold">Home</NavLink>
              <NavLink to="/blog" className="text-lg font-medium">Blog</NavLink>
              <NavLink to="/about" className="text-sm font-normal">About Us</NavLink>
              <NavLink to="/news" className="text-xl font-semibold">News & Events</NavLink>
              <NavLink to="/contact" className="text-base font-light">Contact</NavLink>
            </ul>

            <div className="flex items-center space-x-4">
              <SocialIcon Icon={FaFacebook} href="https://facebook.com" color="text-blue-600 text-lg" />
              <SocialIcon Icon={FaTwitterSquare} href="https://twitter.com" color="text-blue-400 text-xl" />
              <SocialIcon Icon={FaInstagram} href="https://instagram.com" color="text-pink-600 text-sm" />
              <SocialIcon Icon={FaYoutube} href="https://youtube.com" color="text-red-600 text-lg" />
            </div>

            <ThemeSwitch />

            {user?.token ? (
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  {user.user.image ? (
                    <img src={user.user.image || "/placeholder.svg"} alt="Profile" className="w-10 h-10 rounded-full" />
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg">
                      {getInitials(user.user.name)}
                    </span>
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-lg">{user.user.name.split(" ")[0]}</span>
                </motion.div>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/sign-in">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg"
                >
                  Sign in
                </motion.button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* end  */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
            <Search className="w-6 h-6 dark:text-white text-blue-800" />
          
              <ul className="space-y-4">
              <NavLink to="/" className="text-base font-semibold">Home</NavLink>
              <NavLink to="/blog" className="text-lg font-medium">Blog</NavLink>
              <NavLink to="/about" className="text-sm font-normal">About Us</NavLink>
              <NavLink to="/news" className="text-xl font-semibold">News & Events</NavLink>
              <NavLink to="/contact" className="text-base font-light">Contact</NavLink>
              </ul>
              <div className="flex items-center space-x-4">
              <SocialIcon Icon={FaFacebook} href="https://facebook.com" color="text-blue-600 text-lg" />
              <SocialIcon Icon={FaTwitterSquare} href="https://twitter.com" color="text-blue-400 text-xl" />
              <SocialIcon Icon={FaInstagram} href="https://instagram.com" color="text-pink-600 text-sm" />
              <SocialIcon Icon={FaYoutube} href="https://youtube.com" color="text-red-600 text-lg" />
            </div>
              <div className="mt-6 flex justify-center">
                <ThemeSwitch />
              </div>
              {user?.token ? (
                <div className="mt-6 flex flex-col items-center">
                  <div className="flex items-center space-x-2 mb-4">
                    {user.user.image ? (
                      <img src={user.user.image || "/placeholder.svg"} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        {getInitials(user.user.name)}
                      </span>
                    )}
                    <span className="font-medium text-gray-700 dark:text-gray-300">{user.user.name}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-6 flex justify-center">
                  <Link to="/sign-in" onClick={toggleMenu}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      Sign in
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

