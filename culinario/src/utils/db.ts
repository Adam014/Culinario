import { useState, useEffect } from "react";
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
import { favoriteRecipesCollection } from "../firebase/firebase";

export const getFavoriteRecipesData = (userUid: string | null) => {
  const [favorites, setFavorites] = useState<any[]>([]); // Use 'any' for flexibility in storing recipe data

  useEffect(() => {
    if (userUid) {
      const q = query(
        favoriteRecipesCollection,
        where("userUid", "==", userUid), // Filter by user's UID
        orderBy("favoritedAt", "desc") // Sort by 'favoritedAt' in descending order
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const favoriteArray = snapshot.docs.map((doc) => ({
          id: doc.data().recipe.id,
          recipe: doc.data().recipe, // Retrieve the entire 'recipe' object
        }));
        setFavorites(favoriteArray);
      });
      return unsub;
    }
  }, [userUid]);

  return favorites;
};