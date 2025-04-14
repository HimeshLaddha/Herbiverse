import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Heart, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  ArrowUpRight,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-emerald-700 to-green-600 text-white pt-16 pb-6 mt-16 relative overflow-hidden">

      {/* Decorative floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-white/20"
            initial={{ 
              x: Math.random() * 100, 
              y: -20,
              rotate: Math.random() * 180
            }}
            animate={{ 
              y: ['0%', '100%'],
              x: `calc(${Math.random() * 100}% + ${Math.sin(i) * 40}px)`,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`
            }}
          >
            <Leaf size={24} />
          </motion.div>
        ))}
      </div>

      {/* Top wave effect */}
      <div className="absolute top-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto -mt-1">
          <path
            fill="#DCFCE7"
            fillOpacity="0.2"
            d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,117.3C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center">
              <Leaf className="mr-2" size={20} />
              Virtual Herbal Garden
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Explore the world of medicinal plants and traditional healing wisdom.
              Our mission is to preserve and share knowledge about nature's pharmacy.
            </p>
            <div className="flex space-x-3 pt-2">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="https://example.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full"
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2 text-emerald-100">
              {[
                { name: "Home", path: "/" },
                { name: "Herb Catalog", path: "/Herbcatalog" },
                { name: "About Us", path: "/AboutUs" },
                { name: "Rare Species", path: "/RareSpecies" },
                { name: "Favourites", path: "/Favourite" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path}
                    className="hover:text-white flex items-center group"
                  >
                    <ArrowUpRight size={14} className="mr-1 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Popular Categories</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Immunity", "Skin Care", "Stress Relief", 
                "Digestion", "Sleep Aid", "Anti-Inflammatory",
                "Respiratory", "Heart Health", "Traditional"
              ].map((tag, i) => (
                <motion.span 
                  key={i} 
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs inline-block cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Get in Touch</h3>
            <p className="text-emerald-100 text-sm">Have questions or suggestions? Reach out to us!</p>
            
            <div className="flex items-center space-x-2 text-emerald-100">
              <Mail size={16} />
              <span>hello@virtualherb.com</span>
            </div>
            
            <div className="flex items-center space-x-2 text-emerald-100">
              <PhoneCall size={16} />
              <span>+91 7058710356</span>
              <PhoneCall size={16} />
              <span>+91 8767690627</span>
            </div>
            
            <div className="flex items-center space-x-2 text-emerald-100">
              <MapPin size={16} />
              <span>PICT, Dhankawadi, Pune</span>
            </div>
            
            <div className="mt-4">
              <motion.button
                className="bg-white text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-md flex items-center text-sm font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart size={16} className="mr-2" /> Support Our Mission
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-6 border-t border-emerald-600">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-emerald-100">
              © {currentYear} Virtual Herbal Garden. All Rights Reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-emerald-100">
              <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
