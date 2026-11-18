
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ShoppingBag,
  Search,
  ChevronRight,
  Leaf,
  ArrowRight,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import products from "../data/products";

const navLinks = [
  { name: "হোম", path: "/" },
  { name: "সকল পণ্য", path: "/shop" },
  { name: "আমাদের সম্পর্কে", path: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { cart = [] } = useCart();
  const navigate = useNavigate();

  // কার্টের মোট পণ্য
  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  // পণ্য অনুসন্ধান
  const normalizedSearch = search.trim().toLowerCase();

  const matchedProducts = normalizedSearch
    ? products
        .filter((product) =>
          `${product.name || ""} ${product.description || ""}`
            .toLowerCase()
            .includes(normalizedSearch)
        )
        .slice(0, 5)
    : [];

  // মেনু বন্ধ
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // অনুসন্ধান
  const handleSearch = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(search.trim())}`);

    setSearch("");
    setSearchOpen(false);
    closeMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // পণ্যের বিস্তারিত
  const openProduct = (product) => {
    setSearchOpen(false);
    setSearch("");
    closeMenu();

    if (product.id !== undefined && product.id !== null) {
      navigate(`/product/${product.id}`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(product.name || "")}`);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // নেভিগেশন
  const handleNavigation = () => {
    closeMenu();
    setSearchOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // চলমান ঘোষণা
  const announcements = [
    {
      icon: Truck,
      text: "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা",
    },
    {
      icon: Leaf,
      text: "আপনার রান্নার স্বাদ বাড়াতে আমাদের পণ্যে আস্থা রাখতে পারেন",
    },
    {
      icon: ShieldCheck,
      text: "আমাদের ওয়েবসাইটে পাবেন প্রাকৃতিক ও খাঁটি পণ্য, ইনশাআল্লাহ",
    },
    {
      icon: ShoppingBag,
      text: "এখনই আপনার প্রয়োজনীয় পণ্য অর্ডার করুন",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-amber-100 bg-[#fffdf8]/95 shadow-sm backdrop-blur-xl">

      {/* চলমান ঘোষণা */}
      <div className="overflow-hidden bg-[#173b25] py-2.5 text-white">

        <div className="relative flex overflow-hidden">

          <div className="flex w-max shrink-0 animate-navbar-marquee items-center">

            {[0, 1, 2, 3].map((group) => (
              <div
                key={group}
                className="flex shrink-0 items-center"
                aria-hidden={group !== 0}
              >
                {announcements.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={`${group}-${index}`}
                      className="mx-5 flex shrink-0 items-center gap-2 sm:mx-8"
                    >
                      <Icon
                        size={16}
                        className="shrink-0 text-green-300"
                      />

                      <span className="whitespace-nowrap text-[11px] font-medium sm:text-xs">
                        {item.text}
                      </span>

                      <span className="ml-3 text-green-300">✦</span>
                    </div>
                  );
                })}
              </div>
            ))}

          </div>

        </div>
      </div>

      {/* মূল Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-6 lg:px-8">

        {/* লোগো */}
        <Link
          to="/"
          onClick={handleNavigation}
          className="flex min-w-0 shrink-0 cursor-pointer items-center gap-2 sm:gap-3"
        >
          <img
            src="/images/logo.png"
            alt="হালাল স্পাইস লোগো"
            className="h-10 w-10 shrink-0 rounded-2xl object-contain sm:h-12 sm:w-12"
          />

          <div className="min-w-0">
            <h1 className="text-base font-extrabold leading-tight text-amber-950 sm:text-2xl">
              Halal <span className="text-green-700">Spice</span>
            </h1>

            <p className="text-[8px] tracking-widest text-gray-500 sm:text-[10px]">
              খাঁটি স্বাদ, বিশুদ্ধ বিশ্বাস
            </p>
          </div>
        </Link>

        {/* কম্পিউটার মেনু */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-9">

          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={handleNavigation}
              className={({ isActive }) =>
                `relative cursor-pointer py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-amber-800"
                    : "text-stone-600 hover:text-amber-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-700" />
                  )}
                </>
              )}
            </NavLink>
          ))}

        </nav>

        {/* ডান পাশের বাটন */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">

          {/* সার্চ */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((value) => !value);
              setMenuOpen(false);
            }}
            aria-label="পণ্য খুঁজুন"
            aria-expanded={searchOpen}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-stone-700 transition hover:bg-amber-100"
          >
            {searchOpen ? <X size={21} /> : <Search size={21} />}
          </button>

          {/* কার্ট */}
          <Link
            to="/cart"
            onClick={handleNavigation}
            aria-label="শপিং কার্ট"
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-stone-700 transition hover:bg-amber-100"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-800 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* এখনই অর্ডার করুন */}
          <Link
            to="/shop"
            onClick={handleNavigation}
            className="hidden cursor-pointer items-center gap-2 rounded-full bg-amber-800 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-900 hover:shadow-lg sm:inline-flex sm:text-sm"
          >
            এখনই অর্ডার করুন
            <ChevronRight size={17} />
          </Link>

          {/* মোবাইল মেনু */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((value) => !value);
              setSearchOpen(false);
            }}
            aria-label="মেনু খুলুন"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-stone-800 transition hover:bg-amber-100 md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* সার্চ প্যানেল */}
      {searchOpen && (
        <div className="border-t border-amber-100 bg-white px-3 py-4 sm:px-4">

          <div className="mx-auto max-w-2xl">

            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 rounded-xl border border-amber-200 bg-orange-50 px-3 py-2 focus-within:border-amber-600"
            >
              <Search
                size={20}
                className="shrink-0 text-amber-800"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="পণ্যের নাম লিখে খুঁজুন..."
                aria-label="পণ্য অনুসন্ধান"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-stone-800 outline-none placeholder:text-stone-400"
              />

              <button
                type="submit"
                disabled={!search.trim()}
                className="cursor-pointer rounded-lg bg-amber-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-50"
              >
                খুঁজুন
              </button>
            </form>

            {/* অনুসন্ধানের ফলাফল */}
            {normalizedSearch && (
              <div className="mt-2 overflow-hidden rounded-xl border border-amber-100 bg-white shadow-lg">

                {matchedProducts.length > 0 ? (
                  matchedProducts.map((product) => (
                    <button
                      key={product.id ?? product.name}
                      type="button"
                      onClick={() => openProduct(product)}
                      className="flex w-full cursor-pointer items-center gap-3 border-b border-stone-100 p-3 text-left transition hover:bg-orange-50"
                    >
                      <img
                        src={product.image}
                        alt={product.name || "পণ্য"}
                        className="h-12 w-12 shrink-0 rounded-lg bg-stone-50 object-contain"
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                        }}
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-stone-800">
                          {product.name}
                        </span>

                        <span className="mt-1 block text-xs text-stone-500">
                          {product.description || "হালাল স্পাইসের পণ্য"}
                        </span>
                      </span>

                      <ArrowRight
                        size={17}
                        className="shrink-0 text-amber-800"
                      />
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-5 text-center text-sm text-stone-500">
                    দুঃখিত! এই নামে কোনো পণ্য পাওয়া যায়নি।
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!search.trim()}
                  className="w-full cursor-pointer border-t border-amber-100 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-100 disabled:opacity-50"
                >
                  সব অনুসন্ধানের ফলাফল দেখুন →
                </button>

              </div>
            )}

          </div>
        </div>
      )}

      {/* মোবাইল মেনু */}
      {menuOpen && (
        <nav className="border-t border-amber-100 bg-white px-4 py-3 shadow-lg md:hidden">

          <div className="mx-auto flex max-w-7xl flex-col">

            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `flex cursor-pointer items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-amber-50 text-amber-900"
                      : "text-stone-700 hover:bg-orange-50"
                  }`
                }
              >
                {item.name}
                <ChevronRight size={17} />
              </NavLink>
            ))}

            {/* মোবাইল কার্ট */}
            <Link
              to="/cart"
              onClick={handleNavigation}
              className="mt-2 flex cursor-pointer items-center justify-between rounded-xl bg-amber-800 px-4 py-3.5 font-semibold text-white transition hover:bg-amber-900"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={19} />
                আমার শপিং কার্ট
              </span>

              <span>{cartCount} টি পণ্য</span>
            </Link>

            {/* মোবাইল অর্ডার বাটন */}
            <Link
              to="/shop"
              onClick={handleNavigation}
              className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-800 px-4 py-3.5 font-bold text-white shadow-md transition hover:bg-green-900"
            >
              <ShoppingBag size={19} />
              এখনই অর্ডার করুন
              <ArrowRight size={17} />
            </Link>

            {/* সকল পণ্য */}
            <Link
              to="/shop"
              onClick={handleNavigation}
              className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-amber-200 px-4 py-3 font-semibold text-amber-900 transition hover:bg-amber-50"
            >
              <Leaf size={18} />
              সকল পণ্য দেখুন
            </Link>

          </div>
        </nav>
      )}

      {/* চলমান লেখার অ্যানিমেশন */}
      <style>{`
        @keyframes navbar-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-25%);
          }
        }

        .animate-navbar-marquee {
          animation: navbar-marquee 35s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-navbar-marquee {
            animation: none;
          }
        }
      `}</style>

    </header>
  );
}
