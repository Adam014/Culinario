import { useState, useEffect } from "react";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { favoriteRecipesCollection } from "../firebase/firebase";

export const getFavoriteRecipesData = () => {
  const [favorites, setFavorites] = useState<any[]>([]); // Use 'any' for flexibility in storing recipe data

  useEffect(() => {
    const q = query(favoriteRecipesCollection, orderBy("favoritedAt", "desc")); // Sort by 'favoritedAt' in descending order
    const unsub = onSnapshot(q, (snapshot) => {
      const favoriteArray = snapshot.docs.map((doc) => ({
        id: doc.data().recipe.id,
        recipe: doc.data().recipe, // Retrieve the entire 'recipe' object
      }));
      setFavorites(favoriteArray);
    });
    return unsub;
  }, []);

  return favorites;
};