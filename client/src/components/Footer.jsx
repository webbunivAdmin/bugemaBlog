import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { Link } from 'react-router-dom';
export default function Footer() {
  const services = [
    "Libraries",
    "Halls in London",
    "Private accommodation",
    "Short stays in London",
    "Venue hire",
    "The Careers Group",
    "Request Link transcript",
  ]

  const quickLinks = [
    "School of Advanced Study",
    "Institute in Paris",
    "Study with us",
    "Support us",
    "Work for us",
    "Becoming Link teaching centre",
    "Student portal",
    "Staff intranet",
  ]

  const policies = [
    "Freedom of information",
    "Data protection",
    "Modern slavery statement",
    "Equality, diversity and inclusion",
    "Sustainability",
    "Copyright and disclaimer",
  ]

  return (
    <footer className="bg-[#1C1535] text-white py-12">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2">
            {services.map((service, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-blue-300 transition-colors">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-blue-300 transition-colors">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Our Policies</h3>
          <ul className="space-y-2">
            {policies.map((policy, index) => (
              <li key={index}>
                <Link href="#" className="hover:text-blue-300 transition-colors">
                  {policy}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-4">
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="hover:text-blue-300 transition-colors">
            <Facebook className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-blue-300 transition-colors">
            <Twitter className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-blue-300 transition-colors">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-blue-300 transition-colors">
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-blue-300 transition-colors">
            <Youtube className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

