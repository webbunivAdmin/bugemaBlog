import React from "react"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import image from "../assets/bugema.png"

const Footer = () => {
  const aboutLinks = [
    { title: "About us", href: "/about" },
    { title: "Research", href: "/research" },
    { title: "Governance and planning", href: "/governance" },
    { title: "Access agreements", href: "/access" },
    { title: "Transparency return", href: "/transparency" },
    { title: "Modern Slavery Act Statement", href: "/modern-slavery" },
    { title: "Charity information", href: "/charity" },
    { title: "Locations", href: "/locations" },
    { title: "Support us", href: "/support" },
    { title: "What's on", href: "/events" },
    { title: "News", href: "/news" },
    { title: "Business services", href: "/business" },
    { title: "Career opportunities", href: "/careers" },
    { title: "Sustainability", href: "/sustainability" },
  ]

  const studyLinks = [
    { title: "Courses", href: "/courses" },
    { title: "Undergraduates", href: "/undergrad" },
    { title: "Postgraduates", href: "/postgrad" },
    { title: "International students", href: "/international" },
    { title: "Part-time and short courses", href: "/part-time" },
    { title: "Student experience", href: "/experience" },
    { title: "Accommodation", href: "/accommodation" },
    { title: "Fees and funding", href: "/fees" },
    { title: "Scholarships", href: "/scholarships" },
    { title: "Term dates", href: "/dates" },
  ]

  const infoLinks = [
    { title: "Applicants", href: "/applicants" },
    { title: "Parents and family", href: "/parents" },
    { title: "Students", href: "/students" },
    { title: "Staff", href: "/staff" },
    { title: "Alumni", href: "/alumni" },
    { title: "Business and partners", href: "/business-partners" },
    { title: "Paying online", href: "/pay" },
  ]

  const bottomLinks = [
    { title: "Accessibility", href: "/accessibility" },
    { title: "Contact us", href: "/contact" },
    { title: "Feedback", href: "/feedback" },
    { title: "Legal", href: "/legal" },
    { title: "Privacy notice", href: "/privacy" },
    { title: "Cookies", href: "/cookies" },
    { title: "Update your cookie consent", href: "/cookie-consent" },
  ]

  return (
    <footer className="bg-white-400 dark:bg-gradient-to-r from-[#020b19] via-[#071b3e] to-[#020b19] text-black dark:text-white pt-12 pb-4">
      <div className="mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between mb-12">
          <div className="mb-8 lg:mb-0">
            <Link to="/" className="inline-block mb-8 item-center justify-center">
              <img
                src={image}
                alt="Bugema University"
                className="h-24 w-24 rounded-full object-cover "
              />
            </Link>
            <p className="text-sm mb-4">Bugema University, P.O. Box 6529 Kampala, Uganda </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Facebook className="w-5 h-5 text-[#1a222c]" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Twitter className="w-5 h-5 text-[#1a222c]" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Instagram className="w-5 h-5 text-[#1a222c]" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin className="w-5 h-5 text-[#1a222c]" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Youtube className="w-5 h-5 text-[#1a222c]" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-20">
            <div>
              <h2 className="text-xl font-semibold mb-4">About us</h2>
              <ul className="space-y-2">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm hover:text-gray-300 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Study</h2>
              <ul className="space-y-2">
                {studyLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm hover:text-gray-300 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Information for</h2>
              <ul className="space-y-2">
                {infoLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm hover:text-gray-300 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-wrap gap-4 text-sm text-black dark:text-gray-100 dark:text-gray-400">
            <span>© Bugema University</span>
            {bottomLinks.map((link) => (
              <React.Fragment key={link.href}>
                <span className="text-gray-600">•</span>
                <Link to={link.href} className="hover:text-gray-300 transition-colors">
                  {link.title}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

