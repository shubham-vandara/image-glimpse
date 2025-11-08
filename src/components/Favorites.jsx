import { getFavorites, removeFavorite } from "../utils/favorites";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <main className="relative z-10 max-w-7xl mx-auto p-6 pt-12">
      <h1 className="text-4xl font-bold text-white mb-5">
        Favorite Photos ❤️{" "}
      </h1>

      {favorites.length === 0 && (
        <p className="text-gray-300">No favorites yet.</p>
      )}

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
        {favorites.map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={img.urls.regular}
              alt={img.alt_description}
              className="w-full rounded-lg"
            />
            <button
              onClick={() => {
                removeFavorite(img.id);
                toast.error("Removed from Favorites 💔");
                setFavorites(getFavorites());
              }}
              className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-md hover:bg-black/80 transition cursor-pointer text-xl"
            >
              <IoCloseOutline />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
