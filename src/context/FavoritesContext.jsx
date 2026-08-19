import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavoriteIds(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function isFavorite(songId) {
    if (favoriteIds.includes(songId)) {
      return true;
    }
    return false;
  }

  function toggleFavorite(songId) {
    if (isFavorite(songId)) {
      const updated = favoriteIds.filter(function (id) {
        return id !== songId;
      });
      setFavoriteIds(updated);
    } else {
      setFavoriteIds([...favoriteIds, songId]);
    }
  }

  const value = {
    favoriteIds: favoriteIds,
    isFavorite: isFavorite,
    toggleFavorite: toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
