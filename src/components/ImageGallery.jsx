import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MdDownload } from "react-icons/md";
import { motion } from "framer-motion";
import {
  getFavorites,
  saveFavorite,
  removeFavorite,
  isFavorited,
} from "../utils/favorites";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ImageGallery() {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY; // Put your key here 🔑

  const [query, setQuery] = useState(() => {
    return localStorage.getItem("lastQuery") || "";
  });
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [favoriteState, setFavoriteState] = useState([]);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);
  useEffect(() => {
    setFavoriteState(getFavorites());
  }, []);

  const fetchImages = async () => {
    if (!query) return;
    setLoading(true); // ✅ Start loading

    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${accessKey}`;
    const res = await axios.get(url);
    setImages((prev) => [...prev, ...res.data.results]);
    setLoading(false); // ✅ Stop loading
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setImages([]);
    setPage(1);
    fetchImages();
  };

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setPage((prev) => prev + 1);
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
  }, []);

  return (
    <main className="relative z-10 max-w-7xl mx-auto p-6 pt-12">
      {/* HEADER TEXT */}
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-md px-6 py-8 max-w-5xl mx-auto shadow-xl">
          <h1 className="text-2xl sm:text-4xl font-semibold text-white drop-shadow-lg">
            Image Glimpse ✨
          </h1>
          <p className="text-gray-200 text-sm sm:text-xl mt-3 mx-auto">
            Discover stunning high-resolution photography. Search anything —
            scroll forever — stay inspired.
          </p>
          <Link
            to="/favorites"
            className="text-gray-200 text-md sm:text-xl mt-3 block hover:text-white"
          >
            View Favorites ❤️
          </Link>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        onSubmit={handleSearch}
        className="flex justify-center mb-8"
      >
        <div className="flex w-full max-w-lg backdrop-blur-md bg-white/20 border border-white/30 rounded-md overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search images..."
            className="grow px-4 py-3 bg-transparent text-white placeholder-gray-200 focus:outline-none"
            value={query}
            onChange={(e) => {
              const queryValue = e.target.value;
              setQuery(queryValue);
              localStorage.setItem("lastQuery", queryValue);
            }}
          />
          <button className="px-6 py-3 cursor-pointer bg-gray-100 text-black font-semibold hover:bg-gray-200 transition">
            Search
          </button>
        </div>
      </motion.form>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-md"
          >
            {/* IMAGE */}
            <img
              src={img.urls.regular}
              alt={img.alt_description}
              loading="lazy"
              className="w-full transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
              {/* LIKE BUTTON */}
              <button
                onClick={() => {
                  if (isFavorited(img.id)) {
                    removeFavorite(img.id);
                    toast.error("Removed from Favorites 💔");
                  } else {
                    saveFavorite(img);
                    toast.success("Added to Favorites ❤️");
                  }
                  setFavoriteState(getFavorites()); // ✅ TRIGGER RE-RENDER
                }}
                className="self-end text-2xl cursor-pointer"
              >
                {isFavorited(img.id) ? "❤️" : "🤍"}
              </button>

              {/* PHOTO INFO + DOWNLOAD BUTTON */}
              <div className="flex">
                <a
                  href={`${img.links.download}&force=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl bg-white text-black p-2 mt-2 rounded-sm w-fit hover:bg-gray-200 transition"
                >
                  <MdDownload />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* Infinite Scroll Detector */}
      <div ref={loaderRef} className="h-10"></div>
    </main>
  );
}
