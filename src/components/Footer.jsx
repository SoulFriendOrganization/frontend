import { Link } from "react-router";
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaFacebook, FaTwitter, FaInstagram, 
  FaLinkedin
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#D4A017] text-white">  
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">SoulFriend</h3>
            <p className="text-sm mb-4">
              Platform untuk membantu Anda mengelola suasana hati dan menemukan ketenangan. 
              Kami menyediakan support system untuk kesehatan mental Anda.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-gray-200 transition-colors">Beranda</Link></li>
              <li><Link to="/about" className="text-sm hover:text-gray-200 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/features" className="text-sm hover:text-gray-200 transition-colors">Fitur</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-gray-200 transition-colors">Kontak</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-gray-200 transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span className="text-sm">+62 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span className="text-sm">info@soulfriend.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#C39316] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
          </div>
          
          <div className="text-sm">
            &copy; {new Date().getFullYear()} SoulFriend. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;