
import { Link, useNavigate } from "react-router-dom";

import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Heart,
  ShoppingBag,
} from "lucide-react";

// Quick Navigation Array
const quickLinks = [
  { name: "হোম", path: "/" },
  { name: "সকল পণ্য", path: "/shop" },
  { name: "আমাদের সম্পর্কে", path: "/about" },
  { name: "শপিং কার্ট", path: "/cart" },
  { name: "অর্ডার করুন", path: "/checkout" },
];

// Product Categories Array
const categories = [
  "মরিচের গুঁড়া",
  "হলুদের গুঁড়া",
  "ধনিয়ার গুঁড়া",
  "জিরার গুঁড়া",
  "গরম মসলা",
  "খাঁটি সরিষার তেল",
];

// Social Links Array
const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: "f",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: "◎",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: "▶",
  },
];

// Contact Information Array
const contactInfo = [
  {
    title: "ঠিকানা",
    description: "বাংলাদেশ",
    icon: MapPin,
  },
  {
    title: "ফোন",
    description: "আপনার ফোন নম্বর",
    icon: Phone,
  },
  {
    title: "ইমেইল",
    description: "আপনার ইমেইল ঠিকানা",
    icon: Mail,
  },
];

export default function Footer() {
  const navigate = useNavigate();

  // Navigation + Smooth Scroll
  const handleNavigation = (path) => {
    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Category Navigation
  const handleCategoryClick = () => {
    handleNavigation("/shop");
  };

  return (
    <footer className="relative overflow-hidden bg-[#11140f] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div>

            <Link
              to="/"
              onClick={() => window.scrollTo({
                top: 0,
                behavior: "smooth",
              })}
              className="inline-flex cursor-pointer items-center gap-3"
            >

              <img
                src="/images/logo.png"
                alt="Halal Spice Logo"
                className="h-12 w-12 rounded-2xl object-contain"
              />

              <div>
                <h2 className="text-2xl font-extrabold">
                  Halal{" "}
                  <span className="text-green-400">
                    Spice
                  </span>
                </h2>

                <p className="text-xs tracking-widest text-gray-400">
                  PURE TASTE, PURE TRUST
                </p>
              </div>

            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              আপনার রান্নাঘরের প্রতিটি মুহূর্তে খাঁটি স্বাদ ও
              বিশুদ্ধতার ছোঁয়া পৌঁছে দেওয়াই আমাদের লক্ষ্য।
              বেছে নিন মানসম্মত মসলা ও নিত্যপ্রয়োজনীয় পণ্য।
            </p>

            {/* Social Links */}
            <div className="mt-5 flex gap-3">

              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg transition duration-300 hover:-translate-y-1 hover:bg-green-600"
                >
                  {social.icon}
                </a>
              ))}

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-6 text-lg font-bold">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-4">

              {quickLinks.map((item) => (
                <li key={item.path}>

                  <button
                    type="button"
                    onClick={() => handleNavigation(item.path)}
                    className="group flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-green-400"
                  >

                    <ArrowUpRight
                      size={15}
                      className="text-green-400 transition group-hover:translate-x-1"
                    />

                    {item.name}

                  </button>

                </li>
              ))}

            </ul>

          </div>

          {/* Product Categories */}
          <div>

            <h3 className="mb-6 text-lg font-bold">
              আমাদের পণ্য
            </h3>

            <ul className="space-y-4">

              {categories.map((category) => (
                <li key={category}>

                  <button
                    type="button"
                    onClick={handleCategoryClick}
                    className="group flex cursor-pointer items-center gap-3 text-sm text-gray-400 transition hover:text-green-400"
                  >

                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 transition group-hover:scale-150" />

                    {category}

                  </button>

                </li>
              ))}

            </ul>

          </div>

          {/* Contact Section */}
          <div>

            <h3 className="mb-6 text-lg font-bold">
              যোগাযোগ করুন
            </h3>

            <div className="space-y-5">

              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3"
                  >

                    <Icon
                      className="mt-1 shrink-0 text-green-400"
                      size={20}
                    />

                    <div>

                      <p className="text-sm font-semibold">
                        {item.title}
                      </p>

                      <p className="mt-1 break-all text-sm text-gray-400">
                        {item.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center sm:flex-row">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Halal Spice.
            সর্বস্বত্ব সংরক্ষিত।
          </p>

          <button
            type="button"
            onClick={() => handleNavigation("/shop")}
            className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
          >

            <ShoppingBag size={16} />

            এখনই কেনাকাটা করুন

            <ArrowUpRight size={15} />

          </button>

        </div>

      </div>

    </footer>
  );
}
