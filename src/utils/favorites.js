export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const saveFavorite = (photo) => {
  const favorites = getFavorites();
  const exists = favorites.find((fav) => fav.id === photo.id);

  if (!exists) {
    favorites.push(photo);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = (id) => {
  const favorites = getFavorites().filter((fav) => fav.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const isFavorited = (id) => {
  return getFavorites().some((fav) => fav.id === id);
};
